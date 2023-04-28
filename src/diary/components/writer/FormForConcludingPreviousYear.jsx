import { useState, useContext , useEffect } from 'react'
import { Context } from '../../Diary'
import axios from 'axios'
import emptyimg from '../../../assets/empty.png'

const updateCommentY = (e, setPrevYear, setFormdata4CY ) => {
  const input = e.target.value
  setPrevYear(prevv => {
    const data = {...prevv , comment : input }
    return data
  })
  setPrevYear(prevv => {
    const data = {...prevv , comment : input }
    return data
  })
  
}

const updateChosenImg = (e,setPrevYear) => {
  const inputFile = e.target.files[0]
  setImgFileToBase64(inputFile, setPrevYear)
}

const setImgFileToBase64 = (inputFile, setPrevYear) => {
  const reader = new FileReader()
  reader.readAsDataURL(inputFile)
  reader.onloadend = () => {
    setPrevYear(prevv => {
      const data = {...prevv, chosenImg : reader.result }
      return data
    }) 
  }
}

//unlike in history year partly update, after this step adding the month into year is also updating, so do not reuse the api call from history chart of the year
const handleSubmit = async (baseUrl, prevYear, setProgress, setChosenButton, setFormdata4CY ) => {

  const data = { img : prevYear.chosenImg }
  setChosenButton('loading')
  
  if(prevYear.chosenImg !== ''){
      await axios.post(`${baseUrl}/upload_img_to_cloudinary`, data )
      .then(res => {
        console.log('upload_img_to_cloudinary',res.data)
        setFormdata4CY(prevv => {
          const data = {...prevv, profile_img_link : res.data }
          return data
        })
        console.log(res.data)
        setProgress('set img & comment')
        setChosenButton('updateYear')
      })
      const cloudinary_id = prevYear.profile_img_link.slice(71,91)
      axios.post(`${baseUrl}/delete_img_in_cloudinary`, {public_id : cloudinary_id })
      
  }else{
    setFormdata4CY(prevYear)
    setProgress('set img & comment')
    setChosenButton('updateYear')
  }
  
}

export default function App({setChosenButton, setProgress , formdata4CY, setFormdata4CY}){
  const { baseUrl, allYearsData } = useContext(Context)
  const [ prevYear, setPrevYear ] = useState({comment : '', chosenImg : '', profile_img_link : ''})
  
  useEffect(()=>{
    const date = new Date()
    //const y = date.getFullYear() -1 
    const y = date.getFullYear()
    const previousYear = y.toString()
    
    allYearsData.map(yearr => {
      if(yearr.year === previousYear ){
        setPrevYear({...prevYear,...yearr})
      }
    })
  
  },[allYearsData])
  
  return <div>
  {JSON.stringify(prevYear.chosenImg)}
  <hr/>
  {JSON.stringify(prevYear.profile_img_link)}
    <div class='flex justify-center'>
      <div class='grid'  >
        <div class='w-full flex justify-center'>
          <div class='w-40'>
            { prevYear.chosenImg === '' ?
              <div class='w-40 relative'>
                { prevYear.profile_img_link?
                  <img src={prevYear.profile_img_link} />
                  :
                  <img src={emptyimg} />
                }
              </div>
            :
              <div class='w-40 relative'>
                <img src={prevYear.chosenImg} />
              </div>
            }
          </div>
          
        </div>
        
        <input type='file' onChange={(e)=>updateChosenImg(e,setPrevYear)}
        class='w-[115px] bg-blue-400 m-1 p-3 rounded'/>
        
        <textarea class='rounded m-1 p-2' value={prevYear.comment}
        onChange={(e)=>updateCommentY(e,setPrevYear ,setFormdata4CY)} />
        
        <div class='flex justify-center'>
          <button class=' bg-blue-400 p-2 m-2 rounded' onClick={()=>handleSubmit(baseUrl, prevYear,setProgress, setChosenButton , setFormdata4CY )}> conclude year</button>
        </div>
      </div>
    </div>
  
    <button onClick={()=>console.log(prevYear)}>click</button>
  
  </div>
}