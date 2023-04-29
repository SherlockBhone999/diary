import { useContext , useEffect } from 'react'
import { Context } from '../../Diary'
import axios from 'axios'


export default function List({setItemToFetch, setSideStyle , setSideStyle2 }) {
  const { currentMonthDataMin} = useContext(Context)
  
  
  return <div>
    <div>
      {currentMonthDataMin.map(day => <div>
        <button class=' p-2 m-3 border-2 border-black' 
        onClick={()=>{
          setItemToFetch(day)
          setSideStyle('')
          setSideStyle2('translate-x-full')
        } }>{day.day}</button>
      </div>)}
    </div>
    
  </div>
}