
import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../Diary'


const Menu = () => {
  const navigate = useNavigate()
  const pstyle = 'p-2 m-1 text-white'
  
  return <div class=''>
  <div class='grid'>
    <p class={pstyle} onClick={()=>navigate('/this_month')}>This Month</p>
    <p class={pstyle} onClick={()=>navigate('/history')}>My History</p>
    <p class={pstyle} onClick={()=>navigate('/days_to_be_remembered')}>Days To Be Remembered</p>
    <p class={pstyle} onClick={()=>navigate('/quotes')}>Quotes</p>
    <p class={pstyle} onClick={()=>navigate('/tags')}>Tags</p>

  </div>
  </div>
}

const QuoteBox = () => {
  const {quotelist} = useContext(Context)
  const [chosenQuote, setChosenQuote ] = useState({text : '', by_who : ''})
  
  useEffect(()=>{
    if(quotelist.length !== 0 ){
      const randomNumber = Math.floor( Math.random()* quotelist.length )
      setChosenQuote(quotelist[randomNumber])
    }
  },[quotelist])
  
  return <div class='bg-yellow-50 w-80 m-2 p-3 rounded border-2 border-black shadow'>
    <p>{chosenQuote.text}</p>
    <p class='flex justify-end'> {chosenQuote.by_who}</p>
  </div>
}


const Main = ({style4Menu, setStyle4Menu }) => {
  const navigate = useNavigate()
  return <div class='relative w-full h-full'>
  
    <div class='bg-blue-400 p-2 m-2 rounded w-min'>
      <button onClick={()=>{
        if(style4Menu === 'w-0') setStyle4Menu('w-40') 
        else{ setStyle4Menu('w-0') }
      }}>Menu</button>
    </div>
    
    <div class='absolute top-40 w-full'>
      <div class='flex justify-center h-24 m-2'>
        <button class='bg-blue-400 w-40 rounded ' onClick={()=>navigate('/write')}>write</button>
      </div>
    </div>
  
    <div class='absolute bottom-40 w-full'>  
      <div class='flex justify-end'>
        <QuoteBox />
      </div>
    </div>   
    
  </div>
}


export default function Home(){
  const [ style4Menu, setStyle4Menu ] = useState('w-0')
  return <div class=''>

      <div class='flex'>
        <div class={`bg-gray-800 h-screen transition-[0] transition-[40] ease-in-out duration-500 ${style4Menu} overflow-hidden border-2 border-black shadow`}>
          <Menu />
        </div>
        
        <div class={`bg-gray-600 flex-auto`}>
          <Main setStyle4Menu={setStyle4Menu} style4Menu={style4Menu}/>
        </div>
        
      </div>
      
    
  </div>
}




