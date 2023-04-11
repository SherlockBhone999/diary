

import { useState, useContext, useRef, useEffect } from 'react'
import { Context } from '../Diary'
import TextWriter from './TextWriter'
import { allData } from '../fakedata2'
const { taglist } = allData


//tagfield
const TagField = ({field, setField, disable }) => {
  const [newTag, setNewTag ] = useState('')
  const [recommandedList , setRecommandedList ] = useState([])
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
    const arr = taglist.filter(tag => tag.includes(input))
    setRecommandedList(arr)
  }
  
  const addRecommandedTag = (str) => {
    const arr= [...field]
    arr.push(str)
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
        recommandedList.map(tag => <div>
          <button onClick={()=>addRecommandedTag(tag)}>{tag}</button>
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
  
  useEffect(()=>{
    setFormdata( prevv => {
      const data = {...prevv , day : todayDate , tags : tagsField , thoughts : thoughtsField }
      return data
    })
  },[tagsField, thoughtsField, todayDate])
  
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
    <input type='text' placeholder='month' disabled/>
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
  
  </div>)
}

const OneDayToProcessForNewMonth = ({day, setPdfUploadDone}) => {
  //generate pdf and get its file path in backend
  const [ pdfGenerated , setPdfGenerated ] = useState('')
  
  //upload pdf from backend to gdrive
  const upload = () => {
    setPdfUploadDone( prevv => {
      const arr = [...prevv]
      if(!arr.includes(day.day)){ 
        arr.push(day.day)
      }
      return arr
    })
  }
  
  return <div>
  <p>{day.day}</p>
  <button >generate pdf </button >
  <button onClick={upload}>upload pdf to gdrive </button >
  </div>
}

const ForNewMonth = ()=>{
  const [ startNewMonth, setStartNewMonth ] = useState()
  const { currentMonthData } = useContext(Context)
  const [ pdfUploadDone, setPdfUploadDone ] = useState([])
  // button to patch up or update currentMonthData or previous month for today
  const [ buttonStyle, setButtonStyle ] = useState('hidden')
  
  useEffect(()=>{
    if( pdfUploadDone.length === currentMonthData.days.length){
      setButtonStyle('')
    }
  },[pdfUploadDone])
  
  return <div>
  its new month
  {JSON.stringify(pdfUploadDone)}
  <div class='flex'>
    <div class='flex'> 
      <p>Start New Month </p>
      <button class='bg-blue-400 m-2 p-2' onClick={()=>setStartNewMonth(true)}>start </button>
    </div>
    
    <div class='flex'>
      <p>Keep Writing in previous month </p>
      <button class='bg-blue-400 m-2 p-2' onClick={()=>setStartNewMonth(false)}> keep </button>
    </div>
  </div>
  
  { startNewMonth === false ? <ForNotNewMonth /> : null }
  
  { startNewMonth? <div>
    <div>to patch up : {currentMonthData.month}</div>
    {
      currentMonthData.days.map(day => <div>
        <OneDayToProcessForNewMonth day={day} setPdfUploadDone={setPdfUploadDone} />
      </div>)
    }
    <div class={buttonStyle}>
      <button > update previous month </button>
    </div>
    
  </div>
  : null
  }
  
  </div>
}


const ForNotNewMonth = () => {
  const { formdata, setFormdata } = useContext(Context)
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
    <button class='bg-violet-400 m-2 p-2 rounded w-full h-40'> Send </button>
    : null
    }
  </div>
  
  </div>
}


export default function Form () {
    const { currentMonthData } = useContext(Context)
    const date = new Date()
    const m = date.getMonth() + 1
    const y = 2024
    const thisMonth = m + '.' + y 
    const monthOfCurrentMonthData = currentMonthData.month 
    if(thisMonth === monthOfCurrentMonthData ){
      return <ForNotNewMonth />
    }else{
      return <ForNewMonth />
    }
}