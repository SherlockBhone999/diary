import TagsField from './TagsField'
import ThoughtsField from './ThoughtsField'
import {useState, useEffect, useContext } from 'react'
import { Context } from '../../Diary'


const Form = ({disable, setDisable }) => {
  const [ tagsField, setTagsField ] = useState([])
  const [ thoughtsField, setThoughtsField ] = useState([])
  const [ todayDate, setTodayDate ] = useState('')
  // included_in_days_of_the_year
  const [ toBeIncluded, setToBeIncluded ] = useState(false)
  //reason_to_be_included
  const [ reason, setReason  ] = useState('')
  const { currentMonthDataMin , setFormdata , formdata } = useContext(Context)
  
  
   
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
  
  useEffect(()=>{
    setToBeIncluded(formdata.included_in_days_of_the_year)
    setReason('not showing, go elsewhere')
    setTagsField(formdata.tags)
    setThoughtsField(formdata.thoughts)
    setTodayDate(formdata.day)
  },[formdata.delta_data])
  
  return (<div>
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
      <input type='checkbox' checked={toBeIncluded} onChange={()=>setToBeIncluded(!toBeIncluded)} class='m-1 p-1' disabled={disable} />
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