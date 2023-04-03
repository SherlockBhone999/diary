import Navbar from '../components/Navbar'
import {useContext} from 'react'
import {quotes} from '../fakedata'
import {Context} from '../DiaryContextProvider'
import {useNavigate} from 'react-router-dom'



const Quote = ({item}) => {
  
  return <div class='bg-blue-200 flex justify-between'>
  <p>{item.text}</p>
  
  <div >
    <button >edit </button>
    <button >delete </button>
  </div>
  </div>
}


function Quotespage(){
  
  const {showAddQuote} = useContext(Context)
  const navigate = useNavigate()
  
  return <div>
  <Navbar/>
  
  <div>
    <button onClick={()=>navigate(-1)} >back</button>
  </div>
  
  
  { showAddQuote==='hide'? null :
  <div>
    <input type='text' />
    <button >Add</button>
  </div>
  }
  
  {
    quotes.map(item => <Quote item={item} /> )
  }
  </div>
}

export default Quotespage