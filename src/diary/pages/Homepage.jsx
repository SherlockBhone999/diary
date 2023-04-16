
import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Diary'
import { allData } from '../fakedata2'
const { current_month } = allData

import QuotesBox from '../components/QuotesBox'

export default function Homepage(){
  const navigate = useNavigate()
  const { setFormdata , currentMonthData } = useContext(Context)
  return <div>
  
    <div>
      <QuotesBox />
    </div>
    
    <div>
      <button onClick={()=>{
        navigate('/write')
        setFormdata({})
      }}>write new</button>
    </div>
    
    <div>
      <button onClick={()=>{
        navigate('/history')
      }}>history</button>
    </div>
    
    <div>
      <button onClick={()=>{
        navigate('/quotes')
      }}>quotes</button>
    </div>
    
    <div>
      <button onClick={()=>{
        navigate('/special_days')
      }}>Days to be remembered</button>
    </div>
    
    <div>
      <button onClick={()=>{
        navigate('/tags')
      }}>tags</button>
    </div>
 { currentMonthData.days?
    <div class='grid'>
      { currentMonthData.days.map(day => {
        return <button onClick={()=>{
          setFormdata(day)
          navigate('/write')
        }}>{day.day}</button>
      }) }
    </div>
  : null  
 }
 
  </div>
}