import {useNavigate, useLocation} from 'react-router-dom'
import {useContext} from 'react'
import {Context} from '../DiaryContextProvider'


const ForHomepage = () => {
  const navigate = useNavigate()
  
  return <div class='bg-blue-200 p-4 flex justify-between items-center'>
  
  <button onClick={()=>navigate('/this_month')}>Diary </button>
  
  <button onClick={()=>navigate('/quotes')}>Quotes </button>
  
  <button onClick={()=>navigate('/about')}>about</button>
  
  
  </div>
}


const ForThisMonthpage = () => {
  const navigate = useNavigate()
  return <div class='bg-blue-200 p-4 flex justify-between items-center' >
  <button onClick={()=>navigate('/')}>Home</button>
  
  <button onClick={()=>navigate('/all')}>All Diary</button>
  
  </div>
}


const ForAllpage = () => {
  const navigate = useNavigate()
  const {setInterfaceForAllpage} = useContext(Context)
  
  return <div class='bg-blue-200 p-4 flex justify-between items-center'>
  
  <button onClick={()=>navigate('/')}>Home</button>
  
  <button onClick={()=>setInterfaceForAllpage('all')}> All </button>
  <button onClick={()=>setInterfaceForAllpage('daysTobeRemembered')} >Days to be Remembered </button>
  
  </div>
}


const ForQuotespage = () => {
  const navigate = useNavigate()
  
  const {setShowAddQuote, showAddQuote } = useContext(Context)

  return <div class='bg-blue-200 p-4 flex justify-between items-center'>
  <button onClick={()=>navigate('/')}>Home</button>
  
  <button onClick={()=>{
  showAddQuote==='hide'? setShowAddQuote('show') : setShowAddQuote('hide')
  } }>Add Quote</button>
  
  </div>
}


const ForAboutpage = () => {
const navigate = useNavigate()
  return <div class='bg-blue-200 p-4 flex justify-between items-center'>
  <button onClick={()=>navigate('/')}>Home</button>
  <button > Edit </button>
  </div>
}


function Navbar(){
  const location = useLocation()
  if (location.pathname==='/'){
    return <ForHomepage />
  }else if(location.pathname==='/this_month'){
    return <ForThisMonthpage />
  }else if(location.pathname==='/all'){
    return <ForAllpage />
  }else if(location.pathname==='/about'){
    return <ForAboutpage />
  }else if(location.pathname==='/quotes'){
    return <ForQuotespage />
  }

}
export default Navbar