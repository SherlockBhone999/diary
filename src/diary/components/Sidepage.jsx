
import {Context} from '../DiaryContextProvider'
import {useContext} from 'react'
import PieChart from './PieChart'
import monthlylist from '../fakedata'


function Formdata(){
  
  const {sidepageItem} = useContext(Context)
  
  return <div class='bg-gray-400 '>
 
  <div>Happiness index : {sidepageItem.happinessIndex} </div>
  <div> Tags: {JSON.stringify(sidepageItem.tags)} </div>
  <div> Good Things : {sidepageItem.goodthings} </div>
  <div> Bad Things : {sidepageItem.badthings} </div>
  <div> Thoughts of the day : {sidepageItem.thoughts} </div>
  <div> Lesson : {sidepageItem.lesson} </div>
  
  </div>
}

const Pie = ()=>{
  
  return <div>
  <PieChart w={200} />
  </div>
}



export default function Sidepage(){
  const {sidepageItem} = useContext(Context)
  
  
  
  return <div>
  {
    !sidepageItem.tags?<Pie />:<Formdata />
  }
  
  
  
  </div>
}