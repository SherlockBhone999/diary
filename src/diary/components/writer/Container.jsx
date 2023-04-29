import FormContainer from './FormContainer'
import NewMonthContainer from './NewMonthContainer'
import NewYearContainer from './NewYearContainer'
import {useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../Diary'
import axios from 'axios'


const date = new Date()
//const m = date.getMonth() + 1 
const m = date.getMonth() 
//const y = date.getFullYear()
const y = date.getFullYear() 
const thisMonth = m + '.' + y
const d = date.getDate() 
const today = d + '.' + m + '.' + y
const thisYear = y



const fetchToday = (baseUrl, id , quill, setFormdata ) => {
  axios.post(`${baseUrl}/get_current_month_day_one`, { _id : id} )
  .then(res => {
    setFormdata(res.data)
    quill.setContents(res.data.delta_data)
  })
}


export default function Container() {
  const navigate = useNavigate()
  const { currentMonthExtraData, currentMonthDataMin , setWriterMode , setFormdata , quill, baseUrl, writerMode } = useContext(Context)
  const [isNew , setIsNew ] = useState('')
  
  useEffect(()=>{
    const monthOfCurrentMonthData = currentMonthExtraData.month 
    if(thisMonth === monthOfCurrentMonthData ){
      setIsNew('not_new')
    }else if(!monthOfCurrentMonthData.includes(thisYear.toString())){ 
      setIsNew('new_year')
    }else{
      setIsNew('new_month')
    }
  },[])
  
  useEffect(()=>{
    //second place why writerMode is needed
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
  
    {isNew === 'new_month'? <NewMonthContainer /> : null }
    {isNew === 'not_new'? <FormContainer /> : null }
    { isNew === 'new_year'? <NewYearContainer /> : null }
  </div>
}