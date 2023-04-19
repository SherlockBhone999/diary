
import { useState, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Diary'




export default function Home(){
  const navigate = useNavigate()
  
  return <div>
  
    <div>
      quotebox
    </div>
    
    <div>
      <button onClick={()=>{
        navigate('/write')
      }}>write </button>
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
        navigate('/days_to_be_remembered')
      }}>Days to be remembered</button>
    </div>
    
    <div>
      <button onClick={()=>{
        navigate('/tags')
      }}>tags</button>
    </div>

    <div>
      <button onClick={()=>{
        navigate('/this_month')
      }}>this_month</button>
    </div>
    
    
  </div>
}