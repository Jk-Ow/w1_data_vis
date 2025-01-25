import React, { useRef, useEffect, useState } from "react";
import VisMenu from "./VisMenu";
import "./Tab.css";
import D3Graph from "./D3Graph";

function VisTab({ tabItems, setTabItems, activeIndex }) {
    return (
        <div className="visTab tab">
            <div className="TableVis">
            <D3Graph activeIndex={activeIndex}/>
            </div>
            <VisMenu tabItems={tabItems} setTabItems={setTabItems} activeIndex={activeIndex}/>
        </div>
    );
}
export default VisTab;