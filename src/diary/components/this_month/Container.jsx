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
  const [ sideStyle, setSideStyle ] = useState('')
  const [ sideStyle2 , setSideStyle2 ] = useState('translate-x-full')
  const navigate = useNavigate()

  useEffect(()=>{
    setChosen('initial')
    setFormdata(null)
  },[itemToFetchFull])
  
  return <div class='bg-gray-600'>

    <button class='bg-blue-400 m-2 p-2 rounded '
      onClick={()=>{
      navigate('/')
      setFormdata(initialFormdata)
      setWriterMode('write_new')
    }}>Home</button>
        
  <div class='relative overflow-hidden '>
    
      <div class='w-screen bg-gray-500 h-screen overflow-hidden'>

        
          <button class='bg-blue-400 m-2 p-2 rounded'
          onClick={()=>{
            setSideStyle('translate-x-full ')
            setSideStyle2('')
          }}>Menu</button>

        
        <RightSideContainer itemToFetch={itemToFetchFull} 
        chosen={chosenComponentForWriterContainer} 
        setChosen={setChosen}/>
      </div>
    
    
    
    
    
    
      <div class={`absolute w-3/12 h-screen bg-slate-300 top-0 right-[100%] transition duration-500 overflow-scroll border-2 border-black ${sideStyle}`}>

        <button class='bg-blue-400 m-2 p-2 rounded'
        onClick={()=>{
          setSideStyle('')
          setSideStyle2('translate-x-full')
        }}>back</button>
        
        <List setItemToFetch={setItemToFetch} 
        setSideStyle={setSideStyle}
        setSideStyle2={setSideStyle2}/>

      </div>
      
      
      <div class={`absolute top-0 right-0 w-9/12 h-screen transition duration-500 ${sideStyle2}`}>
        <ExtraData />
      </div>
    
      
    </div>
      
  
    
  </div>
}