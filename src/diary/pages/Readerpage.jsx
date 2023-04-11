import Reader from '../components/Reader'
import { useNavigate } from 'react-router-dom'

export default function Readerpage () {
  const navigate = useNavigate()
  return <div>
    <div>
      <button onClick={()=>{
        navigate(-1)
      }}>back </button>
    </div>
  
    <Reader />
  </div>
}