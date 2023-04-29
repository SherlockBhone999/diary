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

const updateMonth = (e,formdata4ED, setFormdata4ED) => {
  const data = {...formdata4ED, month : e.target.value }
  setFormdata4ED(data)
}


export default function ExtraData(){
  const { baseUrl, currentMonthExtraData } = useContext(Context)
  const [ formdata4ED , setFormdata4ED ] = useState({month : '', resolution : '', resolution_fulfilled : '', comment : ''})
  
  useEffect(()=>{
    setFormdata4ED({
      month : currentMonthExtraData.month,
      resolution : currentMonthExtraData.resolution,
      resolution_fulfilled : currentMonthExtraData.resolution_fulfilled,
      comment : currentMonthExtraData.comment
    })
  },[currentMonthExtraData])
  
  return <div class='w-full h-full'>
  
    <div class='bg-slate-400 p-2 w-full h-full border-2 border-black'>
      <p class='text-sm'>Month :</p>
      <input type='text' class='p-2 text-sm' value={formdata4ED.month} 
      onChange={(e)=>updateMonth(e,formdata4ED,setFormdata4ED)}/>
      <p class='text-sm'>Resolution :</p>
      <textarea value={formdata4ED.resolution} class='w-full h-[10vh] p-3 text-sm'
      onChange={(e)=>updateResolution(e,formdata4ED, setFormdata4ED)} />
      <p class='text-sm'>Resolution_fulfilled :</p>
      <textarea value={formdata4ED.resolution_fulfilled} class='w-full h-[10vh] p-3 text-sm'
      onChange={(e)=>updateResolutionFulfilled(e, formdata4ED , setFormdata4ED)} />
      <p class='text-sm'>Comment :</p>
      <textarea value={formdata4ED.comment} class='w-full h-[15vh] p-3 text-sm'
      onChange={(e)=>updateComment(e, formdata4ED, setFormdata4ED)} />
      
      <button class='p-3 m-1 bg-blue-400 rounded ' 
      onClick={()=>handleSubmit(baseUrl,formdata4ED, currentMonthExtraData )}>update</button>
      
    </div>
    

  
  </div>
}