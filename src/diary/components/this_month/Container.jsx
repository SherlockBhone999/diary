import List from './List'
import RightSideContainer from './RightSideContainer'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {Context} from '../../Diary'
import axios from 'axios'

export default function Container(){
  const [ listForSelectionMin, setList] = useState([])
  const [ itemToFetchFull , setItemToFetch ] = useState()
  const { baseUrl } = useContext(Context)
  const [ chosenComponentForWriterContainer , setChosen ] = useState('initial')
  const [ itemToReadOrUpdate , setItem ] = useState(null)
  const navigate = useNavigate()

  
  return <div>
  <div class='flex'>
    
      <div class='w-2/6 bg-gray-500 h-screen'>
        <button class='bg-blue-400 m-2 p-2 rounded'
        onClick={()=>navigate('/')}>Back</button>
          
        <List />
      </div>
      
      <div class='w-4/6 bg-gray-400 h-screen'>
        <RightSideContainer />
      </div>
      
    </div> 
    
  </div>
}