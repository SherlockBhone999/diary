import List from './List'
import MainContainer from './MainContainer'
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
    setChosen('list_fetched')
  }) 
}

export default function Container () {
  const [ itemToFetchFull , setItemToFetch ] = useState()
  const { baseUrl , formdata , setFormdata, dTBRMin   } = useContext(Context)
  const [ chosenComponentForWriterContainer , setChosen ] = useState('initial')
  
  const navigate = useNavigate()

  
  
  useEffect(()=>{
    setChosen('initial')
    setFormdata(null)
  },[itemToFetchFull])

  return <div class='bg-gray-600'>
    <button class='bg-blue-400 m-2 p-2 rounded'
    onClick={()=>navigate('/')}>Home</button>
          
    <div class='flex'>
  
      <div class='w-3/12 h-screen bg-slate-400 border-2 border-black'>
        <List list={dTBRMin} setItemToFetch={setItemToFetch} />
      </div> 
  
      <div class='w-9/12 bg-gray-400 h-screen border-2 border-black overflow-hidden'>
        <MainContainer itemToFetch={itemToFetchFull} 
        chosen={chosenComponentForWriterContainer} 
        setChosen={setChosen}/>
      </div>
  
    </div>
  </div>
}