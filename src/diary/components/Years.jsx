import Months from './Months'
import {yearslist} from '../fakedata'
import {useState } from 'react'

const Year = ({item})=>{
  const [Interface, setInterface ] = useState('hide')
  
  const change = () =>{
    Interface==='hide'? setInterface('show'): setInterface('hide')
  }
  
  return <div>
  <button onClick={change} >{item.name}</button>
  {
    Interface==='hide'? null : <Months item={item} />
  }
  </div>
}




export default function Years(){
  
  
  return <div class='bg-red-400' >
  
  {
    yearslist.map(item=> <Year item={item} />)
  }
  
  </div>
}