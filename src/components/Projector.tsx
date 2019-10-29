import React, {useState, useEffect} from "react";
import {KalturaClient, KalturaClientException, KalturaAPIException} from "kaltura-typescript-client";
import {MediaListAction} from "kaltura-typescript-client/api/types/MediaListAction";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";
import {KalturaMediaEntryFilter} from "kaltura-typescript-client/api/types/KalturaMediaEntryFilter";
import ProjectorItem from "./ProjectorItem";
import {KalturaFilterPager, KalturaFilterPagerArgs, KalturaPager} from "kaltura-typescript-client/api/types";

export interface projectorProps {
    ks: string;
}

export interface gridItem {
    index: number,
    entry: KalturaMediaEntry,
    row: number,
    col: number
}

const Projector: React.FC<projectorProps> = (props) => {

    const max = 100;

    useEffect(() => {
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

        const pager: KalturaFilterPager = new KalturaFilterPager();
        pager.pageIndex = 0;
        pager.pageSize = 30;

        const request = new MediaListAction({filter: filter, pager: pager});
        kalturaClient.request(request).then(
            response => {
                if (response && response.objects.length) {
                    setLoading(false);
                    setItems(generateItems(shuffle(response.objects)))
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
    }, []);

    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState<Array<gridItem>>([]);

    const maxLine = 14;

    const shuffle = (a: any[]) => {
        // for (let i = a.length - 1; i > 0; i--) {
        //     const j = Math.floor(Math.random() * (i + 1));
        //     [a[i], a[j]] = [a[j], a[i]];
        // }
        const newArr = new Array(20).concat(a);
        return newArr
    };

    const generateItems = (items: KalturaMediaEntry[]) => {
        const arr: any[] = [];
        let i;
        for (i = 0; i < items.length; i++) {
            const it: gridItem = {
                index: i,
                entry: items[i],
                col: i % maxLine,
                row: Math.floor(i / maxLine)
            };
            arr.push(it)
        }

        return arr;
    };


    return <div className="projector">{loading && "Loading"}
        {items && items.length && items.map(item =>
            <ProjectorItem key={item.index} data={item.entry} c={item.col} r={item.row}></ProjectorItem>
        )}
    </div>;
};

export default Projector;
