
import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Diary'
import { allData } from '../fakedata2'
const { current_month } = allData

import QuotesBox from '../components/QuotesBox'

export default function Homepage(){
  const navigate = useNavigate()
  const { setFormdata } = useContext(Context)
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
    
    <div class='grid'>
      
      { current_month.days.map(day => {
        return <button onClick={()=>{
          setFormdata(day)
          navigate('write')
        }}>{day.day}</button>
      })
      }
    </div>
  
  </div>
}