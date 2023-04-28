import FormContainer from './FormContainer'
import { useState } from 'react'
import ForNewYear from './ForNewYear'

export default function NewYearContainer(){
  const [chosen , setChosen ] = useState('')
  const [ style , setStyle ] = useState('')
  
  return <div class='relative w-full'>
  <div className={`grid ${style} absolute top-20 w-full`}>
      <button onClick={()=>{
        setChosen('new')
        setStyle('hidden')
      }} className='bg-blue-400 m-2 p-10 rounded shadow'>start new year </button>
      
      <button onClick={()=>{
        setChosen('old')
        setStyle('hidden')
      }} className='bg-blue-400 m-2 p-10 rounded shadow'>keep current month data </button>
  </div>
  
  { chosen === 'old'? <FormContainer /> : null }
  { chosen === 'new'? <ForNewYear /> : null }
  </div>
}