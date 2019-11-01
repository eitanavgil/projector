import React, {useState, useEffect} from "react";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";

export interface ItemProps {
    entryData?: any,
    itemIndex: number,
}

const ProjectorItem: React.FC<ItemProps> = (props) => {
        return (
            <div className={"image-container flex-item"}>
                <span className={"sp"}>{props.itemIndex}</span>

                {
                    props.entryData && props.entryData.data &&
                    <img className="projector-item"
                         src={props.entryData.data.thumbnailUrl + "/width/80/height/80/nearest_aspect_ratio/1"}
                    ></img>
                }

                {/*{*/}
                    {/*props.entryData.data &&*/}
                    {/*console.log(">>>> ", props.entryData.data.id)*/}
                {/*}*/}
            </div>
        )
    }
;

export default ProjectorItem;

