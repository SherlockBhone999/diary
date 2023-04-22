import TagsField from './TagsField'
import ThoughtsField from './ThoughtsField'
import {useState, useEffect, useContext } from 'react'
import { Context } from '../../Diary'

const fetchToday = (baseUrl, id , quill, setFormdata ) => {
  axios.post(`${baseUrl}/get_current_month_day`, { _id : id} )
  .then(res => {
    setFormdata(res.data)
    quill.setContents(res.data.delta_data)
  })
}

const Form = ({disable, setDisable }) => {
  const [ tagsField, setTagsField ] = useState([])
  const [ thoughtsField, setThoughtsField ] = useState([])
  const [ todayDate, setTodayDate ] = useState('')
  // included_in_days_of_the_year
  const [ toBeIncluded, setToBeIncluded ] = useState(false)
  //reason_to_be_included
  const [ reason, setReason  ] = useState('')
  const { currentMonthDataMin , setFormdata , formdata , writerMode , setWriterMode } = useContext(Context)
  
  
   
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
    const y = date.getFullYear()
    var today = d + '.' + m + '.' + y
    setTodayDate(today)
    
    const arrOfDays = []
    currentMonthDataMin.map(day =>{
      arrOfDays.push(day.day)
    })
    if(arrOfDays.includes(today.toString())){
      setWriterMode('update_today')
    }
  },[])
  
  useEffect(()=>{

    if(writerMode !== 'write_new'){
      setTodayDate(formdata.day)
      setTagsField(formdata.tags)
      setThoughtsField(formdata.thoughts)
      setToBeIncluded(formdata.included_in_days_of_the_year)
      setReason(formdata.reason_to_be_included)
    }
    
    const date = new Date()
    const d = date.getDate()
    const m = date.getMonth() + 1
    const y = date.getFullYear()
    var today = d + '.' + m + '.' + y
    const arrOfDays = []
    currentMonthDataMin.map(day =>{
      arrOfDays.push(day.day)
    })
    if(arrOfDays.includes(today.toString())){
      setWriterMode('update_today')
    }
  },[formdata.delta_data])
  
  
  return (<div>
  <div class='text-white' >{writerMode}</div>
  
  <div class='bg-purple-300 w-20'>
    {disable? 
      <div>
        <button onClick={()=>setDisable(false)} class='m-2 p-2 rounded bg-blue-400'> Edit </button>
      </div>
    :
      <div>
        <button class='m-2 p-2 rounded bg-blue-400' onClick={()=>setDisable(true)}> Done</button >
      </div>
    }
  </div>
  
  <div class='bg-purple-300 p-2 '>
  
  <div class='m-2 p-2'>
    <input type='text' value={'need value'} disabled/>
  </div>
  
  <div class='m-2 p-2'>
    <input type='text' placeholder='day' value={todayDate} onChange={(e)=>setTodayDate(e.target.value)} disabled={disable}/>
  </div>

  <div class='flex'>
    <div class='w-3/6'>
      <TagsField field={tagsField} 
      setField={setTagsField} 
      disable={disable}/>
    </div>
  
    <div class='w-3/6'>
      <ThoughtsField field={thoughtsField} 
      setField={setThoughtsField} 
      disable={disable}/>
    </div>
  </div>
  
  <div class='bg-gray-100 m-2 p-2 rounded'>
    <div class='flex'>
      <p class='m-1 p-1'> to be included in days of the year </p>
      <input type='checkbox' checked={toBeIncluded} onChange={()=>setToBeIncluded(!toBeIncluded)} class='m-1 p-1'  />
    </div>
    {!toBeIncluded? null :
      <div class='flex'>
        <label class='m-1 p-1'> Reason : </label>
        <input type='text' class='m-1 p-1' onChange={(e)=>setReason(e.target.value)} disabled={disable} value={reason} />
      </div>
    }
  </div>
  
  </div>
  </div>)
}

export default Form 