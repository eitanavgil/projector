import React, {useState, useEffect} from "react";
// import glowbg from "./glowbg.png";
import glow from "./triangleglow.png";
import newPic from "./new.png";

// import triangle from "./triangle.png";

export interface ItemProps {
    entryData?: any,
    itemIndex: number,
    placeHolder?: boolean
    blink1?: boolean
    blink2?: boolean
    blink3?: boolean
}

const ProjectorItem: React.FC<ItemProps> = (props) => {
        return (
            //
            <div className={props.entryData.isNew ? "flex-item new-item" : "flex-item"}>
                <div
                    className={props.blink1 ? "item-content blink1 " : "item-content "
                    + props.blink2 ? "item-content blink2 " : "item-content "
                    + props.blink3 ? "item-content blink3 " : "item-content "
                    }>
                    {props.placeHolder && <div className="placeHolder animate-flicker">
                        <img src={glow} className="place-holder"></img>
                    </div>}
                    {props.entryData && props.entryData.data &&
                    <img className="projector-item"
                         src={props.entryData.data.thumbnailUrl + "/width/256/height/256/nearest_aspect_ratio/1"}
                    ></img>
                    }
                    <img src={newPic} className="new-item-holder"></img>
                </div>
            </div>
        )
    }
;

export default ProjectorItem;

