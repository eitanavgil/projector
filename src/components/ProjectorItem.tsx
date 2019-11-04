import React,{useState, useEffect} from "react";

export interface ItemProps {
    entryData?: any,
    itemIndex: number,
    placeHolder?:boolean
}

const ProjectorItem: React.FC<ItemProps> = (props) => {
        return (
            <div className={"image-container flex-item"}>
                {props.placeHolder && <div className="placeHolder animate-flicker">OOO</div>}
                {
                    props.entryData && props.entryData.data &&
                    <img className="projector-item"
                         src={props.entryData.data.thumbnailUrl + "/width/256/height/256/nearest_aspect_ratio/1"}
                    ></img>
                }

            </div>
        )
    }
;

export default ProjectorItem;

