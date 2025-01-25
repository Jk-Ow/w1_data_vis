import React from "react";
import "./Tooltip.css"

function Tooltip({tooltip, children}){
    return(
        <div className="tooltipContainer">
            <div className="tooltip">
                {tooltip}
            </div>
            {children}
        </div>
    )
}

export default Tooltip;