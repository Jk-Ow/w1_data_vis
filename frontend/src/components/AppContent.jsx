import DataTab from "./DataTab"
import VisTab from "./VisTab"

function AppContent({tabItems, activeIndex, setTabItems}){
    
    switch (tabItems[activeIndex].type) {
        case "data":
            return <DataTab tabItems={tabItems} setTabItems={setTabItems} activeIndex={activeIndex}/>;
        case "vis":
            return <VisTab tabItems={tabItems} setTabItems={setTabItems} activeIndex={activeIndex}/>;
    }
}

export default AppContent