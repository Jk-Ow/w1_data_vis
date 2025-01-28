import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { barGraph, lineGraph, boxPlot } from "./GraphUtilities";
import "./Tab.css";

function D3Graph({file, tabData, activeIndex }) {
    //erzeugt eine reference auf den SVG container
    const svgRef = useRef(null);

    useEffect(() => {

        // Clear any existing content
        d3.select(svgRef.current).selectAll("*").remove();
        
        switch (tabData.visType) {
            case "Line-Graph":
                lineGraph(file, svgRef, tabData.xAxis, tabData.yAxis);
                break;
            case "Bar-Graph":
                barGraph(file, svgRef, tabData.xAxis, tabData.yAxis);
                break;
            case "Boxplot":
                boxPlot(file, svgRef, tabData.xAxis);
                break;
        
            default:
                break;
        }
         // Call the function when the component mounts or updates
    }, [activeIndex, tabData]); // Dependency array ensures updates when data changes

    return (
        <svg ref={svgRef}></svg>
    );
}
export default D3Graph;