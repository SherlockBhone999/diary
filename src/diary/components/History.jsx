import { useState, useContext, useEffect } from 'react'
import { Context } from '../Diary'
import { useNavigate } from 'react-router-dom'
import { allData } from '../fakedata2'
import PieChart from '../components/PieChart'
const { years } = allData

const colors = ['bg-green-500','bg-yellow-300','bg-orange-500','bg-sky-400','bg-rose-400', 'bg-indigo-500']

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


const ChartForTheYear = ({chosenYear}) => {
  return <div>
    <div class='bg-gray-200 aspect-square w-80 mr-2 overflow-scroll'>
      { chosenYear === ''? null :
        <div class='grid'>
          {chosenYear.days_of_the_year.map(day => <div class='flex'>
            <p>{day.day}</p>
            <p class='ml-5'>{day.title}</p>
          </div>)}
        </div>
      }
    </div>
  </div>
}

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


export default function History(){
  const [ indexToShow , setIndexToShow ] = useState('')
  //for days_of_the_year box
  const [ chosenYear, setChosenYear ] = useState('')
  //for piechart
  const [ chosenMonth, setChosenMonth ] = useState('')
  //below piechart
  const [ pieChartLabels , setPieChartLabels ] = useState([])
  
  return <div>
    <div>
      { chosenMonth === ''?
      <ChartForTheYear chosenYear={chosenYear} />
      :
      <ChartForTheMonth chosenMonth={chosenMonth} pieChartLabels={pieChartLabels} />
      }
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