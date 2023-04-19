
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

const fetchCurrentMonthDaysMin = (baseUrl, setCurrentMonthDataMin , setIsTodayNew ) => {
  axios.get(`${baseUrl}/get_current_month_days_min`)
  .then(res => {
    setCurrentMonthDataMin(res.data)
    const daysInCurrentMonth = []
    res.data.map(day => {
      daysInCurrentMonth.push(day.day)
    })
    
    if(daysInCurrentMonth.includes(todayDate.toString())){
      setIsTodayNew(false)
    }else{
      setIsTodayNew(true)
    }
  
  } )
} 
 
const fetchAllYearsData = (baseUrl, setAllYearsData ) => {
  axios.get(`${baseUrl}/get_year`)
  .then(res => setAllYearsData(res.data))
} 

export default function Diary(){
  const baseUrl = 'http://localhost:3000'
  const [isAdmin, setIsAdmin ] = useState('')
  //for history, homepage
  const [currentMonthDataMin , setCurrentMonthDataMin ] = useState([])
  //for form, writer, this month  formdata for the day 
  const [formdata4TD , setFormdata4TD ] = useState({})
  //for tagspage, form
  const [ taglist, setTaglist ] = useState([])
  //for quotespage, quotebox
  const [ quotelist , setQuotelist ] = useState([])
  //all year data for new month (putting current month data into year ) and for history
  const [ allYearsData, setAllYearsData ] = useState([])
  //see if today new or update
  const [ isTodayNew, setIsTodayNew ] = useState(null)
  //quill for writer and this month
  const [quill,setQuill] = useState()
  
  
  useEffect(()=>{
    fetchTaglist(baseUrl, setTaglist)
    fetchQuotelist( baseUrl, setQuotelist )
    fetchCurrentMonthDaysMin( baseUrl, setCurrentMonthDataMin , setIsTodayNew )
    fetchAllYearsData( baseUrl, setAllYearsData )
  },[])
  
  return <Context.Provider value={{
    baseUrl,
    isAdmin,
    setIsAdmin,
    currentMonthDataMin,
    setCurrentMonthDataMin,
    formdata4TD,
    setFormdata4TD,
    taglist,
    setTaglist,
    quotelist,
    setQuotelist,
    allYearsData,
    setAllYearsData,
    isTodayNew,
    setIsTodayNew,
    
    quill,
    setQuill
  
  }} >
    <App />
  </Context.Provider >
}