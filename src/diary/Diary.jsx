
import { useState,useEffect, createContext, useContext } from 'react'
import { BrowserRouter, Route, Routes , useParams } from 'react-router-dom'
import axios from 'axios'
import Homepage from './pages/Homepage'
import Historypage from './pages/Historypage'
import SpecialDayspage from './pages/SpecialDayspage'
import Writerpage from './pages/Writerpage'
import Quotespage from './pages/Quotespage'



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
   </Routes>
  </BrowserRouter>
}


export default function Diary(){
  const baseUrl = 'http://localhost:3000'
  const [isAdmin, setIsAdmin ] = useState('')
  const [currentMonthData , setCurrentMonthData ] = useState([])
  const [formdata , setFormdata ] = useState({})
  
  return <Context.Provider value={{
    baseUrl,
    isAdmin,
    setIsAdmin,
    currentMonthData,
    setCurrentMonthData,
    formdata,
    setFormdata,
    
  }} >
    <App />
  </Context.Provider >
}