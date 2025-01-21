import "./Navi.css"
import appLogo from '/logo.svg'
import Button from "./Button";


function Navi({tabItems, setTabItems, activeIndex, setactiveIndex}){
    return (
        <>
        <div className="navbar">
            <div className="tabs">
                {tabItems.map((tab, index) =>
                    <Button activeState={activeIndex==index} clickEvent={()=>setactiveIndex(index)} key={index}>{tab.title}</Button>
                )}
                <Button clickEvent={()=>setTabItems((prevTabItems)=>([
                    ...prevTabItems,
                    {
                    title: `Vis ${prevTabItems.length}`,
                    type: "vis",
                    tabData: {}
                    }
                ]))}>Add Vis</Button>
            </div> 
            <img src={appLogo} className="logo" alt="Eyes on Data logo" />
        </div>
        </>
    )
}
export default Navi;