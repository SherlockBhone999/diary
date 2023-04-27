import { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { Context } from '../../Diary'


const handleSubmit = (baseUrl, formdata4ED, currentMonthExtraData) => {
  const data = {...currentMonthExtraData, ...formdata4ED }
  axios.post(`${baseUrl}/update_current_month_extra_data`, data )
}

const updateResolution = (e,formdata4ED, setFormdata4ED) => {
  const data = {...formdata4ED, resolution : e.target.value }
  setFormdata4ED(data)
}

const updateResolutionFulfilled = (e,formdata4ED, setFormdata4ED) => {
  const data = {...formdata4ED, resolution_fulfilled : e.target.value }
  setFormdata4ED(data)
}

const updateComment = (e,formdata4ED, setFormdata4ED) => {
  const data = {...formdata4ED, comment : e.target.value }
  setFormdata4ED(data)
}


export default function ExtraData(){
  const { baseUrl, currentMonthExtraData } = useContext(Context)
  const [ formdata4ED , setFormdata4ED ] = useState({resolution : '', resolution_fulfilled : '', comment : ''})
  
  useEffect(()=>{
    setFormdata4ED({ 
      resolution : currentMonthExtraData.resolution,
      resolution_fulfilled : currentMonthExtraData.resolution_fulfilled,
      comment : currentMonthExtraData.comment
    })
  },[currentMonthExtraData])
  
  return <div>
  
    <div class='bg-slate-400 rounded p-2'>
      <p class='text-sm'>Resolution :</p>
      <textarea value={formdata4ED.resolution} 
      onChange={(e)=>updateResolution(e,formdata4ED, setFormdata4ED)} />
      <p class='text-sm'>Resolution_fulfilled :</p>
      <input type='text' value={formdata4ED.resolution_fulfilled} class='w-11/12 '
      onChange={(e)=>updateResolutionFulfilled(e, formdata4ED , setFormdata4ED)} />
      <p class='text-sm'>Comment :</p>
      <textarea value={formdata4ED.comment} 
      onChange={(e)=>updateComment(e, formdata4ED, setFormdata4ED)} />
      
    </div>
    
      <button class='p-1 m-1 bg-blue-400 rounded ' 
      onClick={()=>handleSubmit(baseUrl,formdata4ED, currentMonthExtraData )}>update</button>
  
  </div>
}