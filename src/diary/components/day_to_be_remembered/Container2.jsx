import List from './List'
import RightSideContainer from './RightSideContainer2'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {Context} from '../../Diary'
import axios from 'axios'

import { allData } from '../../fakedata2'
const {daysToBeRemembered} = allData

const fetchListMin = (baseUrl, setList , setChosen) => {
  axios.get(`${baseUrl}/get_days_to_be_remembered_min`)
  .then(res => {
    setList(res.data)
    console.log(res.data)
    setChosen('list_fetched')
  }) 
}

export default function Container () {
  const [ listForSelectionMin, setList] = useState([])
  const [ itemToFetchFull , setItemToFetch ] = useState()
  const { baseUrl , formdata , setFormdata  } = useContext(Context)
  const [ chosenComponentForWriterContainer , setChosen ] = useState('initial')
  
  const navigate = useNavigate()

  useEffect(()=>{
    //fetchListMin(baseUrl, setList)
    setList(daysToBeRemembered)
    
  },[])
  
  useEffect(()=>{
    setChosen('initial')
    setFormdata(null)
  },[itemToFetchFull])

  return <div>
    <div class='flex'>

      <div class='w-2/6 bg-gray-500 h-screen'>
        <button class='bg-blue-400 m-2 p-2 rounded'
        onClick={()=>navigate('/')}>Back</button>
        
        <List list={listForSelectionMin} setItemToFetch={setItemToFetch} />
      
      </div>
 
      <div class='w-4/6 bg-gray-400 h-screen'>
        <RightSideContainer itemToFetch={itemToFetchFull} 
        chosen={chosenComponentForWriterContainer} 
        setChosen={setChosen}/>
      </div>
      
    </div> 
  
  </div>
}