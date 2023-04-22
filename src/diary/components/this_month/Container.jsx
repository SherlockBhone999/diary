import List from './List'
import RightSideContainer from './RightSideContainer'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {Context} from '../../Diary'
import axios from 'axios'
import ExtraData from './ExtraData'


const date = new Date()
const d = date.getDate()
const m = date.getMonth() + 1
const y = date.getFullYear()
var today = d + '.' + m + '.' + y
const initialFormdata = {
  day : today.toString(),
  tags : [],
  thoughts : [],
  included_in_days_of_the_year : false,
  reason_to_be_included : '',
  //cause textwriter depends on delta_data whether to load or new
  delta_data : null,
}

export default function Container(){
  const [ itemToFetchFull , setItemToFetch ] = useState()
  const [ chosenComponentForWriterContainer , setChosen ] = useState('initial')
  const { setFormdata , setWriterMode } = useContext(Context)
  
  const navigate = useNavigate()

  useEffect(()=>{
    setChosen('initial')
    setFormdata(null)
  },[itemToFetchFull])
  
  return <div>
  
  <div class='flex'>
    
      <div class='w-2/6 bg-gray-500 h-screen'>
        <button class='bg-blue-400 m-2 p-2 rounded'
        onClick={()=>{
          navigate('/')
          setFormdata(initialFormdata)
          setWriterMode('write_new')
        }}>Back</button>
          
        <ExtraData />
        
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