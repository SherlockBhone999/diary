import { useState, useContext , useEffect } from 'react'
import { Context } from '../../Diary'
import axios from 'axios'
import emptyimg from '../../../assets/empty.png'

const updateCommentY = (e, setFormdata4CY) => {
  const input = e.target.value
  setFormdata4CY(prevv => {
    const data = {...prevv , comment : input }
    return data
  })
}

const updateChosenImg = (e,setFormdata4CY) => {
  const inputFile = e.target.files[0]
  setImgFileToBase64(inputFile, setFormdata4CY)
}

const setImgFileToBase64 = (inputFile, setFormdata4CY) => {
  const reader = new FileReader()
  reader.readAsDataURL(inputFile)
  reader.onloadend = () => {
    setFormdata4CY(prevv => {
      const data = {...prevv , chosenImg : reader.result }
      return data
    })
  }
}

const handleSubmit = (baseUrl, formdata4CY, setProgress, setChosenButton, setFormdata4CY ) => {
  const data = { img : formdata4CY.chosenImg } 
  //send img to backend
  
  axios.post(`${baseUrl}/upload_img_to_cloudinary`, data )
  .then(res => {
    const link = res.data
    const data = { comment : formdata4CY.comment, profile_img_link : link }
    setFormdata4CY(data)
    console.log(data)
    setChosenButton('updateYear')
    setProgress('concluded the year')
  })
}

export default function App({setChosenButton, setProgress , formdata4CY, setFormdata4CY}){
  const { baseUrl, allYearsData } = useContext(Context)
 // const [ formdata4CY , setFormdata4CY ] = useState({comment : '', profile_img_link : '', chosenImg : ''})
  const [ prevYear, setPrevYear ] = useState({})
  
  useEffect(()=>{
    const date = new Date()
    //const y = date.getFullYear() -1 
    const y = date.getFullYear()
    const previousYear = y.toString()
    
    allYearsData.map(yearr => {
      if(yearr.year === previousYear ){
        setPrevYear(yearr)
        setFormdata4CY(prevv => {
          return {...prevv, comment : yearr.comment }
        })
      }
    })
  
  },[allYearsData])
  
  return <div class='grid'>
 
      <textarea class='rounded mt-5' placeholder = '...comment for the year' value={formdata4CY.comment}
      onChange={(e)=>updateCommentY(e,setFormdata4CY )} />
      
      <input type='file' onChange={(e)=>updateChosenImg(e,setFormdata4CY)}/>
      
      { prevYear.profile_img_link?
        <div class='w-40'>
          <img src={prevYear.profile_img_link} />
        </div>
      :
        <div class='w-40'>
          { formdata4CY.chosenImg === '' ? <img src={emptyimg} /> : null }
          { formdata4CY.chosenImg !== '' ? <img src={formdata4CY.chosenImg} /> : null }
        </div>
      }
      
      <div class='flex justify-center'>
        <button class=' bg-blue-400 p-2 m-2 rounded' onClick={()=>handleSubmit(baseUrl, formdata4CY,setProgress, setChosenButton , setFormdata4CY )}> conclude year</button>
      </div>
    
      <button onClick={()=>console.log(prevYear)}>click</button>
  
  </div>
}