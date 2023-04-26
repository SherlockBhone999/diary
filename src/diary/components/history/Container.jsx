import { useState, useContext, useEffect } from 'react'
import { Context } from '../../Diary'
import ChartForTheYear from './ChartForTheYear'
import ChartForTheMonth from './ChartForTheMonth'
import { useNavigate } from 'react-router-dom'


const One = ({setStyle2, setItem42 }) => {
  const { allYearsData } = useContext(Context)
  
  return <div class='bg-gray-600 h-full'>
    <div class=''>
      <div class='grid grid-cols-5 pt-5 pl-5'>
       { allYearsData.map(year => <div>
          <button class='bg-blue-400 p-3 m-3 rounded' onClick={()=>{
            setStyle2('')
            setItem42(year)
          }}>{year.year}</button>
       </div>)
       }
      </div>
    </div>
</div>
}

 
export default function Container(){
  const [ item42 , setItem42 ] = useState({ months : [], year : '', days_of_the_year : []})
  const [ item43 , setItem43 ] = useState({ month : '', resolution : '', resolution_fulfilled : '' , thoughts : [] , pie_data : [] })
  const [ style2 , setStyle2 ] = useState('translate-x-full')
  const [ style3 , setStyle3 ] = useState('translate-y-full')
  const navigate = useNavigate()
  return <div>

{/*
<button onClick={()=>{
  if(style2 === 'translate-x-full'){
    setStyle2('')
  }else{
    setStyle2('translate-x-full')
  }
}}>Click2</button>

<button onClick={()=>{
  if(style3 === 'translate-y-full'){
    setStyle3('')
  }else{
    setStyle3('translate-y-full')
  }
}}>Click3</button>
*/}
 <div class='flex'>
    <button onClick={()=>navigate('/')} class='m-2 p-2 bg-blue-400 rounded'>Home</button>
  </div>
  
<div class='relative h-screen overflow-hidden'>

  <div class='absolute h-screen w-screen left-0 top-0'>
    <One setStyle2={setStyle2} setItem42={setItem42} />
  </div>
  
  <div class={`absolute w-screen h-full top-5 left-5 transition duration-500 ${style2}`}>
    <ChartForTheYear item={item42} setItem4Month={setItem43} setStyle2={setStyle2} 
    setStyle3={setStyle3}/>
  </div>
  
  <div class={`absolute w-screen h-full top-10 left-10 transition duration-500 ${style3}`}>
    <ChartForTheMonth item={item43} setStyle3={setStyle3} />
  </div>
  
  
</div>
  </div>
}



/*
export default function History(){
  //which year
  const [ indexToShow , setIndexToShow ] = useState('')
  //for days_of_the_year box
  const [ chosenYear, setChosenYear ] = useState('')
  //for piechart
  const [ chosenMonth, setChosenMonth ] = useState('')
  //below piechart
  const [ pieChartLabels , setPieChartLabels ] = useState([])
  //from db 
  const { baseUrl, allYearsData } = useContext(Context)
  
  
  
  return <div>
  
    <div>
      { chosenMonth === ''?
      <ChartForTheYear chosenYear={chosenYear} />
      :
      <ChartForTheMonth chosenMonth={chosenMonth} pieChartLabels={pieChartLabels} />
      }
    </div>
  
  
  {
    allYearsData.map((year,index) => <div>
      <OneYear year={year} 
      index={index} 
      indexToShow={indexToShow} 
      setIndexToShow={setIndexToShow}
      setChosenYear={setChosenYear}
      setChosenMonth={setChosenMonth}
      setPieChartLabels={setPieChartLabels}
      allYearsData={allYearsData}/>
    </div>)
  }
  
  
  </div>
}

*/