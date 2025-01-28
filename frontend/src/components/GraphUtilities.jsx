import * as d3 from "d3";

export function barGraph(data, svgRef, xKey, yKey) {

    const width = 640;
    const height = 512;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 70;
    const marginLeft = 40;


    const svg = d3
        .select(svgRef.current) // Select the DOM node via ref
        .attr("width", width)
        .attr("height", height);

    const xScale = d3.scaleBand()
        .domain(data.map(d => d[xKey]))  // Using 'name' as the key for x-axis
        .range([marginLeft, width - marginRight]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d[yKey])])
        .range([height - marginBottom, marginTop]);

    svg.selectAll('.bar')
        .data(data)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr("fill", "steelblue")
        .attr("stroke", "white")
        .attr('x', d => xScale(d[xKey]))
        .attr('y', d => yScale(d[yKey]))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - marginBottom - yScale(d[yKey]));

    // Add x-axis
    svg.append('g')
        .attr("transform", `translate(0,${height - marginBottom})`)
        .call(d3.axisBottom(xScale))
        .selectAll("text")  // Select the text elements (labels)
        .attr("transform", "rotate(-45)")  // Rotate the labels by -45 degrees
        .style("text-anchor", "end");

    // Add y-axis
    svg.append('g')
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(yScale));
}


export function lineGraph(data, svgRef, xKey, yKey) {
    const width = 640;
    const height = 512;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 30;
    const marginLeft = 40;

    // Define the x scale based on whether xData is categorical or continuous
    const x = d3.scaleLinear() // Start with a linear scale for continuous x
        .domain([d3.min(data, d => d[xKey]), d3.max(data, d => d[xKey])]) // Automatically determine domain from the xKey
        .range([marginLeft, width - marginRight]);

    // Define the y scale for the data (assumes continuous y values)
    const y = d3.scaleLinear()
        .domain([0, Math.max(...data.map(d => d[yKey]))]) // Automatically compute the domain from the yKey
        .range([height - marginBottom, marginTop]);

    // Create the SVG container
    const svg = d3
        .select(svgRef.current) // Select the DOM node via ref
        .attr("width", width)
        .attr("height", height);

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

    // Create a line generator for the line graph
    const line = d3.line()
        .x(d => x(d[xKey]))  // Map x values based on xKey
        .y(d => y(d[yKey])); // Map y values based on yKey

    // Create the line path using the line generator
    svg.append("path")
        .data([data])  // Pass in the entire data array
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", line); // Generate the path using the line generator
}


export function boxPlot(data, svgRef, key) {
    const width = 640;
    const height = 512;
    const marginTop = 20;
    const marginRight = 20;
    const marginBottom = 50;
    const marginLeft = 40;
    const boxWidth = 60;

    const positionLeft = marginLeft + (width - marginLeft - marginRight - boxWidth) / 2;
    const positionRight = marginLeft + (width - marginLeft - marginRight + boxWidth) / 2;

    // Define the y scale for the data (continuous y values)
    const y = d3.scaleLinear()
        .domain([d3.min(data, d => d[key]), d3.max(data, d => d[key])]) // Automatically compute the domain from the key
        .range([height - marginBottom, marginTop]);

    // Create the SVG container
    const svg = d3
        .select(svgRef.current) // Select the DOM node via ref
        .attr("width", width)
        .attr("height", height);

    // Add the y-axis
    svg
        .append("g")
        .attr("transform", `translate(${marginLeft},0)`)
        .call(d3.axisLeft(y));

    // Compute the statistics for the boxplot
    const q1 = d3.quantile(data, 0.25, d => d[key]);
    const median = d3.quantile(data, 0.5, d => d[key]);
    const q3 = d3.quantile(data, 0.75, d => d[key]);
    const iqr = q3 - q1;
    const min = d3.min(data, d => d[key]);
    const max = d3.max(data, d => d[key]);

    // Remove any potential outliers outside 1.5 * IQR
    const lowerFence = q1 - 1.5 * iqr;
    const upperFence = q3 + 1.5 * iqr;

    const lowerWhisker = d3.min(data.filter(d => d[key] > lowerFence), d => d[key]);
    const upperWhisker = d3.max(data.filter(d => d[key] < upperFence), d => d[key]);

    // Draw the box (representing Q1 to Q3)
    svg.append("rect")
        .attr("x", positionLeft)
        .attr("y", y(q3))
        .attr("width", boxWidth)
        .attr("height", y(q1) - y(q3))
        .attr("fill", "lightblue")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Draw the median line inside the box
    svg.append("line")
        .attr("x1", positionLeft)
        .attr("y1", y(median))
        .attr("x2", positionRight)
        .attr("y2", y(median))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Draw the whiskers (min and max within fences)
    svg.append("line")
        .attr("x1", positionLeft + (positionRight - positionLeft) / 2)
        .attr("y1", y(q1))
        .attr("x2", positionLeft + (positionRight - positionLeft) / 2)
        .attr("y2", y(lowerWhisker))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

        svg.append("line")
        .attr("x1", positionLeft)
        .attr("y1", y(lowerWhisker))
        .attr("x2", positionRight)
        .attr("y2", y(lowerWhisker))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    svg.append("line")
        .attr("x1", positionLeft + (positionRight - positionLeft) / 2)
        .attr("y1", y(upperWhisker))
        .attr("x2", positionLeft + (positionRight - positionLeft) / 2)
        .attr("y2", y(q3))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);
    
        svg.append("line")
        .attr("x1", positionLeft)
        .attr("y1", y(upperWhisker))
        .attr("x2", positionRight)
        .attr("y2", y(upperWhisker))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2);

    // Draw potential outliers (points outside the whiskers)
    data.forEach(d => {
        const value = d[key];
        if (value < lowerFence || value > upperFence) {
            svg.append("circle")
                .attr("cx", marginLeft + (width - marginLeft - marginRight) / 2)
                .attr("cy", y(value))
                .attr("r", 3)
                .attr("fill", "red");
        }
    });
}
