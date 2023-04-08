import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'



export default function Writerpage(){
  const navigate= useNavigate()
  return <div>
    
    <div>
      <button onClick={()=>{
        navigate('/')
      }}>back </button>
    </div>
  
    <Form />
  </div>
}