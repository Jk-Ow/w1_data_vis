import DataTable from "./DataTable";
import FileUpload from "./FileUpload";

function DataTab({tabItems, activeIndex, setTabItems}){
    return(
        <>
        <div className="dataTab">
            <div className="Table">
                <FileUpload activeIndex={activeIndex} setTabItems={setTabItems} tabItems={tabItems}></FileUpload>
                <DataTable tabItems={tabItems} activeIndex={activeIndex}/>
            </div>
        </div>
        </>
    )  
}

export default DataTab;