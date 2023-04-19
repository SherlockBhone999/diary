import TextWriter from './TextWriter'
import Form from './Form'
import {useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../../Diary'

const createNewTagsIfNew = (taglist,formdata4TD, baseUrl) => {
  const mytaglist = []
  taglist.map(obj =>{
    mytaglist.push(obj.tag)
  })
  
  formdata4TD.tags.map(str => {
    if(!mytaglist.includes(str)){
      const data = { tag : str }
      axios.post(`${baseUrl}/create_tag`, data)
    }
  })
}

const createNewDayToBeRememberedIfChecked = (formdata4TD, baseUrl) => {
  if(formdata4TD.included_in_days_of_the_year){
    const data = { day : formdata4TD.day , reason : formdata4TD.reason_to_be_included , delta_data : formdata4TD.delta_data }
    axios.post(`${baseUrl}/create_day_to_be_remembered`, data )
  }
}

const createNewCurrentMonthDay = (baseUrl, formdata4TD ) => {
  axios.post(`${baseUrl}/create_current_month_day`, formdata4TD )
}

const updateCurrentMonthDay = (baseUrl, formdata4TD ) => {
  axios.post(`${baseUrl}/update_current_month_day`, formdata4TD )
}

const handleSubmit = (baseUrl , formdata4TD , taglist , currentMonthDataMin , isTodayNew ) => {
  createNewTagsIfNew(taglist, formdata4TD , baseUrl)
  createNewDayToBeRememberedIfChecked(formdata4TD , baseUrl)
  
  if(isTodayNew){
    createNewCurrentMonthDay(baseUrl, formdata4TD)
  }else{
    updateCurrentMonthDay(baseUrl, formdata4TD )
  }
  
}



export default function FormContainer() {
  const [ disableTextWriter, setDisableTextWriter ] = useState(false)
  const [ disableForm , setDisableForm ] = useState(false)
  const { formdata4TD , baseUrl , taglist, currentMonthDataMin, isTodayNew } = useContext(Context)

  
  
  return <div class='bg-black h-screen'>
    <TextWriter disable={disableTextWriter} setDisable={setDisableTextWriter} />
    <Form disable={disableForm} setDisable={setDisableForm} />
    
    <div class='flex justify-center'>
      { disableForm && disableTextWriter?
      <button class='bg-violet-400 m-4 p-2 rounded w-60 h-40' 
        onClick={()=>handleSubmit(baseUrl , formdata4TD , taglist, currentMonthDataMin , isTodayNew )}> Send </button>
      : null
      }
    </div>
  </div>
}