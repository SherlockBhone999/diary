import List from './List'
import RightSideContainer from './RightSideContainer'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {Context} from '../../Diary'
import axios from 'axios'

export default function Container(){
  const [ itemToFetchFull , setItemToFetch ] = useState()
  const [ chosenComponentForWriterContainer , setChosen ] = useState('initial')
  //del formdata later
  const { setFormdata , formdata } = useContext(Context)
  
  const navigate = useNavigate()

  useEffect(()=>{
    setChosen('initial')
    setFormdata(null)
  },[itemToFetchFull])
  
  return <div>
  {JSON.stringify(formdata)}
  <div class='flex'>
    
      <div class='w-2/6 bg-gray-500 h-screen'>
        <button class='bg-blue-400 m-2 p-2 rounded'
        onClick={()=>navigate('/')}>Back</button>
          
        <List setItemToFetch={setItemToFetch} />
      </div>
      
      <div class='w-4/6 bg-gray-400 h-screen'>
        <RightSideContainer itemToFetch={itemToFetchFull} 
        chosen={chosenComponentForWriterContainer} 
        setChosen={setChosen}/>
      </div>
      
    </div> 
    
  </div>
}