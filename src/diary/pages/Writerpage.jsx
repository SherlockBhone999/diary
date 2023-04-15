import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'
import NewMonthBox from '../components/NewMonthBox'
import { useContext, useState , useEffect } from 'react'
import { Context } from '../Diary'

function Chosen ({chosen}) {
  if(chosen === 'old'){
    return <Form />
  }else if(chosen === 'new'){
    return <NewMonthBox />
  }
}

function Choose () {
  const [chosen , setChosen ] = useState('')
  return <div>
  choose
  <button onClick={()=>setChosen('new')}>start new month </button>
  <button onClick={()=>setChosen('old')}>keep current month data </button>
  <Chosen chosen={chosen} />
  </div>
} 

export default function Writerpage(){
  const navigate= useNavigate()
  const { currentMonthData } = useContext(Context)
  
  
  const [isNewMonth , setIsNewMonth ] = useState(false)
  
  useEffect(()=>{
    const date = new Date()
    const m = date.getMonth() + 1
    const y = date.getFullYear()
    const thisMonth = m + '.' + y 
    const monthOfCurrentMonthData = currentMonthData.month 
    if(thisMonth === monthOfCurrentMonthData ){
      setIsNewMonth(false)
    }else{
     setIsNewMonth(true)
    }
  },[])
  
  
  return <div>
    
    <div>
      <button onClick={()=>{
        navigate('/')
      }}>back </button>
    </div>
  
    {isNewMonth? <Choose /> : null }
    {!isNewMonth? <Form /> : null }
  </div>
}


