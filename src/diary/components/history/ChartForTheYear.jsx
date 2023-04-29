import emptyimg from '../../../assets/empty.png'
import loadingImg from '../../../assets/Loading_icon.gif'
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../Diary'
import axios from 'axios'


const updateChosenImg = (e,setChosenImg) => {
  const inputFile = e.target.files[0]
  setImgFileToBase64(inputFile, setChosenImg)
}

const setImgFileToBase64 = (inputFile, setChosenImg) => {
  const reader = new FileReader()
  reader.readAsDataURL(inputFile)
  reader.onloadend = () => {
    setChosenImg(reader.result )
  }
}

const updateComment = (e,setComment) => {
  setComment(e.target.value)
}

const handleSubmit = ( baseUrl, item, comment, chosenImg , setShowLoading) => {
  const cloudinary_id = item.profile_img_link.slice(71,91)
  const public_id = `diaryApp/${cloudinary_id}` 
  const data = {
    newImg : chosenImg,
    cloudinary_public_id : public_id,
    _id : item._id,
    year : item.year,
    comment : comment,
    months : item.months,
    days_of_the_year : item.days_of_the_year,
    profile_img_link : item.profile_img_link
  }
  setShowLoading(true)
  axios.post(`${baseUrl}/update_part_of_year`, data )
  setTimeout(()=>{
    window.location.reload()
  },4000)
    

  
}

const Profile4Two = ({item, setShowLoading}) => {
  const [ chosenImg ,setChosenImg ] = useState('')
  const [ comment, setComment ] = useState('')
  const [ editDisabled, setEditDisabled ] = useState(true)
  const { baseUrl } = useContext(Context) 

  
  useEffect(()=>{
    setComment(item.comment)
  },[item])
  
  return <div class='relative w-full'>
  
      <div>
        
          <div class='flex justify-center'>
          { chosenImg === '' ?
          <div class='w-40 relative'>
            { item.profile_img_link?
              <img src={item.profile_img_link} />
              :
              <img src={emptyimg} />
            }
          </div>
          :
          <div class='w-40 relative'>
            <img src={chosenImg} />
          </div>
          }
          
          <div class='bg-gray-50 p-4 w-80 relative'>
            <textarea value={comment} disabled={editDisabled} 
            onChange={(e)=>updateComment(e,setComment)}/>
          </div>
          
          </div>
          
      { !editDisabled?
        <div class='flex relative'>
          <div class='absolute right-[100px] flex'>
            <input type='file' onChange={(e)=>updateChosenImg(e,setChosenImg)} class='bg-blue-400 m-1 p-2 w-[114px] rounded '/>
            <button class='bg-blue-400 m-1 p-2 rounded ' onClick={()=>{
              setEditDisabled(true)
              setChosenImg('')
              setComment(item.comment)
            }}>Cancel</button>
            <button class='bg-blue-400 m-1 p-2 rounded ' 
            onClick={(e)=>handleSubmit( baseUrl, item,comment, chosenImg , setShowLoading )}>Submit</button>
          </div>
        </div>
      : 
        <div class='flex relative'>
          <button class='bg-blue-400 m-2 p-2 rounded absolute right-[100px]' 
          onClick={()=>setEditDisabled(false)}>
          Edit
          </button>
        </div>
      }
      
    </div>
    

    
  </div>
}



const MonthButtons = ({item,setItem4Month, setStyle3}) => {
  return <div class='w-full flex justify-end mt-10'>
    <div class=' w-2/6'>
      <div class='grid grid-cols-4 mr-8'>
        { item.months.map(month => <div> 
          <button class='bg-sky-400 m-2 p-2 rounded shadow'
          onClick={()=>{
            setItem4Month(month)
            setStyle3('')
          }}>{month.month[0]}{month.month[1]}</button>
        </div>)
        }
      </div>
    </div>
  </div>
}
 
const DOTY = ({item}) => {
  return <div>
      <div class='flex mt-7' >
        <div>
          <p class='pl-4 mt-4 text-white'>Days Of The Year : </p>
          <div class='flex overflow-scroll m-2'>
            <div class='grid p-4 bg-gray-500 rounded-lg gap-2 h-72 text-gray-400'>
             {item.days_of_the_year.map(day => <div>
                <p>{day.day}</p>
             </div>)}
            </div>
            
            <div class='grid p-4 bg-gray-500 rounded-lg gap-2 h-72 text-gray-400'>
             {item.days_of_the_year.map(day => <div>
                <p>{day.reason}</p>
             </div>)}
            </div>
            
          </div>
        </div>
      </div>
  
  </div>
}

const ChartForTheYear = ({item,setItem4Month, setStyle2, setStyle3 }) => {
  const [ showLoading , setShowLoading ] = useState(false)
  
  return <div class='bg-gray-500 h-full border-2 border-black rounded pt-5 pl-5 relative '>
    <button class='bg-blue-400 p-2 m-2 rounded' 
    onClick={()=>setStyle2('translate-x-full')}>Back</button>
    
    { showLoading?
      <div class='absolute top-0 left-0 w-full h-[50vh] flex justify-center items-center'>
        <img src={loadingImg} class='w-40 rounded-lg ' />
      </div>
    : 
      <div>
        <Profile4Two item={item} setShowLoading={setShowLoading}/>
        <DOTY item={item}/>
        <MonthButtons item={item}  setItem4Month={setItem4Month} setStyle3={setStyle3}/>
      </div>
    }
    
  </div>
}

export default ChartForTheYear


