import { useState, useContext } from 'react'
import { Context } from '../../Diary'
import axios from 'axios'


const getNewMonthObj = (currentMonthDaysFull, currentMonthExtraData ) => {
  const date = new Date()
  const year = date.getFullYear().toString()
  const thismonth = ( date.getMonth() + 1 ).toString() + '.' + year
  
  const thoughtsArr = []
  currentMonthDaysFull.map(day => {
    day.thoughts.map(str => {
      if(!thoughtsArr.includes(str)){
        thoughtsArr.push(str)
      }
    })
  })
  
  const tagsArr = []
  currentMonthDaysFull.map(day => {
    day.tags.map(str => {
      tagsArr.push(str)
    })
  })
  
  const pieData = []
  tagsArr.map(str => {
    var count = 0
    tagsArr.map(str2 => {
      if(str === str2 ){
        count = count + 1
      }
    })
    const obj = { tag : str , count : count }
    
    //don't push already existed
    const tagsInpieData = []
    pieData.map(obj => {
      tagsInpieData.push(obj.tag)
    })
    if(!tagsInpieData.includes(obj.tag)){
      pieData.push(obj)
    }
  })
  
  const data = {...currentMonthExtraData, 
    month : thismonth,
    thoughts : thoughtsArr,
    pie_data : pieData
  }
  return data
}


const createYear = (baseUrl, setChosenButton, currentMonthDaysFull, currentMonthExtraData, setProgress , dTBRMin , allYearsData ) => {
  const date = new Date()
  const year = date.getFullYear().toString()
  //check new year or not
  const years = []
  allYearsData.map(year => {
    years.push(year.year)
  })
  
  if(!years.includes(year)){
      
      /*
      const newMonthData = {
            month : '1.2020',
            resolution : 'get a job',
            resolution_fulfilled : 'no',
            comment : 'code code code',
            thoughts : ['i so horny', 'i want to spy on peoples'],
            gdrive_file_link : 'link',
            pie_data : [
              {tag:'help mom', count : 30 }, 
              {tag : 'code', count : 20 }, 
              {tag : 'exercise', count : 22 },
              {tag : 'sing' , count : 30 },
              { tag : 'waste time on youtube : big ', count : 5 },
              { tag : 'waste time in toilet' , count : 10 }
              ]
      }
  */
      const newMonthData = getNewMonthObj(currentMonthDaysFull, currentMonthExtraData)
      const monthsData = [ newMonthData ]
      
      
      const dTBRInThisYear = []
      dTBRMin.map(day => {
        if( day.day.includes(year) ){
          dTBRInThisYear.push(day)
        }
      })
      
      const data = {
        year : year,
        days_of_the_year : dTBRInThisYear ,
        months : monthsData 
      }
      
      axios.post(`${baseUrl}/create_year`, data )
  } else {
    //update
      const newMonthData = getNewMonthObj( currentMonthDaysFull, currentMonthExtraData)
      var oldMonths = []
      var idForTheYear = ''
      allYearsData.map(yearobj => {
        if(yearobj.year === year ){
          idForTheYear = yearobj._id
          yearobj.months.map(monthobj => {
            oldMonths.push(monthobj)
          })
        }
      })
      
      const monthsData = [...oldMonths, newMonthData]
      
      const dTBRInThisYear = []
      dTBRMin.map(day => {
        if( day.day.includes(year) ){
          dTBRInThisYear.push(day)
        }
      })
      
      const data = {
        year : year,
        days_of_the_year : dTBRInThisYear ,
        months : monthsData,
        _id : idForTheYear
      }
      
      axios.post(`${baseUrl}/update_year`, data )
  }
  
  setProgress('created_year')
  setChosenButton('deleteCurrentMonthDaysAndExtra')
}


const updateResolutionFulfilled = (e, setCurrentMonthExtraData ) => {
  const input = e.target.value
  setCurrentMonthExtraData(prevv => {
    const data = {...prevv , resolution_fulfilled : input }
    return data
  })
}

const updateComment = (e, setCurrentMonthExtraData ) => {
  const input = e.target.value
  setCurrentMonthExtraData(prevv => {
    const data = {...prevv , comment : input }
    return data
  })
}

export default function App({setChosenButton, currentMonthDaysFull , setProgress }){
  const { baseUrl , currentMonthExtraData, setCurrentMonthExtraData, dTBRMin , allYearsData } = useContext(Context)
  
  return <div class=''>
  {JSON.stringify(currentMonthExtraData)}
  <div class='flex justify-center '>
    <div class='grid m-3 gap-2'>
      <input class='w-80 rounded' type='text' placeholder='...resolution fulfilled?' 
      onChange={(e)=>updateResolutionFulfilled(e, setCurrentMonthExtraData )}/>
      <textarea class='rounded' placeholder='...comment for the month' 
      onChange={(e)=>updateComment(e, setCurrentMonthExtraData )} />
      <div class='flex justify-center'>
        <button class=' bg-blue-400 p-2 m-2 rounded' onClick={()=>createYear(baseUrl, setChosenButton, currentMonthDaysFull, currentMonthExtraData, setProgress , dTBRMin , allYearsData )}> create Year </button>
      </div>
    </div>
  </div>
  
  </div>
}