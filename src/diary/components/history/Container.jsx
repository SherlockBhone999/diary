import { useState, useContext, useEffect } from 'react'
import { Context } from '../../Diary'
import ChartForTheYear from './ChartForTheYear'
import ChartForTheMonth from './ChartForTheMonth'
import OneYear from './OneYear'


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