
import QuoteList from '../components/QuoteList'
import { useNavigate } from 'react-router-dom'



export default function Quotespage(){
  const navigate = useNavigate()
  return <div>
  <div>
    <button onClick={()=>navigate('/')}>back</button>
  </div>
  
  <QuoteList />
  </div>
}