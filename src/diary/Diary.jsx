
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

const fetchCurrentMonthData = (baseUrl, setCurrentMonthDataMin) => {
  axios.get(`${baseUrl}/get_current_month_filtered`)
  .then(res => {
    setCurrentMonthDataMin(res.data)
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
  const [currentMonthDataMin , setCurrentMonthDataMin ] = useState({})
  //for form, writer
  const [formdata , setFormdata ] = useState({})
  //for tagspage, form
  const [ taglist, setTaglist ] = useState([])
  //for quotespage, quotebox
  const [ quotelist , setQuotelist ] = useState([])
  //all year data for new month (putting current month data into year ) and for history
  const [ allYearsData, setAllYearsData ] = useState([])
  
  useEffect(()=>{
    fetchTaglist(baseUrl, setTaglist)
    fetchQuotelist( baseUrl, setQuotelist )
    fetchCurrentMonthData( baseUrl, setCurrentMonthDataMin )
    fetchAllYearsData( baseUrl, setAllYearsData )
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
  
  }} >
    <App />
  </Context.Provider >
}