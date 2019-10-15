import React, {useState, useEffect} from "react";
import {KalturaClient, KalturaClientException, KalturaAPIException} from "kaltura-typescript-client";
import {MediaListAction} from "kaltura-typescript-client/api/types/MediaListAction";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";
import {KalturaMediaEntryFilter} from "kaltura-typescript-client/api/types/KalturaMediaEntryFilter";
import ProjectorItem from "./ProjectorItem";

export interface projectorProps {
    ks: string;
}

const Projector: React.FC<projectorProps> = (props) => {

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

        const request = new MediaListAction({filter: filter, pager: undefined});
        kalturaClient.request(request).then(
            response => {
                if (response && response.objects.length) {
                    setLoading(false);
                    setItems(response.objects)
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
    const [items, setItems] = useState<Array<KalturaMediaEntry>>([]);

    return <div className="projector">{loading && "Loading"}
        {items && items.length && items.map(item =>
            <ProjectorItem key={item.id} data={item}></ProjectorItem>
        )}
    </div>;
};

export default Projector;
