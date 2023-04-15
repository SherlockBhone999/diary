import DayToBeRememberedList from '../components/DayToBeRememberedList'
import { useNavigate } from 'react-router-dom'



export default function SpecialDayspage(){
  const navigate = useNavigate()
  return <div>
  <div>
    <button onClick={()=>navigate('/')}>back</button>
  </div>
  
  
  <DayToBeRememberedList />
  </div>
}