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


const handleSubmit = (baseUrl , formdata , taglist , currentMonthData ) => {
  createNewTagsIfNew(taglist, formdata, baseUrl)
  createNewDayToBeRememberedIfChecked(formdata, baseUrl)
  const array = [...currentMonthData.days]
  array.push(formdata)
  const data = {...currentMonthData, days : array }
  console.log(data)
  axios.post(`${baseUrl}/update_current_month`,  data )
}



export default function FormContainer() {
  const [ disableTextWriter, setDisableTextWriter ] = useState(false)
  const [ disableForm , setDisableForm ] = useState(false)
  const { formdata, setFormdata, baseUrl , taglist ,currentMonthData } = useContext(Context)
  
  return <div>
    <TextWriter disable={disableTextWriter} setDisable={setDisableTextWriter} />
    <Form disable={disableForm} setDisable={setDisableForm} />
    
    <div>
      { disableForm && disableTextWriter?
      <button class='bg-violet-400 m-2 p-2 rounded w-full h-40' 
        onClick={()=>handleSubmit(baseUrl , formdata , taglist, currentMonthData )}> Send </button>
      : null
      }
    </div>
  </div>
}