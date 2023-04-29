
import { useState,useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Route, Routes , useParams } from 'react-router-dom'
import axios from 'axios'
import Homepage from './pages/Homepage'
import Historypage from './pages/Historypage'
import DaysToBeRememberedpage from './pages/DaysToBeRememberedpage'
import Writerpage from './pages/Writerpage'
import Quotespage from './pages/Quotespage'
import Tagspage from './pages/Tagspage'
import ThisMonthpage from './pages/ThisMonthpage'
 

export const Context = createContext()

const App = () => {
  const {id} = useParams()
  return <BrowserRouter>
   <Routes>
    <Route exact path='/' element={<Homepage />}/>
    <Route path='/history' element={<Historypage />}/>
    <Route path='/days_to_be_remembered' element={<DaysToBeRememberedpage />}/>
    <Route path='/write' element={<Writerpage />} />
    <Route path='/quotes' element={<Quotespage />} />
    <Route path='/tags' element={<Tagspage />} />
    <Route path='/this_month' element={<ThisMonthpage />} />
   </Routes>
  </BrowserRouter>
}


const fetchTaglist = (baseUrl, setTaglist ) => {
  axios.get(`${baseUrl}/get_tag`)
  .then(res => {
    setTaglist(res.data)
  })
}

const fetchQuotelist = (baseUrl, setQuotelist ) => {
  axios.get(`${baseUrl}/get_quote`)
  .then(res => {
    setQuotelist(res.data)
  })
}

const date = new Date()
const d = date.getDay()
const m = date.getMonth() + 1 
const y = date.getFullYear() 
const todayDate = d + '.' + m + '.' + y

const fetchCurrentMonthDaysMin = (baseUrl, setCurrentMonthDataMin ) => {
  axios.get(`${baseUrl}/get_current_month_days_min`)
  .then(res => {
    setCurrentMonthDataMin(res.data)
  } )
} 
 
const fetchAllYearsData = (baseUrl, setAllYearsData ) => {
  axios.get(`${baseUrl}/get_year`)
  .then(res => setAllYearsData(res.data))
} 

const fetchDTBRMin = (baseUrl, setDTBRMin ) => {
  axios.get(`${baseUrl}/get_days_to_be_remembered_min`)
  .then(res => {
    setDTBRMin(res.data)
  })
}

const fetchCurrentMonthExtraData = (baseUrl, setCurrentMonthExtraData ) => {
  axios.get(`${baseUrl}/get_current_month_extra_data`)
  .then(res => {
    setCurrentMonthExtraData(res.data[0])
  })
}


export default function Diary(){
  //const baseUrl = 'http://localhost:3000'
  const baseUrl = 'https://bhone-n-diary.onrender.com'
  const [isAdmin, setIsAdmin ] = useState('')
  //for history, homepage
  const [currentMonthDataMin , setCurrentMonthDataMin ] = useState([])
  //for everything, writer, DTBR , this month 
  const [formdata , setFormdata ] = useState({})
  //for tagspage, form
  const [ taglist, setTaglist ] = useState([])
  //for quotespage, quotebox
  const [ quotelist , setQuotelist ] = useState([])
  //all year data for new month (putting current month data into year ) and for history
  const [ allYearsData, setAllYearsData ] = useState([])
  //quill for writer and this month
  const [quill,setQuill] = useState()
  //cause there was problem in writer form set value
  const [ writerMode , setWriterMode ] = useState('write_new')
  //used by dtbr and this_month edit submit
  const [ dTBRMin , setDTBRMin ] = useState([])
  //for this month and new month creating year
  const [ currentMonthExtraData , setCurrentMonthExtraData ] = useState({month : ''})
  // for refetching alldata, value not matter, only the change
  
  
  useEffect(()=>{
    fetchTaglist(baseUrl, setTaglist)
    fetchQuotelist( baseUrl, setQuotelist )
    fetchCurrentMonthDaysMin( baseUrl, setCurrentMonthDataMin )
    fetchAllYearsData( baseUrl, setAllYearsData )
    fetchDTBRMin( baseUrl , setDTBRMin )
    fetchCurrentMonthExtraData( baseUrl, setCurrentMonthExtraData )
  },[])
  
  
  
  return <Context.Provider value={{
    baseUrl,
    isAdmin,
    setIsAdmin,
    currentMonthDataMin,
    setCurrentMonthDataMin,
    formdata,
    setFormdata,
    taglist,
    setTaglist,
    quotelist,
    setQuotelist,
    allYearsData,
    setAllYearsData,
    quill,
    setQuill,
    writerMode,
    setWriterMode,
    dTBRMin,
    setDTBRMin,
    currentMonthExtraData,
    setCurrentMonthExtraData
  
  }} >
    <App />
  </Context.Provider >
}