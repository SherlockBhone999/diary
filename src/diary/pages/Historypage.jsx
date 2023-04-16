//import History from '../components/History'
import Container from '../components/history/Container'
import { useNavigate } from 'react-router-dom'


export default function Historypage(){
  const navigate = useNavigate()
  return <div>
  <div class='flex'>
    <button onClick={()=>navigate('/')} class='m-2 p-2 bg-blue-400 rounded'>Home</button>
  </div>
  
  <Container />
  
  </div>
}