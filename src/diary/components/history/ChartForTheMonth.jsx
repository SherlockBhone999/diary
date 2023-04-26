import {useNavigate} from 'react-router-dom'
import PieChart from './PieChart'
import { useState, useEffect} from 'react'

const isAlreadyExist = (str, array) => {
  const arr = []
  array.map(obj => {
    arr.push(obj.tag)
  })
  if(arr.includes(str)){
    return true
  }else{
    return false
  }
}

const colorsList = ['bg-green-500', 'bg-yellow-300', 'bg-orange-500', 'bg-sky-400', 'bg-rose-400', 'bg-indigo-500']

const ChartForTheMonth = ({item, setStyle3}) => {
  const [ pieDataBtoSList , setPieDataBtoSList ] = useState([])
  
  useEffect(()=>{
    const arrForPie = []
    item.pie_data.map((obj,index)=>{
      const data = {...obj, color : colorsList[index] }
      arrForPie.push(data)
    })
    
    const arrOfCounts = []
    arrForPie.map(obj => {
      arrOfCounts.push(obj.count)
    })
    
    const sortedArrOfCounts = arrOfCounts.sort( function(a,b){return b - a})
    
    const sortedCompleteArr = []
    sortedArrOfCounts.map(n => {
      arrForPie.map(obj => {
        if(obj.count === n ){
          const alreadyExist = isAlreadyExist(obj.tag, sortedCompleteArr )
          if(alreadyExist !== true ){
            sortedCompleteArr.push(obj)
          }
        }
      })
    })
    
    setPieDataBtoSList(sortedCompleteArr)
  },[item])
  
  return <div class='bg-gray-400 h-full border-2 border-black rounded'>
 
  <div>
    <button class='bg-blue-400 p-2 m-3 rounded'
    onClick={()=>setStyle3('translate-y-full')}>Back</button>
  </div>
  
  <p class='text-2xl ml-2 m-1'>{item.month}</p>
  
  <div class='flex relative m-4'>
    <div class='w-90 h-72'>
      { item.pie_data? 
        <PieChart pieData={item.pie_data} />
      : null }
    </div>
    
    <div class='absolute left-80 bg-blue-200 w-80 h-[28vh] overflow-scroll'>
      {pieDataBtoSList.map( (obj) => <div>
        <div class='flex items-center'>
          <div class={`w-5 h-5 ${obj.color} m-1`}>
          </div>
          <p class='m-2 p-2'>{obj.tag}</p>
        </div>
      </div>)}
    </div>
  </div>
  
    <a href='https://drive.google.com/file/d/19sHvUo5PPzQoy7nqpv6GgtiPJLEq4STE/view?usp=share_link' target="_blank" class='bg-red-600 text-white m-2 p-2 rounded border-1 border-black mb-2'>READ</a>


<div class='bg-slate-800 h-[45vh] overflow-scroll w-11/12 m-2 p-4 rounded-lg border-2 border-white shadow-md'>
  <div>
  <p class='text-white m-2 p-2 text-2xl'> Resolution : {item.resolution}</p>
  
  <div class='flex justify-between'>
    <p class='text-white m-2 p-2 text-xl'>resolution fulfilled? : {item.resolution_fulfilled} </p>
    <button class='bg-blue-400 m-1 p-1'>edit</button>
  </div>
  </div>
  <div class='m-2 p-4 '>
    <p class='text-white'>comment : </p>
    <p class='p-4 overflow-scroll bg-stone-200 w-11/12 overflow-scroll h-36 rounded'>{item.comment}</p> 
  </div>
  
  <hr class='h-1 bg-black w-11/12 '/>
  <p class='text-xl ml-2 text-white'>What was on my mind : </p>
  <div class='grid gap-3 h-56 p-4 pt-2 m-3'>
    { item.thoughts.map(thought => <div>
      <p class='p-4 bg-yellow-100 rounded flex-1 mr-8'>{thought}</p>
    </div>)}


  </div>
</div>
  </div>
}

export default ChartForTheMonth

/*
const ChartForTheMonth = ({chosenMonth, pieChartLabels}) => {
  const navigate = useNavigate()
  return <div class='flex '>
    <div class='bg-gray-200 w-80 h-80  mr-2 overflow-scroll relative' >
      <p>{chosenMonth.month}</p>
      <p>resolution : {chosenMonth.resolution}</p>
      <p>resolution_fullfilled : {chosenMonth.resolution_fulfilled}</p>
      
      <div>
        <p>my_comment :</p>
        <textarea value={chosenMonth.comment}/>
      </div>
      
      <div class='grid'>
        <p>my thoughts during the month : </p>
        {
          chosenMonth.thoughts.map(str => <p>
            {str}
          </p>)
        }
      </div>
      
      <div class='absolute bottom-0 right-0'>
        <a class='bg-red-600 text-white m-2 p-2 rounded' href="https://drive.google.com/file/d/1ynnMemPS17kE02O0vAnW83026PRQ6I7b/view" > Read </a>
      </div>
    </div>
    
    
    
    
    
    <div class='bg-gray-200 w-80 h-80 flex flex-auto overflow-scroll'>
      <div class='grid'>
        <PieChart pieData={chosenMonth.pie_data}/>
            
        <div>
          {pieChartLabels.map(item => 
            <div class='flex m-1'>
            <div class={`w-5 h-5 ${item.color}`}> </div>
            <p class='pl-2'>{item.tag}</p>
          </div>) }
        </div>
      </div>
    </div>
  </div>
}


export default ChartForTheMonth

*/