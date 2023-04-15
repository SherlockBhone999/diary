import TagList from '../components/TagList'
import { useNavigate } from 'react-router-dom'

export default function Tagspage () {
  const navigate = useNavigate()
  return <div>
  <div>
    <button onClick={()=>navigate('/')}>back</button>
  </div>
  
  
    <TagList />
  </div>
}