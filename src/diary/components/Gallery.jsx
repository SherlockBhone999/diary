import {useContext, useState, useRef, useEffect } from 'react'
import {Context} from '../DiaryContextProvider'


const Block = ({item}) =>{
  
  const mx = '20'
  const my = '20'
  const containerheight='100'
  const containerwidth='100'
  
  const {setShowSidepage, setSidepageItem} = useContext(Context)

  const hh = item.happinessIndex>0? item.happinessIndex : Math.abs(Number(item.happinessIndex)).toString()
  const color = item.happinessIndex>0? 'lightblue': 'red'
  
  
  const yy = (Number(my)+Number(containerheight))-Number(hh)
  
  const handleclick = () => {
    setSidepageItem(item)
    setShowSidepage('translate-x-half')
  }
  
  return <div class='bg-gray-200' >
  
  <svg onClick={handleclick} >
      <rect x={mx} y={my} width={containerwidth} height={containerheight} fill='white'/>
      <rect x={mx} y={yy.toString()} width={containerwidth} height={hh} fill={color} />
  </svg>
  
  <div>{item.date}</div>
  </div>
}


function Gallery(){
  const {monthlylist } = useContext(Context)
  const [list, setList] = useState(monthlylist)

  
  
  
  
  return <div class='' >
  
  <div class='grid gap-2 grid-cols-2'>
  {list.map(item => <Block item={item} /> )}
  </div>
  
  
  
  </div>
}

export default Gallery