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


const updatePreviousYear = (baseUrl, setChosenButton, currentMonthDaysFull, currentMonthExtraData, setProgress , dTBRMin , allYearsData , formdata4CY ) => {
  const date = new Date()
  //const y = date.getFullYear() - 1
  const y = date.getFullYear()
  const year = y.toString()
  
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
        _id : idForTheYear,
        comment : formdata4CY.comment,
        profile_img_link : formdata4CY.profile_img_link
      }
  

      axios.post(`${baseUrl}/update_year`, data )
  
  
  setProgress('updated previous year')
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

export default function App({setChosenButton, currentMonthDaysFull , setProgress , formdata4CY }){
  const { baseUrl , currentMonthExtraData, setCurrentMonthExtraData, dTBRMin , allYearsData } = useContext(Context)
  
  return <div class='relative w-full'>
  
  <div class='absolute top-20 flex justify-center w-full'>
    <div class='grid m-3 gap-2'>
      <p class='m-2 text-2xs text-white'>{currentMonthExtraData.resolution}</p>
    
      <input class='w-80 rounded p-2' type='text' value={currentMonthExtraData.resolution_fulfilled} 
      onChange={(e)=>updateResolutionFulfilled(e, setCurrentMonthExtraData )}/>
      
      <textarea class='rounded p-2' value={currentMonthExtraData.comment}
      onChange={(e)=>updateComment(e, setCurrentMonthExtraData )} />
      
      <div class='flex justify-center'>
        <button class=' bg-blue-400 p-2 m-2 rounded' onClick={()=>updatePreviousYear(baseUrl, setChosenButton, currentMonthDaysFull, currentMonthExtraData, setProgress , dTBRMin , allYearsData , formdata4CY )}> update Year </button>
      </div>
      
    </div>
  </div>
  
  </div>
}