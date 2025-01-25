import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import "./Tab.css";

function D3Graph({ xData, yData, visType, activeIndex }) {
    //erzeugt eine reference auf den SVG container
    const svgRef = useRef(null);

    const data = {
        xData:["a", "b", "c","d", "e", "f", "g", "h", "i"],
        yData:[1, 4, 5, 24, 3 , 4, 9, 11, 13]
    }

    useEffect(() => {
        // Function to generate and render the chart
        const graphSvg = () => {
            const width = 640;
            const height = 400;
            const marginTop = 20;
            const marginRight = 20;
            const marginBottom = 30;
            const marginLeft = 40;

            // X (horizontal position) scale
            const x = d3
                .scaleUtc()
                .domain([new Date("2023-01-01"), new Date("2024-01-01")])
                .range([marginLeft, width - marginRight]);

            // Y (vertical position) scale
            const y = d3
                .scaleLinear()
                .domain([0, Math.max(...data.yData)])
                .range([height - marginBottom, marginTop]);

            // Create the SVG container
            const svg = d3
                .select(svgRef.current) // Select the DOM node via ref
                .attr("width", width)
                .attr("height", height);

            // Clear any existing content
            svg.selectAll("*").remove();

            // Add the x-axis
            svg
                .append("g")
                .attr("transform", `translate(0,${height - marginBottom})`)
                .call(d3.axisBottom(x));

            // Add the y-axis
            svg
                .append("g")
                .attr("transform", `translate(${marginLeft},0)`)
                .call(d3.axisLeft(y));
        };

        graphSvg(); // Call the function when the component mounts or updates
    }, [activeIndex]); // Dependency array ensures updates when data changes

    return (
        <svg ref={svgRef}></svg>
    );
}
export default D3Graph;