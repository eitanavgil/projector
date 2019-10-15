import React, {useState, useEffect} from "react";
import {KalturaMediaEntry} from "kaltura-typescript-client/api/types/KalturaMediaEntry";

interface IProps {
    data: KalturaMediaEntry,
    x?: number,
    y?: number
}

const ProjectorItem: React.FC<IProps> = (props) => {
    // TO
    return (
        <div className="hexagon hexagon2">
            <div className="hexagon-in1">
                <div className="hexagon-in2"
                     style={{backgroundImage: `url(${props.data.thumbnailUrl + "/width/240"})`}}></div>
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
