import TextWriter from './TextWriter'
import Form from './Form'
import {useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
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


const createOrUpdateDayToBeRememberedIfChecked = (formdata, baseUrl, dTBRMin ) => {
    if(formdata.included_in_days_of_the_year){
      const arrOfDays = []
      dTBRMin.map(day => { arrOfDays.push(day.day )})
      
      var requiredId = ""
      dTBRMin.map(day => {
        if(day.day === formdata.day ){
          requiredId = day._id
        }
      })
      
      const data = { day : formdata.day , reason : formdata.reason_to_be_included , delta_data : formdata.delta_data, _id : requiredId }
      if(arrOfDays.includes(formdata.day)){
        axios.post(`${baseUrl}/update_day_to_be_remembered`, data )
      }else{
        axios.post(`${baseUrl}/create_day_to_be_remembered`, data )
      }
      
    }
    
}

const createNewCurrentMonthDay = (baseUrl, formdata ) => {
  axios.post(`${baseUrl}/create_current_month_day`, formdata )
}

const updateCurrentMonthDay = (baseUrl, formdata ) => {
  axios.post(`${baseUrl}/update_current_month_day`, formdata )
}

const handleSubmit = (baseUrl , formdata , taglist , currentMonthDataMin , dTBRMin, navigate ) => {
  
  const arrOfDays = []
  currentMonthDataMin.map(day => {
    arrOfDays.push(day.day)
  })
  
  createNewTagsIfNew(taglist, formdata , baseUrl)
  createOrUpdateDayToBeRememberedIfChecked(formdata , baseUrl , dTBRMin )

  if(arrOfDays.includes(formdata.day)){
    updateCurrentMonthDay(baseUrl, formdata )
  }else{
    createNewCurrentMonthDay(baseUrl, formdata)
  }
  navigate('/this_month')
}



export default function FormContainer () {
  const [ disableTextWriter, setDisableTextWriter ] = useState(false)
  const [ disableForm , setDisableForm ] = useState(false)
  const { formdata , baseUrl , taglist, currentMonthDataMin, dTBRMin } = useContext(Context)
  const [ formStyle , setFormStyle ] = useState({ bStyle : 'opacity-60' , CStyle : 'hidden' })
  const [ writerStyle , setWriterStyle ] = useState({ bStyle : 'mb-0' , CStyle : '' })
  const navigate = useNavigate()
  
  
  return <div>

  <div class='flex '>
    <button class={`flex items-center w-20 m-1 p-2 bg-cyan-400 ${writerStyle.bStyle}`} 
    onClick={()=>{
        setWriterStyle({ bStyle : 'mb-0' , CStyle : '' })
        setFormStyle({ bStyle : 'opacity-60' , CStyle : 'hidden' })
    }}>
      <p class='mr-2'>Writer </p>
      <input type='checkbox' checked={disableTextWriter}/>
    </button>
    
    <button class={`flex items-center w-20 m-1 p-2 bg-sky-400 ${formStyle.bStyle}`}
    onClick={()=>{
      setFormStyle({ bStyle : 'mb-0' , CStyle : '' })
      setWriterStyle({ bStyle : 'opacity-60' , CStyle : 'opacity-40' })
    }}>
      <p class='mr-2'>Form </p>
      <input type='checkbox' checked={disableForm}/>
    </button>
    
  </div>
  
  <div class='w-screen relative '>
    <div class={`bg-cyan-400 ml-1 mt-0 pb-4 ${writerStyle.CStyle}`}>
      <TextWriter disable={disableTextWriter} setDisable={setDisableTextWriter}/>
    </div>
    
    <div class='absolute top-0 left-20 w-11/12 ml-3'>
      <div class={`bg-sky-400 h-[43vh] mt-0 ${formStyle.CStyle} `}>
       <Form disable={disableForm} setDisable={setDisableForm}/>
      </div>
      
      { formStyle.CStyle !== 'hidden'?
      <div class={`flex justify-center w-11/12 m-4 p-3 ${formStyle.CStyle}`}>
        { disableForm && disableTextWriter?
          <button class='w-40 h-24 bg-blue-400 rounded border-2 border-black'
          onClick={()=>handleSubmit(baseUrl , formdata , taglist, currentMonthDataMin,
          dTBRMin, navigate )}>
          submit</button>
        : null }
      </div>
      : null }
    </div>
  </div>   
      
  { formStyle.CStyle === 'hidden'?
  <div class='flex justify-center w-full m-4 p-3'>
    { disableTextWriter && disableForm ?
      <button class='w-40 h-24 bg-blue-400 rounded border-2 border-black'
      onClick={()=>handleSubmit(baseUrl , formdata , taglist, currentMonthDataMin,
      dTBRMin , navigate )}>
      submit</button>
    : null }
  </div>
  : null }
  
  </div>
}


/*
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


const createOrUpdateDayToBeRememberedIfChecked = (formdata, baseUrl, dTBRMin ) => {
    if(formdata.included_in_days_of_the_year){
      const arrOfDays = []
      dTBRMin.map(day => { arrOfDays.push(day.day )})
      
      var requiredId = ""
      dTBRMin.map(day => {
        if(day.day === formdata.day ){
          requiredId = day._id
        }
      })
      
      const data = { day : formdata.day , reason : formdata.reason_to_be_included , delta_data : formdata.delta_data, _id : requiredId }
      if(arrOfDays.includes(formdata.day)){
        axios.post(`${baseUrl}/update_day_to_be_remembered`, data )
      }else{
        axios.post(`${baseUrl}/create_day_to_be_remembered`, data )
      }
      
    }
    
}

const createNewCurrentMonthDay = (baseUrl, formdata ) => {
  axios.post(`${baseUrl}/create_current_month_day`, formdata )
}

const updateCurrentMonthDay = (baseUrl, formdata ) => {
  axios.post(`${baseUrl}/update_current_month_day`, formdata )
}

const handleSubmit = (baseUrl , formdata , taglist , currentMonthDataMin , dTBRMin ) => {
  
  const arrOfDays = []
  currentMonthDataMin.map(day => {
    arrOfDays.push(day.day)
  })
  
  createNewTagsIfNew(taglist, formdata , baseUrl)
  createOrUpdateDayToBeRememberedIfChecked(formdata , baseUrl , dTBRMin )

  if(arrOfDays.includes(formdata.day)){
    updateCurrentMonthDay(baseUrl, formdata )
  }else{
    createNewCurrentMonthDay(baseUrl, formdata)
  }
  
}



export default function FormContainer() {
  const [ disableTextWriter, setDisableTextWriter ] = useState(false)
  const [ disableForm , setDisableForm ] = useState(false)
  const { formdata , baseUrl , taglist, currentMonthDataMin, dTBRMin } = useContext(Context)

  
  
  return <div class='bg-black h-screen'>
    <TextWriter disable={disableTextWriter} setDisable={setDisableTextWriter} />
    <Form disable={disableForm} setDisable={setDisableForm} />
    
    <div class='flex justify-center'>
      { disableForm && disableTextWriter?
      <button class='bg-violet-400 m-4 p-2 rounded w-60 h-40' 
        onClick={()=>handleSubmit(baseUrl , formdata , taglist, currentMonthDataMin, dTBRMin )}> Send </button>
      : null
      }
    </div>
  </div>
}

*/