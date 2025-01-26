import "./Navi.css"
import appLogo from '/logo.svg'
import Button from "./Button";
import Tooltip from "./Tooltip";


function Navi({tabItems, setTabItems, activeIndex, setactiveIndex}){
    return (
        <>
        <div className="navbar">
            <div className="tabs">
                {tabItems.map((tab, index) =>
                    <Tooltip tooltip={
                        index>0?
                        "Hier kannst du Visualisierungs-Tab Nr. "+index+" aufrufen.":
                        "Hier kannst du den Daten-Tab aufrufen."
                        } key={index}>
                        <Button activeState={activeIndex==index} clickEvent={()=>setactiveIndex(index)} key={index}>{tab.title}</Button>
                    </Tooltip>
                )}
                <Tooltip tooltip="Hier kannst du neue Visualisierungs-Tabs hinzufügen.">
                    <Button clickEvent={()=>setTabItems((prevTabItems)=>([
                        ...prevTabItems,
                        {
                        title: `Vis ${prevTabItems.length}`,
                        type: "vis",
                        tabData: {}
                        }
                    ]))}>Add Vis</Button>
                </Tooltip>
                
            </div> 
            <img src={appLogo} className="logo" alt="Eyes on Data logo" />
        </div>
        </>
    )
}
export default Navi;