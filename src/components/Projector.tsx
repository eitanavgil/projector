import React, {useState, useEffect} from "react";
import {KalturaClient, KalturaClientException, KalturaAPIException} from "kaltura-typescript-client";
import {MediaListAction} from "kaltura-typescript-client/api/types/MediaListAction";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";
import {KalturaMediaEntryFilter} from "kaltura-typescript-client/api/types/KalturaMediaEntryFilter";
import ProjectorItem from "./ProjectorItem";
import {KalturaFilterPager} from "kaltura-typescript-client/api/types";
import without from 'lodash/without';

export interface projectorProps {
    ks: string
}

export interface gridItem {
    placeHolder?:boolean,
    index: number,
    entry?: KalturaMediaEntry,
}


const Projector: React.FC<projectorProps> = (props) => {

    const maxItems = 48;
    const refreshInterval = 12;
    const [loading, setLoading] = useState(true);
    const [placeholdersArr, setPlaceholdersArr] = useState();
    const [data, setData] = useState<KalturaMediaEntry[]>();
    const [items, setItems] = useState<Array<gridItem>>([]);

    // apply data
    useEffect(() => {
        if (!placeholdersArr || !data || !data.length || !placeholdersArr.length) {
            return
        }
        let clonedArray = [...placeholdersArr];
        const existingItemsIds = clonedArray.filter((item: any) => item.data).map(itemProp => itemProp.data.id);
        const receivedItemsIds = data.map((entry: any) => entry.id);
        const removeList = without(existingItemsIds, ...receivedItemsIds);
        const addList = without(receivedItemsIds, ...existingItemsIds);

        // remove items from current
        clonedArray.map(itm => {
            if (itm.data && removeList.some(it => it === itm.data.id)) {
                itm.data = null
            }
            return itm
        });

        const emptyItems = clonedArray.filter(itm => !itm.data);
        addList.forEach((entryIdToAdd, index) => {
            emptyItems[index].data = data.find(it => it.id === entryIdToAdd)
        });

        clonedArray.sort((a, b) => a.itemIndex - b.itemIndex);

        setLoading(false);
        // random fill 3 of the empty item
        let unfilledItems = clonedArray.filter(item => {
            item.placeHolder = null;
            return !item.data;
        });


        unfilledItems.sort(() => Math.random() - 0.5);
        if(unfilledItems[0]){
            unfilledItems[0].placeHolder = true;
        }
        if(unfilledItems[1]){
            unfilledItems[1].placeHolder = true;
        }
        if(unfilledItems[2]){
            unfilledItems[2].placeHolder = true;
        }
        //console.log(">>>> unfilledItems", unfilledItems);


        setItems(clonedArray);

        setTimeout(() => {
            fetchEntries();
        }, refreshInterval * 1000);

    }, [data]); // only react to data changes

    // generate a random array and save to state
    useEffect(() => {
        const items = new Array();
        // create fill array
        for (let i = 0; i < maxItems; i++) {
            items.push({itemIndex: i});
        }
        // shuffle
        items.sort(() => Math.random() - 0.5);
        setPlaceholdersArr(items);
    }, []);

    // fetch entries function (should not be here...)
    const fetchEntries = () => {
        const kalturaClient = new KalturaClient();
        kalturaClient.setOptions({
            clientTag: "projector",
            endpointUrl: "https://cdnapisec.kaltura.com/api_v3"
        });
        kalturaClient.setDefaultRequestOptions({
            ks: props.ks
        });
        const filter: KalturaMediaEntryFilter = new KalturaMediaEntryFilter();
        // filter.tagsLike = "ppp";
        filter.orderBy = "-createdAt";

        const pager: KalturaFilterPager = new KalturaFilterPager();
        pager.pageSize = maxItems;
        const request = new MediaListAction({filter: filter, pager: pager});
        kalturaClient.request(request).then(
            response => {
                if (response && response.objects.length) {
                    setData(response.objects);
                }
            },
            error => {
                if (error instanceof KalturaClientException) {
                    console.log("network error etc");
                } else if (error instanceof KalturaAPIException) {
                    console.log("api exception");
                }
            }
        );
    };

    // first time fetch entries
    useEffect(fetchEntries, []);


    return <div className={"projector flex-container s" + maxItems}>
        {loading && "Loading..."}
        {items && items.length && items.map((item, index) =>
            <ProjectorItem key={index} entryData={item} itemIndex={index} placeHolder={item.placeHolder} ></ProjectorItem>
        )}
        <span className={"credits"}>@funwall 1.0 - Dana | Lior | Eitan</span>
    </div>;
};

export default Projector;
