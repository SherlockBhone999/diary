/*
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



const fetchItem = (baseUrl, setItem , setChosen, itemToFetch) => {
  const data = { _id : itemToFetch._id}
  axios.post(`${baseUrl}/get_a_day_to_be_remembered_full`, data )
  .then(res => {
    setItem(res.data)
    setChosen('item_fetched')
  })
}

const test = (itemToFetch, setItem , setChosen ) => {
  setTimeout(()=>{
    setItem({...itemToFetch, delta_data : deltaa })
    setChosen('item_fetched')
  },1000)
} 

const FetchButton = ({setChosen, setItem , itemToFetch }) => {
  const {baseUrl} = useContext(Context)
  return <div class='h-screen'>
    { itemToFetch?
      <div class='flex justify-center items-center h-full'>
        <div class=''>
          <button onClick={()=>{
            setChosen('loading')
            //fetchItem(baseUrl, setItem , setChosen , itemToFetch )
            
            test(itemToFetch, setItem , setChosen )
          } }>fetch {itemToFetch.day}</button>
        </div>
      </div>
    : null }
  </div>
} 

export default function RightSideContainer ({itemToFetch, chosen, setChosen , item , setItem}){
  
  if(chosen === 'initial'){
    return <div>
      <FetchButton setChosen={setChosen} itemToFetch={itemToFetch} setItem={setItem} />
    </div>
  }else if(chosen === 'loading'){
    return <div>
      <LoadingDiv />
    </div>
  }else if(chosen === 'item_fetched'){
    return <div>
      <FormContainer item={item}/>
    </div>
  }

}

*/