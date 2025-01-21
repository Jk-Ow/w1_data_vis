import React, { useState } from 'react';
import * as Papa from 'papaparse'

function FileUpload({activeIndex, setTabItems, tabItems}){

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      readFile(file);
    }
  };

  // Use FileReader to read the file content
  const readFile = (file) => {
    const reader = new FileReader();

    // Handle when file is successfully read
    reader.onload = (e) => {
        const content = e.target.result;
        const papaParsed = Papa.parse(content, {
          header: true,
          complete: function(results) {
            console.log("parsed csv");
          },
        });

        const parsedData = papaParsed.data

        setTabItems((prevTabItems)=>{
            let newItems = [...prevTabItems];
            newItems[activeIndex]["tabData"]={
                ...prevTabItems[activeIndex]["tabData"],
                fileName: file.name,
                fileOpen: true,
                file: parsedData
            }
            return newItems
        })
    };

    // Handle errors
    reader.onerror = () => {
      console.error('Error reading file');
      alert('There was an error reading the file.');
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
    </div>
  );
};

export default FileUpload;
