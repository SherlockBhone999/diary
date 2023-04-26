import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Context } from '../../Diary'


const updateExtraData = (baseUrl, resolution , currentMonthExtraData) => {
  const data = {...currentMonthExtraData, resolution : resolution }
  axios.post(`${baseUrl}/update_current_month_extra_data`, data )
}



export default function ExtraData(){
  const { baseUrl, currentMonthExtraData } = useContext(Context)
  const [ resolution, setResolution ] = useState('')
  
  useEffect(()=>{
    setResolution(currentMonthExtraData.resolution)
  },[currentMonthExtraData])
  
  return <div>
  
  
    <div>
      <p class='text-sm'>Resolution :</p>
      <div class='flex items-center'>
        <textarea value={resolution} onChange={(e)=>setResolution(e.target.value)}/>
        <button class='p-1 m-1 bg-blue-400 rounded ' onClick={()=>updateExtraData(baseUrl,resolution, currentMonthExtraData )}>update</button>
      </div>
    </div>
  
  </div>
}