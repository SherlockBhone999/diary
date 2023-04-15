

import { useState, useContext, useRef, useEffect } from 'react'
import { Context } from '../Diary'
import TextWriter from './TextWriter'
import axios from 'axios'


//tagfield
const TagField = ({field, setField, disable }) => {
  const [newTag, setNewTag ] = useState('')
  const [recommandedList , setRecommandedList ] = useState([])
  const { taglist } = useContext(Context)
  const inputRef = useRef()
  
  const add = () => {
    const arr = [...field]
    arr.push(newTag)
    setField(arr)
    setNewTag('')
  }
  
  const remove = (index) => {
    console.log(index)
    const arr = [...field]
    arr.splice(index, 1)
    setField(arr)
  }
  
  const update = (e) => {
    const input = e.target.value
    setNewTag(input)
    const arr = taglist.filter(item => item.tag.includes(input) )
    setRecommandedList(arr)
  }
  
  const addRecommandedTag = (obj) => {
    const arr= [...field]
    arr.push(obj.tag)
    setField(arr)
    setNewTag('')
    setRecommandedList([])
    inputRef.current.focus()
  }
  
  useEffect(()=>{
    if(newTag===''){
      setRecommandedList([])
    }
  },[newTag])
  
  
  return (<div class=''>
  <p>Tags : </p>
  <div class='grid grid-cols-4 bg-gray-200 m-2 rounded h-60 overflow-scroll'>
  {
    field.map((str,index) => <div key={index} class='bg-blue-200 p-1 m-1 h-min overflow-scroll'>
      <p>{str}</p>
      { disable? null :
        <button onClick={()=>remove(index)} class='bg-red-200 p-2' > -- </button>
      }
    </div>)
  }
  </div>
  
  { disable? null :
    <div class='flex m-2 p-2'>
      <input type='text'  onChange={update} value={newTag} ref={inputRef} disabled={disable}/>
        <button onClick={add} disabled={disable }>++ </button>
    </div>
  }
  
  { recommandedList.length === 0 ? null :
    <div class='bg-gray-300 grid w-40 overflow-scroll m-2 rounded p-2 h-40 '>
      {
        recommandedList.map(obj => <div>
          <button onClick={()=>addRecommandedTag(obj)}>{obj.tag}</button>
        </div>)
      }
    </div>
  }
  
  </div>)
}



//tought field
const ThoughtsField = ({field, setField , disable }) => {
  
  const remove = (index) => {
    const arr=[...field]
    arr.splice(index, 1)
    setField(arr)
  }
  
  const add = () => {
    const arr = [...field]
    arr.push('')
    setField(arr)
  }
  
  const update =(e,index)=>{
    const input = e.target.value
    const arr = [...field]
    arr[index] = input
    setField(arr)
  }
  
  return <div>
    <div class='flex'>My Thoughts : 
    { disable ? null : <button onClick={add} >++</button> }
    </div>
    
    <div class='bg-gray-200 h-60 overflow-scroll m-2 rounded '>
      {
        field.map((str,index) => <div key={index} class='flex m-2 p-2'>
          <textarea value={str} onChange={(e)=>update(e,index)} class='flex-auto'/>
          { disable? null :
            <button class='bg-red-200 p-2 m-1' onClick={()=>remove(index)}> -- </button>
          }
        </div>)
      }
    </div>
    
    
    
  </div>
}





//form
const FormField = ({setFormdata, disable }) => {
  const [ tagsField, setTagsField ] = useState([])
  const [ thoughtsField, setThoughtsField ] = useState([])
  const [ todayDate, setTodayDate ] = useState('')
  // included_in_days_of_the_year
  const [ toBeIncluded, setToBeIncluded ] = useState(false)
  //reason_to_be_included
  const [ reason, setReason  ] = useState('')
  const { currentMonthData } = useContext(Context)
  
  
  
  useEffect(()=>{
    setFormdata( prevv => {
      const data = {...prevv , day : todayDate , tags : tagsField , thoughts : thoughtsField , included_in_days_of_the_year : toBeIncluded, reason_to_be_included : reason }
      return data
    })
  },[tagsField, thoughtsField, todayDate, reason , toBeIncluded ])
  
  useEffect(()=>{
    const date = new Date()
    const d = date.getDate()
    const m = date.getMonth() + 1
    const y = '2023'
    const today = d + '.' + m + '.' + y
    setTodayDate(today)
  },[])
  
  return (<div class='bg-violet-200 p-2 rounded'>
  
  <div class='m-2 p-2'>
    <input type='text' value={currentMonthData.month} disabled/>
  </div>
  
  <div class='m-2 p-2'>
    <input type='text' placeholder='day' value={todayDate} onChange={(e)=>setTodayDate(e.target.value)} disabled={disable}/>
  </div>
  
  <TagField field={tagsField} 
  setField={setTagsField} 
  disable={disable}/>
  
  <ThoughtsField field={thoughtsField} 
  setField={setThoughtsField} 
  disable={disable}/>
  
  <div class='bg-gray-200 m-2 p-2 rounded'>
    <div class='flex'>
      <p class='m-1 p-1'> to be included in days of the year </p>
      <input type='checkbox' checked={toBeIncluded} onChange={()=>setToBeIncluded(!toBeIncluded)} class='m-1 p-1' disabled={disable}/>
    </div>
    {!toBeIncluded? null :
      <div class='flex'>
        <label class='m-1 p-1'> Reason : </label>
        <input type='text' class='m-1 p-1' onChange={(e)=>setReason(e.target.value)} disabled={disable}/>
      </div>
    }
  </div>
  
  </div>)
}

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
  const TodayData = {
    day : formdata.day,
    thoughts : formdata.thoughts,
    tags : formdata.tags,
    delta_data : formdata.delta_data
  }
  const array = [...currentMonthData.days]
  array.push(TodayData)
  const data = {...currentMonthData, days : array }
  console.log(data)
  axios.post(`${baseUrl}/update_current_month`,  data )
}



const Form = () => {
  const { formdata, setFormdata, baseUrl , taglist ,currentMonthData } = useContext(Context)
  const [ disableForm , setDisableForm ] = useState(false)
  const [ disableTextWriter, setDisableTextWriter ] = useState(false)
  
  
  return <div>
  <div class='bg-violet-200 w-20'>
    {disableForm? 
      <div>
        <button onClick={()=>setDisableForm(false)} class='m-2 p-2 rounded bg-blue-400'> Edit </button>
      </div>
    :
      <div>
        <button class='m-2 p-2 rounded bg-blue-400' onClick={()=>setDisableForm(true)}> Done</button >
      </div>
    }
  </div>
  
  <FormField setFormdata={setFormdata} disable={disableForm}/>
  <TextWriter disable={disableTextWriter} setDisable={setDisableTextWriter}/>
  
  
  formdata :
  {JSON.stringify(formdata)}
  <div>
    { disableForm && disableTextWriter?
    <button class='bg-violet-400 m-2 p-2 rounded w-full h-40' 
      onClick={()=>handleSubmit(baseUrl , formdata , taglist, currentMonthData )}> Send </button>
    : null
    }
  </div>
  
  </div>
}



export default Form


