import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import Tooltip from "./Tooltip";

function VisMenu({tabItems, setTabItems, activeIndex}){

    const dataKeys = tabItems[0].tabData.fileOpen ? Object.keys(tabItems[0].tabData.file[0]) : ["no file loaded"]
    const [xAxis, setXAxis] = useState(tabItems[0].tabData.fileOpen ? tabItems[activeIndex].tabData["xAxis"] : "")
    useEffect(()=>{
        //Todo Write logic to Update tabItems when xAxis changes

    },[xAxis, tabItems]);

    return(
        <>
        <div className="VisMenu">
            <Tooltip tooltip="Hier kannst du den gewünschten Visualisierungs Typ aussuchen.">
                <SelectInput inputName={"Chart Type:"} dataKeys={dataKeys}/>
            </Tooltip>
            <Tooltip tooltip="Hier kannst du auswählen welche Daten auf der X Achse dargestellt werden.">
                <SelectInput inputName={"X axis:"} selectedItem={xAxis} setSelectedItem={setXAxis} dataKeys={dataKeys}/>
            </Tooltip>
            <Tooltip tooltip="Hier kannst du auswählen welche Daten auf der Y Achse dargestellt werden.">
                <SelectInput inputName={"Y axis:"} dataKeys={dataKeys}/>
            </Tooltip>
            <Tooltip tooltip="Hier kannst du auswählen nach welcher Variable die Daten gruppiert werden sollen.">
                <SelectInput inputName={"Splitgroup:"} dataKeys={[...dataKeys,"none"]}/>
            </Tooltip>
        </div>
        </>
    )
}

export default VisMenu;