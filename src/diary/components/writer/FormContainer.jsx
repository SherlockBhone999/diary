import TextWriter from './TextWriter'
import Form from './Form'
import {useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Context } from '../../Diary'

const createNewTagsIfNew = (taglist,formdata, baseUrl) => {
  const mytaglist = []
  taglist.map(obj =>{
    mytaglist.push(obj.tag)
  })
  
  formdata.tags.map(str => {
    if(!mytaglist.includes(str)){
      const data = { tag : str }
      axios.post(`${baseUrl}/create_tag`, data)
    }
  })
}

const createNewDayToBeRememberedIfChecked = (formdata, baseUrl) => {
  if(formdata.included_in_days_of_the_year){
    const data = { day : formdata.day , reason : formdata.reason_to_be_included , delta_data : formdata.delta_data }
    axios.post(`${baseUrl}/create_day_to_be_remembered`, data )
  }
}

const createNewCurrentMonthDay = (baseUrl, formdata ) => {
  axios.post(`${baseUrl}/create_current_month_day`, formdata )
}

const updateCurrentMonthDay = (baseUrl, formdata ) => {
  axios.post(`${baseUrl}/update_current_month_day`, formdata )
}

const handleSubmit = (baseUrl , formdata , taglist , currentMonthDataMin , isTodayNew ) => {
  createNewTagsIfNew(taglist, formdata , baseUrl)
  createNewDayToBeRememberedIfChecked(formdata , baseUrl)
  
  if(isTodayNew){
    createNewCurrentMonthDay(baseUrl, formdata)
  }else{
    updateCurrentMonthDay(baseUrl, formdata )
  }
  
}



export default function FormContainer() {
  const [ disableTextWriter, setDisableTextWriter ] = useState(false)
  const [ disableForm , setDisableForm ] = useState(false)
  const { formdata , baseUrl , taglist, currentMonthDataMin, isTodayNew } = useContext(Context)

  
  
  return <div class='bg-black h-screen'>
    <TextWriter disable={disableTextWriter} setDisable={setDisableTextWriter} />
    <Form disable={disableForm} setDisable={setDisableForm} />
    
    <div class='flex justify-center'>
      { disableForm && disableTextWriter?
      <button class='bg-violet-400 m-4 p-2 rounded w-60 h-40' 
        onClick={()=>handleSubmit(baseUrl , formdata , taglist, currentMonthDataMin , isTodayNew )}> Send </button>
      : null
      }
    </div>
  </div>
}