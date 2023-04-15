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
  const [ style , setStyle ] = useState('')
  return <div>
  
  <div class={`grid ${style}`}>
      <button onClick={()=>{
        setChosen('new')
        setStyle('hidden')
      }} class='bg-blue-400 m-2 p-2 rounded shadow'>start new month </button>
      
      <button onClick={()=>{
        setChosen('old')
        setStyle('hidden')
      }} class='bg-blue-400 m-2 p-2 rounded shadow'>keep current month data </button>
  </div>
  
  <Chosen chosen={chosen} />
  </div>
} 


const date = new Date()
//const m = date.getMonth() + 1 
const m = 1
const y = date.getFullYear()
const thisMonth = m + '.' + y 

export default function Writerpage(){
  const navigate= useNavigate()
  const { currentMonthData } = useContext(Context)
  const [isNewMonth , setIsNewMonth ] = useState(false)
  
  useEffect(()=>{
    
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


