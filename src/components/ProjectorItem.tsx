import React, {useState, useEffect} from "react";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";

interface IProps {
    data: KalturaMediaEntry,
    r: number,
    c: number
}

const ProjectorItem: React.FC<IProps> = (props) => {

    const getPosition = (): any => {
        let offset = 0;
        if (props.r % 2 === 1) {
            offset = 50;
        }
        return {left: 100 * props.c + offset, top: 86 * props.r}
    };

    return (
        <div className="hexagon hexagon2" style={getPosition()}>
            <div className="hexagon-in1">
                <div className="hexagon-in2"
                     style={
                         {backgroundImage: `url(${props.data.thumbnailUrl + "/width/240"})`}
                     }></div>
            </div>
        </div>
    )
};

export default ProjectorItem;
/**
 <div>
 <img src={props.data.thumbnailUrl+"/width/100"}/>
 </div>

 background-image: url(http://placekitten.com/240/240);


 */
