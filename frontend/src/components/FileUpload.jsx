import React, { useState } from 'react';
import * as Papa from 'papaparse'
import './FileUpload.css'

function FileUpload({ activeIndex, setTabItems, tabItems }) {

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
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function (results) {
                    //Anfuehrungszeichen entfernen
                    const cleanedData = results.data.map(row =>
                        Object.fromEntries(
                            Object.entries(row).map(
                                ([key, value]) => {
                                    if(!isNaN(value)){
                                        return [key.replace(/"/g, ''), value]
                                    }
                                    return [key.replace(/"/g, ''), value.replace(/"/g, '')]
                                }
                            ) // Remove quotes from each value
                        )
                    );
                    setTabItems((prevTabItems) => {
                        let newItems = [...prevTabItems];
                        newItems[activeIndex]["tabData"] = {
                            ...prevTabItems[activeIndex]["tabData"],
                            fileName: file.name,
                            fileOpen: true,
                            file: cleanedData
                        }
                        return newItems
                    })

                },
                transform: (value, header) => {

                    if (!isNaN(parseFloat(Number(value)))) {
                        return parseFloat(value);
                    }
                    const numValue = parseFloat(value.replace(',', '.'));

                    // If it's a valid number, return the number, otherwise return the string
                    if (!isNaN(Number(numValue))) {
                        return numValue;
                    }

                    // If it's not a valid number, return the original value (string)
                    return value;
                }
            });
        };

        // Handle errors
        reader.onerror = () => {
            alert('There was an error reading the file.');
        };

        reader.readAsText(file);
    };

    return (
        <div className='fileUpload'>
            <input type="file" accept=".csv,.xlsx" onChange={handleFileChange} />
        </div>
    );
};

export default FileUpload;
