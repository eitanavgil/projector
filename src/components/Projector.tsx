import React, {useState, useEffect} from "react";
import {KalturaClient, KalturaClientException, KalturaAPIException} from "kaltura-typescript-client";
import {MediaListAction} from "kaltura-typescript-client/api/types/MediaListAction";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";
import {KalturaMediaEntryFilter} from "kaltura-typescript-client/api/types/KalturaMediaEntryFilter";
import ProjectorItem from "./ProjectorItem";
import {KalturaFilterPager, KalturaFilterPagerArgs, KalturaPager} from "kaltura-typescript-client/api/types";
import {placeholder} from "@babel/types";

export interface projectorProps {
    ks: string;
}

export interface gridItem {
    index: number,
    entry: KalturaMediaEntry,
    row: number,
    col: number
}

const breakpointsData  = [
    {amount:12,fillers:3},
    {amount:24,fillers:6},
    {amount:48,fillers:9},
    {amount:96,fillers:12},
    {amount:144,fillers:18},
    {amount:204,fillers:25},
    {amount:288,fillers:35},
]


const Projector: React.FC<projectorProps> = (props) => {

    const [breakpoint, setBreakpoint] = useState("");
    const [placeholdersArr, setPlaceholdersArr] = useState();

    const applyData = (data:any[]) =>{
        // find the coresponding grid size
        const gridParams = breakpointsData.find((i) => (data.length < i.amount - i.fillers) );
        const gridItems = gridParams!.amount;
        const fillers = gridParams!.fillers;
        console.log(">>>> Grid is set to ",gridItems,"with",fillers,"fillers");
        console.log(">>>> grid",placeholdersArr);



        // setLoading(false);
        // setItems(data)
    };

    useEffect(() => {
        const items = new Array();
        // create fill array
        for (let i = 0; i < 300; i++) {
            items.push(i);
        }
        // shuffle
        items.sort(() => Math.random() - 0.5);


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
        pager.pageSize = 50;
        console.log(">>>>1");
        setPlaceholdersArr(items);
        console.log(">>>>2");
        const request = new MediaListAction({filter: filter, pager: pager});
        kalturaClient.request(request).then(
            response => {
                if (response && response.objects.length) {
                    applyData(response.objects)
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
