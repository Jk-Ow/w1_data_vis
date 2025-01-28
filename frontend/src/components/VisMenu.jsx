import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import Tooltip from "./Tooltip";

function VisMenu({tabItems, setTabItems, activeIndex}){

    const dataKeys = tabItems[0].tabData.fileOpen ? Object.keys(tabItems[0].tabData.file[0]) : ["no file loaded"]
    const visTypes = tabItems[0].visTypes?tabItems[0].visTypes:"no Visualistions defined";
    const [xAxis, setXAxis] = useState(tabItems[0].tabData.fileOpen ? tabItems[activeIndex].tabData["xAxis"] : "")
    const [yAxis, setYAxis] = useState(tabItems[0].tabData.fileOpen ? tabItems[activeIndex].tabData["yAxis"] : "")
    const [visType, setVisType] = useState(tabItems[0].tabData.fileOpen ? tabItems[activeIndex].tabData["visType"] : "")

    useEffect(()=>{
        //Todo Write logic to Update tabItems when xAxis changes
        setTabItems((prevValues)=>{
            const newValues = [...prevValues];
            newValues[activeIndex].tabData = {
                ...newValues[activeIndex].tabData,
                "xAxis": xAxis,
                "yAxis": yAxis,
                "visType": visType,
            };
            return newValues;
        })

    },[xAxis, yAxis, visType]);

    return(
        <>
        <div className="VisMenu">
            <Tooltip tooltip="Hier kannst du den gewünschten Visualisierungs Typ aussuchen.">
                <SelectInput inputName={"Chart Type:"} dataKeys={visTypes} setSelectedItem={setVisType}/>
            </Tooltip>
            <Tooltip tooltip="Hier kannst du auswählen welche Daten auf der X Achse dargestellt werden.">
                <SelectInput inputName={"X axis:"} selectedItem={xAxis} setSelectedItem={setXAxis} dataKeys={dataKeys}/>
            </Tooltip>
            <Tooltip tooltip="Hier kannst du auswählen welche Daten auf der Y Achse dargestellt werden.">
                <SelectInput inputName={"Y axis:"} dataKeys={dataKeys} setSelectedItem={setYAxis}/>
            </Tooltip>
            <Tooltip tooltip="Hier kannst du auswählen nach welcher Variable die Daten gruppiert werden sollen.">
                <SelectInput inputName={"Splitgroup:"} dataKeys={[...dataKeys,"none"]}/>
            </Tooltip>
        </div>
        </> 
    )
}

export default VisMenu;