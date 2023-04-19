/*
import { useState , useEffect } from 'react'
import Writer from './Writer'




export default function FormContainer ({item}) {
  const [ quill , setQuill ] = useState()
  const [ editDisabled , setEditDisabled ] = useState(false)
  //can use formdata4TD and reuse textwriter from writer 
  const [ formdata4DTBR , setFormdata4DTBR ] = useState(item)
  
  
  return <div>
  
 
  <div class='m-2'>
 
    <div class='bg-gray-200 w-20 mt-4'>
    { editDisabled?
      <button class='m-2 p-2 bg-blue-400 rounded' onClick={()=>{
        quill.enable()
        setEditDisabled(false)
      }}> Edit </button>
    :  
      <button class='m-2 p-2 bg-blue-400 rounded' onClick={()=>{
        quill.disable()
        setEditDisabled(true)
        const delta = quill.getContents()
        const data = { ...formdata4DTBR, delta_data : delta }
        setFormdata4DTBR(data)
      }}> Done </button>
    }  
    </div>
    
 
    <Writer quill={quill} 
    setQuill={setQuill}
    formdata4DTBR={formdata4DTBR}/>
    
  </div>
  
  <div class='bg-gray-200 p-5 m-2'>
    <input type='text' placeholder='...short reason' class='w-full rounded p-2 border-2 border-black' 
    disabled={editDisabled} value={formdata4DTBR.reason} 
    onChange={(e)=>{
      const data = { ...formdata4DTBR, reason : e.target.value }
      setFormdata4DTBR(data)
    }}/>
  </div>
  
  { !editDisabled ? null : 
    <div class=' h-20 bg-black text-white m-2 p-2 rounded-lg flex justify-center'>
      <button >submit</button>
    </div>
  }
  
  </div>
}

*/