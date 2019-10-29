import React, {useState, useEffect} from "react";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";

interface IProps {
    data?: KalturaMediaEntry | null,
    r: number,
    c: number
}

const ProjectorItem: React.FC<IProps> = (props) => {

        const getPosition = (): any => {
            return {left: 100 * props.c, top: 86 * props.r}
        };

        return (
            <div className={"image-container"}>
                {props.data &&
                <img className="projector-item"
                     src={props.data!.thumbnailUrl + "/width/200/height/200/nearest_aspect_ratio/1"}
                >
                </img>}

            </div>
// <div className="hexagon hexagon2" style={getPosition()}>
//     <div className="hexagon-in1">
// <img className="hexagon-in2"
//  HERE !
//     </div>
// </div>
        )
    }
;

export default ProjectorItem;
/**
 <div>
 <img src={props.data.thumbnailUrl+"/width/100"}/>
 </div>

 background-image: url(http://placekitten.com/240/240);


 */
