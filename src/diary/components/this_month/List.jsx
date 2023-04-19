import { useContext , useEffect } from 'react'
import { Context } from '../../Diary'
import axios from 'axios'


export default function List({setItemToFetch}) {
  const { currentMonthDataMin} = useContext(Context)
  
  
  return <div>
    <div>
      {currentMonthDataMin.map(day => <div>
        <button class='text-white p-2 m-3 border-2' 
        onClick={()=>setItemToFetch(day)}>{day.day}</button>
      </div>)}
    </div>
    
  </div>
}