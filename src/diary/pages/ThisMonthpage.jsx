import Navbar from '../components/Navbar'
import {useContext,useState,useEffect, useRef} from 'react'
import {Context} from '../DiaryContextProvider'
import Gallery from '../components/Gallery'
import Sidepage from '../components/Sidepage'
import {useNavigate} from 'react-router-dom'
import PieChart from '../components/PieChart'
import monthlylist from '../fakedata'


function ThisMonthpage(){
  const {monthlylist, setShowSidepage, showSidepage } = useContext(Context)

  const myRef = useRef()
  
  const onClickOutside = () => {
    setShowSidepage('translate-x-full')
  }
  
  
  useEffect(()=>{
    
    const handleClickOutside = (e) =>{
      if (!myRef.current.contains(e.target)){
        onClickOutside()
      } }
      
    document.addEventListener('click', handleClickOutside, true)
    
    return ()=>{ document.removeEventListener('click',handleClickOutside, true ) }
    
  },[onClickOutside])
  
  
  
  
  return <div >
  <Navbar />
  <div> Resolution for this month </div>
  
  <div class={`fixed top-0 right-0 transition ${showSidepage} duration-500`} ref={myRef}>
   <Sidepage  />
  </div>
  
  <PieChart w={400} />
  <Gallery />
  
  </div>
}

export default ThisMonthpage





