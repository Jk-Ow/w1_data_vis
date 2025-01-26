import { useState } from 'react'
import './App.css'
import Navi from './components/navi'
import AppContent from './components/AppContent'

let dataTab = {
  title: "Data",
  type: "data",
  tabData: {
    fileKeys:[],
    file: null,
    fileOpen: false,
  },
  visTypes:[
    "Line-Graph",
    "Bar-Graph",
    "Boxplot",
    "Statistic Values"
  ]
}
let visTab = {
  title: "Vis 1",
  type: "vis",
  tabData: {
    xAxis: "",
    yAxis: "",
    visType: "",
  }
}

function App() {
  const [tabItems, setTabItems] = useState([dataTab, visTab])
  const [activeIndex, setactiveIndex] = useState(0)

  return (
    <>
      <Navi tabItems={tabItems} setTabItems={setTabItems} activeIndex={activeIndex} setactiveIndex={setactiveIndex}/>
      <AppContent setTabItems={setTabItems} tabItems={tabItems} activeIndex={activeIndex}></AppContent>
    </>
  )
}

export default App
