import Navbar from '../components/Navbar'
import TobeRemembered from '../components/TobeRemembered'
import {useContext, useRef, useEffect , useState} from 'react'
import {Context} from '../DiaryContextProvider'
import Years from '../components/Years'
import Sidepage from '../components/Sidepage'
import {useNavigate} from 'react-router-dom'


const All = () =>{
  
  return <div>
  <Years />
  </div>
}

function Allpage(){
  const {interfaceForAllpage, showSidepage, setShowSidepage, sidepageItem} = useContext(Context)
  
  const navigate = useNavigate()
  const myRef=useRef()
  
  const onClickOutside = ()=>{
    setShowSidepage('translate-x-full')
  }
  
  
  
  
  useEffect(()=>{
    const handleClickOutside = (e) =>{
      if(!myRef.current.contains(e.target)){
        onClickOutside()
      } }
    
    document.addEventListener('click', handleClickOutside, true)
    
    return ()=>{ document.removeEventListener('click', handleClickOutside, true ) }
    
  },[onClickOutside])
  
  
  return <div>
  <Navbar/>
  
  <button onClick={()=>navigate('/this_month')} >back</button>
  
  { interfaceForAllpage==='all'? <All /> : <TobeRemembered /> }
  

  
  
  <div class={`fixed top-0 right-0 transition ${showSidepage} duration-500`} ref={myRef}>
   <Sidepage />
  </div>
  
  
  </div>
}

export default Allpage