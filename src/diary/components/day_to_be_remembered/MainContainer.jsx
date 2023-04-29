import loadingGif from '../../../assets/Loading_icon.gif'
import { useState, useEffect , useContext } from 'react'
import {Context} from '../../Diary'
import axios from 'axios'
import FormContainer from './FormContainer'



const LoadingDiv = () => {
  return <div class='h-screen'>
      <div class='flex justify-center h-full relative'>
        <div class=' p-2 w-1/6 absolute top-[27vh]'>
          <img src={loadingGif} class='rounded'/>
        </div>
      </div>
  </div>
}



const fetchItem = (baseUrl, setFormdata , setChosen, itemToFetch) => {
  const data = { _id : itemToFetch._id}
  axios.post(`${baseUrl}/get_a_day_to_be_remembered_full`, data )
  .then(res => {
    setFormdata(res.data)
    setChosen('item_fetched')
  })
}
 

const FetchButton = ({setChosen, itemToFetch }) => {
  const {baseUrl , setFormdata } = useContext(Context)
  return <div class='h-screen'>
    { itemToFetch?
      <div class='flex justify-center h-full relative'>
        <div class='absolute top-80'>
          <button onClick={()=>{
            setChosen('loading')
            fetchItem(baseUrl, setFormdata , setChosen , itemToFetch )
            
          } }>fetch {itemToFetch.day}</button>
        </div>
      </div>
    : null }  
  </div>
} 

export default function RightSideContainer ({itemToFetch, chosen, setChosen }){
  
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