import { useState } from 'react'
import FormContainer from './FormContainer'
import ForNewMonth from './ForNewMonth'


export default function NewMonthContainer(){
  const [chosen , setChosen ] = useState('')
  const [ style , setStyle ] = useState('')
  
  return <div>
  
  <div class={`grid ${style}`}>
      <button onClick={()=>{
        setChosen('new')
        setStyle('hidden')
      }} class='bg-blue-400 m-2 p-2 rounded shadow'>start new month </button>
      
      <button onClick={()=>{
        setChosen('old')
        setStyle('hidden')
      }} class='bg-blue-400 m-2 p-2 rounded shadow'>keep current month data </button>
  </div>
  
  { chosen === 'old'? <FormContainer /> : null }
  { chosen === 'new'? <ForNewMonth /> : null }
  
  </div>
}