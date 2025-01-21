import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './DataTable.css'

function DataTable({tabItems, activeIndex}){

    const Table = () => {
        const tableRef = useRef();
      
        useEffect(() => {
            const data = tabItems[activeIndex]["tabData"]["file"];
            // Create a table
            const table = d3.select(tableRef.current).append('table');
            const thead = table.append('thead');
            const tbody = table.append('tbody');
        
            // Create table header
            const columns = Object.keys(data[0]); // Get column names from the first row of data
            thead.append('tr')
                .selectAll('th')
                .data(columns)
                .enter()
                .append('th')
                .text(d => d); // Column names as table headers
        
            // Create table rows
            const rows = tbody.selectAll('tr')
                            .data(data)
                            .enter()
                            .append('tr');
            
                // Create table cells for each row
            rows.selectAll('td')
                .data(function(row) {
                    return columns.map(function(column) {
                        return row[column];
                    });
                })
                .enter()
                .append('td')
                .text(d => d); // Cell content is the value of each column in the row
            ;
            return ()=>{
                d3.select(tableRef.current).select('table').remove();
            }
      
        }, []); // The empty array ensures this effect runs only once
      
        return <div ref={tableRef}></div>;
    };

    return(
        <>
        {tabItems[activeIndex]["tabData"]["file"] && (
        <div>
          <h2>File Content:</h2>
          <Table/>
        </div>
        )}
        </>
    )
}

export default DataTable