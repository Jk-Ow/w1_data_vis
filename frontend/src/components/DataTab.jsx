import DataTable from "./DataTable";
import FileUpload from "./FileUpload";
import Tooltip from "./Tooltip";
import "./Tab.css";

function DataTab({tabItems, activeIndex, setTabItems}){
    return(
        <>
        <div className="dataTab tab">
            <div className="Table">
                <Tooltip tooltip="Hier kannst du eine Datei hochladen um daraus Visualisierungen zu erstellen">
                    <FileUpload activeIndex={activeIndex} setTabItems={setTabItems} tabItems={tabItems}></FileUpload>
                </Tooltip>
                <DataTable tabItems={tabItems} activeIndex={activeIndex}/>
            </div>
        </div>
        </>
    )  
}

export default DataTab;