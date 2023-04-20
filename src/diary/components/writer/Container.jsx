import FormContainer from './FormContainer'
import NewMonthContainer from './NewMonthContainer'
import {useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../Diary'
import axios from 'axios'


const date = new Date()
const m = date.getMonth() + 1 
const y = date.getFullYear()
const thisMonth = m + '.' + y
const d = date.getDate()
const today = d + '.' + m + '.' + y


const fetchToday = (baseUrl, id , quill, setFormdata ) => {
  axios.post(`${baseUrl}/get_current_month_day`, { _id : id} )
  .then(res => {
    setFormdata(res.data)
    quill.setContents(res.data.delta_data)
  })
}


export default function Container() {
  const navigate = useNavigate()
  const { currentMonthDataMin , setWriterMode , setFormdata , quill, baseUrl, writerMode } = useContext(Context)
  const [isNewMonth , setIsNewMonth ] = useState(null)
  
  useEffect(()=>{
    const monthOfCurrentMonthData = currentMonthDataMin.month 
    if(thisMonth === monthOfCurrentMonthData ){
      setIsNewMonth(false)
    }else{
      setIsNewMonth(true)
    }
  
  },[])
  
  useEffect(()=>{
    if(writerMode === 'update_today'){
      var idOfToday = ""
      currentMonthDataMin.map(day => { 
        if(day.day === today.toString()){
          idOfToday = day._id
        }
      })
      fetchToday(baseUrl, idOfToday, quill , setFormdata )
    }
  },[writerMode])

  return <div>
    {JSON.stringify(currentMonthDataMin)}
    <button onClick={()=>navigate('/')}>back</button>
  
    {isNewMonth? <NewMonthContainer /> : null }
    {isNewMonth===false? <FormContainer /> : null }
  </div>
}