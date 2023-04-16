import FormContainer from './FormContainer'
import NewMonthContainer from './NewMonthContainer'
import {useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../../Diary'



const date = new Date()
//const m = date.getMonth() + 1 
const m = 1
const y = date.getFullYear()
const thisMonth = m + '.' + y


export default function Container() {
  const navigate = useNavigate()
  const { currentMonthDataMin } = useContext(Context)
  const [isNewMonth , setIsNewMonth ] = useState(null)
  
  useEffect(()=>{
    
    const monthOfCurrentMonthData = currentMonthDataMin.month 
    if(thisMonth === monthOfCurrentMonthData ){
      setIsNewMonth(false)
    }else{
      setIsNewMonth(true)
    }
  
  },[])

  return <div>
    {JSON.stringify(currentMonthDataMin)}
    <button onClick={()=>navigate('/')}>back</button>
  
    {isNewMonth? <NewMonthContainer /> : null }
    {isNewMonth===false? <FormContainer /> : null }
  </div>
}