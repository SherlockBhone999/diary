
import {useState, useContext, useRef, useEffect } from 'react'
import {Context} from '../DiaryContextProvider'



const Day = ({item}) => {
  const {setShowSidepage, setSidepageItem} = useContext(Context)
  
  return <div>
  <button onClick={()=>{
    setSidepageItem(item)
    setShowSidepage('translate-x-half')
  }} >{item.date}</button>
  </div>
}


export default function Days({m}){
  
  
  return <div>
  {
    m.list.map(item => <Day item={item} /> )
  }
  
  </div>
}