import list from './fakedata'

import App from './App'
import {useState,createContext} from 'react'

export const Context = createContext()

const listofthemonth = list

function DiaryContextProvider(){
  const [mood,setMood] = useState('good')
  const [tags,setTags] = useState([])
  const [monthlylist,setMonthlylist] = useState(listofthemonth)
  const [done,setDone] = useState(false)
  const [newday,setNewday] = useState(false)
  const [createORupdate,setCreateORupdate] = useState('create')
  const [normalroutine,setNormalroutine] = useState('')
  const [interfaceForAllpage, setInterfaceForAllpage] = useState('all')
  const [uploaded, setUploaded] = useState(false)
  const [showSidepage, setShowSidepage] = useState('translate-x-full')
  const [showAddQuote, setShowAddQuote] = useState('hide')
  const [sidepageItem, setSidepageItem] = useState({})
  const [dataOfTheMonthForPieChart, setDataOfTheMonthForPieChart] = useState(list)

  
  
  return <Context.Provider value={{
    mood,
    setMood,
    tags,
    setTags,
    monthlylist,
    setMonthlylist,
    done,
    setDone,
    newday,
    setNewday,
    createORupdate,
    setCreateORupdate,
    normalroutine,
    setNormalroutine,
    interfaceForAllpage,
    setInterfaceForAllpage,
    uploaded,
    setUploaded,
    showSidepage,
    setShowSidepage,
    showAddQuote,
    setShowAddQuote,
    sidepageItem,
    setSidepageItem,
    dataOfTheMonthForPieChart,
    setDataOfTheMonthForPieChart,
    
    
    
  }}>
  <App />
  </Context.Provider>
}

export default DiaryContextProvider