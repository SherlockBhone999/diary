import { useNavigate } from 'react-router-dom'
import { useState, useEffect , useContext } from 'react'
import axios from 'axios'
import {Context} from '../Diary'
import Container from '../components/day_to_be_remembered/Container'
import DayToBeRememberedList from '../components/DayToBeRememberedList'
import loadingGif from '../../assets/Loading_icon.gif'

const fetchList = (baseUrl, setList , setChosen) => {
  axios.get(`${baseUrl}/get_day_to_be_remembered`)
  .then(res => {
    setList(res.data)
    console.log(res.data)
    setChosen('list_fetched')
  })
}

const Chosen = () => {
  const [chosen , setChosen ] = useState('initial')
  const [list, setList] = useState([])
  const { baseUrl } = useContext(Context)
  
  if(chosen === 'initial'){
    return <div>
      <div class='flex justify-center'>
        <div class='m-4 p-2 bg-blue-400 rounded w-40 fixed top-80'>
          <button onClick={()=>{
            setChosen('loading')
            fetchList(baseUrl, setList , setChosen )
          } }>fetch</button>
        </div>
      </div>
    </div>
  }else if(chosen === 'loading'){
    return <div>
      <div class='flex justify-center'>
        <div class='m-4 p-2 bg-blue-400 rounded w-40 fixed top-80'>
          <img src={loadingGif} />
          <button onClick={()=>setChosen('list_fetched') }>change</button>
        </div>
      </div>
    </div>
  }else if(chosen === 'list_fetched'){
    return <div>
    <Container list={list} />
    </div>
  }
}



export default function DaysToBeRememberedpage (){ 
  const navigate = useNavigate()
  
  return <div>
  <div>
    <button onClick={()=>navigate('/')} >back</button>
  </div>
  
  <Chosen />
  
  </div>
}