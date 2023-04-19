import { useState , useEffect, useContext } from 'react'
import { Context } from '../../Diary'
import TextWriter from '../writer/TextWriter'




export default function FormContainer () {
  const [ editDisabled , setEditDisabled ] = useState(false)
  const { quill, formdata4TD , setFormdata4TD } = useContext(Context)
  
  
  return <div>
 
  <div class='m-2 relative'>
 
    <TextWriter disable={editDisabled} setDisable={setEditDisabled} />

  </div>
  
  <div class='bg-gray-200 p-5 m-2'>
    <input type='text' placeholder='...short reason' class='w-full rounded p-2 border-2 border-black' 
    disabled={editDisabled} value={formdata4TD.reason} 
    onChange={(e)=>{
      const data = { ...formdata4TD, reason : e.target.value }
      setFormdata4TD(data)
    }}/>
  </div>
  
  
  { !editDisabled ? null : 
    <div class=' h-20 bg-black text-white m-2 p-2 rounded-lg flex justify-center'>
      <button >submit</button>
    </div>
  }
  
  </div>
}