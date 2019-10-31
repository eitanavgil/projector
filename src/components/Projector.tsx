import React, {useState, useEffect} from "react";
import {KalturaClient, KalturaClientException, KalturaAPIException} from "kaltura-typescript-client";
import {MediaListAction} from "kaltura-typescript-client/api/types/MediaListAction";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";
import {KalturaMediaEntryFilter} from "kaltura-typescript-client/api/types/KalturaMediaEntryFilter";
import ProjectorItem, {ItemProps} from "./ProjectorItem";
import {KalturaFilterPager, KalturaFilterPagerArgs, KalturaPager} from "kaltura-typescript-client/api/types";
import {placeholder} from "@babel/types";

export interface projectorProps {
    ks: string;
}

export interface gridItem {
    index: number,
    entry?: KalturaMediaEntry,
}


const Projector: React.FC<projectorProps> = (props) => {

    const [placeholdersArr, setPlaceholdersArr] = useState();
    const [data, setData] = useState<KalturaMediaEntry[]>();

    useEffect(() => {
        if (!placeholdersArr) {
            return
        }

        // find the coresponding grid size
        // let gridParams = breakpointsData.find((i) => (entryData.length < i.amount - i.fillers) );
        let gridParams = {amount: 48, fillers: 3};
        const gridItems = gridParams!.amount;
        const fillers = gridParams!.fillers;

        // console.log(">>>> Grid is set to ", gridItems, "with", fillers, "fillers");

        // at this point we should have a shuffled array with or without entries
        // fill the existing shuffled array with the received items by their order
        data!.forEach((entry: KalturaMediaEntry, index: number) => {
            const itemInShuffeledArr = placeholdersArr.find((i: ItemProps) => i.itemIndex === index);
            itemInShuffeledArr.data = entry

        });
        setLoading(false);
        setItems(placeholdersArr);

        setTimeout(fetchEntries, 5000)

    }, [data]);

    // generate a random array and save to state
    useEffect(() => {
        const items = new Array();
        // create fill array
        for (let i = 0; i < 49; i++) {
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
        filter.tagsLike = "projector";
        filter.orderBy = "+createdAt";

        const pager: KalturaFilterPager = new KalturaFilterPager();
        pager.pageIndex = 0;
        pager.pageSize = 48;
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
    }

    // first time fetch entries
    useEffect(fetchEntries, []);

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Array<gridItem>>([]);

    return <div className="projector flex-container">
        {loading && "Loading"}
        {items && items.length && items.map((item, index) =>
            <ProjectorItem key={index} entryData={item} itemIndex={index}></ProjectorItem>
        )}
    </div>;
};

export default Projector;
