import React, {useState, useEffect} from "react";
// import glowbg from "./glowbg.png";
// import glow from "./glowbg.png";
import newPic from "./new.png";
// import triangle from "./triangle.png";

export interface ItemProps {
    entryData?: any,
    itemIndex: number,
    placeHolder?: boolean
}

const ProjectorItem: React.FC<ItemProps> = (props) => {
        return (
            //
            <div className={props.entryData.isNew ? "flex-item new-item" : "flex-item"}>
                <div className="item-content">
                    {props.placeHolder && <div className="placeHolder animate-flicker">
                        Animation
                    </div>}
                    {props.entryData && props.entryData.data &&

                    <img className="projector-item"
                         src={props.entryData.data.thumbnailUrl + "/width/256/height/256/nearest_aspect_ratio/1"}
                    ></img>
                    }
                    <img src={newPic}  className="new-item-holder"></img>
                </div>
            </div>
        )
    }
;

export default ProjectorItem;

