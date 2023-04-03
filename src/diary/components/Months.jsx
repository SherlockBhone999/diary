import Days from './Days'
import {useState, useContext} from 'react'
import {Context} from '../DiaryContextProvider'
import {monthlylistcopy2} from '../fakedata'


const Month = ({m}) =>{
  const [showDays, setShowDays] = useState('hide')
  const {setShowSidepage, setDataOfTheMonthForPieChart, setSidepageItem} = useContext(Context)
  
  
  const change= () =>{
    
    if(showDays==='hide'){
      setSidepageItem({})
      setShowDays('show')
      setDataOfTheMonthForPieChart(m.list)
      setShowSidepage('translate-x-half')
    }
    else{
      setShowDays('hide')
      setDataOfTheMonthForPieChart(m.list)
    }
  }
  
  
  return <div>
  <button onClick={change}>{m.name}</button>
  {
    showDays==='hide'? null : <Days m={m}/>
  }
  </div>
}


export default function Months({item}){
  
  return <div class='bg-gray-400 p-5' >
  {
    item.list.map(m => <Month m={m} />)
  }
  </div>
}