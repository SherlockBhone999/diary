import { useState, useContext, useEffect } from 'react'
import { Context } from '../Diary'
import { allData } from '../fakedata2'
import PieChart from '../components/PieChart'
const { years } = allData

const colors = ['#ffa822','#134e6f','#ff6150','#1ac0c6','#dee0e6']

const OneMonth = ({month, setChosenMonth, setPieChartLabels}) => {
  
  const updatePieChartLabels = () => {
    const arrayOfCounts = []
    month.pie_data.map(tagobj => {
      arrayOfCounts.push(tagobj.count)
    })
    arrayOfCounts.sort((a,b)=>{
     return b-a
    })
    const arrayOfCountsWithoutDuplicates = []
    arrayOfCounts.map(num => {
      if(!arrayOfCountsWithoutDuplicates.includes(num)){
        arrayOfCountsWithoutDuplicates.push(num)
      }
    })
    const objsArray = []
    arrayOfCountsWithoutDuplicates.map(num =>{
      month.pie_data.map((obj, index) => {
        if(num === obj.count ){
          const item = {
            tag : obj.tag,
            count : obj.count.toString(),
            color : colors[index]
          }
          console.log(num + obj.count.toString())
          objsArray.push(item)
        }
      })
    })
    console.log(objsArray)
    setPieChartLabels(objsArray)
  }
  
  
  return <div class='flex bg-blue-200 m-1 justify-center'>
    <button onClick={()=>{
      setChosenMonth(month)
      setPieChartLabels([])
      updatePieChartLabels()
    }} class='w-full p-2'>{month.month}</button>
  </div>
}
 

const OneYear = ({year, index, indexToShow , setIndexToShow, setChosenYear, 
setChosenMonth, setPieChartLabels }) => {
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
          setChosenYear(years[index])
        }
        else { 
          setIndexToShow(''); 
          setChosenYear('') 
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


export default function History(){
  const [ indexToShow , setIndexToShow ] = useState('')
  //for days_of_the_year box
  const [ chosenYear, setChosenYear ] = useState('')
  //for piechart
  const [ chosenMonth, setChosenMonth ] = useState('')
  //below piechart
  const [ pieChartLabels , setPieChartLabels ] = useState([])
  
  return <div>
    <div class='flex'>
    <div class='bg-gray-200 aspect-square w-80 mr-2 overflow-auto-scroll'>
      {
        chosenYear === ''? null :
        <div class='grid'>
          {chosenYear.days_of_the_year.map(day => <div class='flex'>
            <p>{day.day}</p>
            <p class='ml-5'>{day.title}</p>
          </div>)}
        </div>
      }
    </div>
    
    <div class='bg-gray-200 aspect-square flex flex-auto '>
      {chosenMonth === ''? null :
        <div>
          <PieChart pieData={chosenMonth.pie_data}/>
          {pieChartLabels.map(item => 
          <div class='flex m-1'>
            <div class={`w-5 h-5 bg-[${item.color}]`}> </div>
            <p class='pl-2'>{item.tag}</p>
          </div>)
          }
        </div>
      }
    </div> 
    </div>
  
  
  {
    years.map((year,index) => <div>
      <OneYear year={year} 
      index={index} 
      indexToShow={indexToShow} 
      setIndexToShow={setIndexToShow}
      setChosenYear={setChosenYear}
      setChosenMonth={setChosenMonth}
      setPieChartLabels={setPieChartLabels}/>
    </div>)
  }
  
  
  </div>
}