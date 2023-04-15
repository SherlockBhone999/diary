
import { useState,useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Route, Routes , useParams } from 'react-router-dom'
import axios from 'axios'
import Homepage from './pages/Homepage'
import Historypage from './pages/Historypage'
import SpecialDayspage from './pages/SpecialDayspage'
import Writerpage from './pages/Writerpage'
import Quotespage from './pages/Quotespage'
import Tagspage from './pages/Tagspage'

import { allData } from './fakedata2'
const { current_month } = allData

export const Context = createContext()

const App = () => {
  const {id} = useParams()
  return <BrowserRouter>
   <Routes>
    <Route exact path='/' element={<Homepage />}/>
    <Route path='/history' element={<Historypage />}/>
    <Route path='/special_days' element={<SpecialDayspage />} />
    <Route path='/write' element={<Writerpage />} />
    <Route path='/quotes' element={<Quotespage />} />
    <Route path='/tags' element={<Tagspage />} />
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

const fetchCurrentMonthData = (baseUrl, setCurrentMonthData) => {
  axios.get(`${baseUrl}/get_current_month`)
  .then(res => {
    setCurrentMonthData(res.data)
  } )
} 
 


export default function Diary(){
  const baseUrl = 'http://localhost:3000'
  const [isAdmin, setIsAdmin ] = useState('')
  //for history, homepage
  const [currentMonthData , setCurrentMonthData ] = useState({})
  //for form, writer
  const [formdata , setFormdata ] = useState({})
  //for tagspage, form
  const [ taglist, setTaglist ] = useState([])
  //for quotespage, quotebox
  const [ quotelist , setQuotelist ] = useState([])
  
  
  useEffect(()=>{
    fetchTaglist(baseUrl, setTaglist)
    fetchQuotelist( baseUrl, setQuotelist )
    fetchCurrentMonthData( baseUrl, setCurrentMonthData )
  },[])
  
  return <Context.Provider value={{
    baseUrl,
    isAdmin,
    setIsAdmin,
    currentMonthData,
    setCurrentMonthData,
    formdata,
    setFormdata,
    taglist,
    setTaglist,
    quotelist,
    setQuotelist,
  
  }} >
    <App />
  </Context.Provider >
}