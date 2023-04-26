import loadingGif from '../../../assets/Loading_icon.gif'
import { useState, useEffect , useContext } from 'react'
import {Context} from '../../Diary'
import axios from 'axios'
import FormContainer from '../writer/FormContainer'



const LoadingDiv = () => {
  return <div class='h-screen'>
      <div class='flex justify-center h-full relative'>
        <div class='absolute top-[25vh] p-2 w-1/6 '>
          <img src={loadingGif} class='rounded'/>
        </div>
      </div>
  </div> 
}

const fetchItem = (baseUrl , setFormdata , setChosen , itemToFetch , setWriterMode ) => {
  axios.post(`${baseUrl}/get_current_month_day_one`, itemToFetch )
  .then(res =>{
    setWriterMode('load_this_month_day')
    setFormdata(res.data)
    setChosen('item_fetched')
  })
}

const FetchButton = ({setChosen, itemToFetch }) => {
  const {baseUrl , setFormdata , setWriterMode } = useContext(Context)
  return <div class='h-screen'>
    { itemToFetch?
      <div class='flex justify-center h-full relative'>
        <div class='absolute top-80'>
          <button onClick={()=>{
            setChosen('loading')
            fetchItem(baseUrl, setFormdata , setChosen , itemToFetch , setWriterMode )
  
          } }>fetch {itemToFetch.day}</button>
        </div>
      </div>
    : null }  
  </div>
} 


export default function RightSideContainer({itemToFetch, chosen, setChosen }){
  if(chosen === 'initial'){
    return <div>
      <FetchButton setChosen={setChosen} itemToFetch={itemToFetch} />
    </div>
  }else if(chosen === 'loading'){
    return <div>
      <LoadingDiv />
    </div>
  }else if(chosen === 'item_fetched'){
    return <div>
      <FormContainer />
    </div>
  }
}