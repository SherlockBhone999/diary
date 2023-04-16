import {useState, useEffect } from 'react'
import OneMonth from './OneMonth'


const OneYear = ({year, index, indexToShow , setIndexToShow, setChosenYear, 
setChosenMonth, setPieChartLabels , allYearsData }) => {
  const [style , setStyle ] = useState('hidden')
  
  useEffect(()=>{
    if(index === indexToShow){
      setStyle('')
    }else{
      setStyle('hidden')
    }
  },[indexToShow])
  
  return <div >
    <div class='bg-gray-200 rounded m-2'>
      <button onClick={()=>{
        if(indexToShow !== index ){ 
          setIndexToShow(index); 
          setChosenYear(allYearsData[index])
          setChosenMonth('')
        }
        else { 
          setIndexToShow(''); 
          setChosenYear('')
          setChosenMonth('')
        }
      }} class='flex justify-start w-full'><p class='p-2'>{year.year}</p></button>
    </div>
    
    <div class={`${style} grid grid-rows-3 grid-flow-col m-1`} >
      {
        year.months.map(month => <div>
          <OneMonth month={month} 
          setChosenMonth={setChosenMonth}
          setPieChartLabels={setPieChartLabels}/>
        </div> )
      }
    </div>
  </div>
}

export default OneYear