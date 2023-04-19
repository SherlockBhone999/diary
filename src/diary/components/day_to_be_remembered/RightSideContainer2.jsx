import loadingGif from '../../../assets/Loading_icon.gif'
import { useState, useEffect , useContext } from 'react'
import {Context} from '../../Diary'
import axios from 'axios'
//import FormContainer from './FormContainer'
import FormContainer from './FormContainer2'

import {allData} from '../../fakedata2'
const {daysToBeRemembered} = allData

const deltaa = {"ops":[{insert:"Bhone"},{ attributes:{bold:true},insert:"5.4.2023Text"},{attributes:{link:"https://www.google.com"},insert:"Google"},{insert:{image:"https://octodex.github.com/images/labtocat.png"}},{insert:"\n"},{insert:{video:"https://www.youtube.com/embed/tgbNymZ7vqY"}}]}

 
const LoadingDiv = () => {
  return <div class='h-screen'>
      <div class='flex justify-center items-center h-full'>
        <div class=' p-2 w-1/6 '>
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
 
const test = (itemToFetch, setFormdata , setChosen ) => {
  
  setTimeout(()=>{
    setFormdata({delta_data : itemToFetch.delta_data })
    setChosen('item_fetched')
  },1000)  
} 

const FetchButton = ({setChosen, itemToFetch }) => {
  const {baseUrl , setFormdata } = useContext(Context)
  return <div class='h-screen'>
    { itemToFetch?
      <div class='flex justify-center items-center h-full'>
        <div class=''>
          <button onClick={()=>{
            setChosen('loading')
            fetchItem(baseUrl, setFormdata , setChosen , itemToFetch )
            
            //test(itemToFetch, setFormdata , setChosen )
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