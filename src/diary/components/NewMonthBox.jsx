import { useState, useContext, useRef, useEffect } from 'react'
import { Context } from '../Diary'
import axios from 'axios'


const OneDayToProcessForNewMonth = ({day, setPdfUploadDone}) => {
  //generate pdf and get its file path in backend
  const [ pdfGenerated , setPdfGenerated ] = useState('')
  
  //upload pdf from backend to gdrive
  const upload = () => {
    setPdfUploadDone( prevv => {
      const arr = [...prevv]
      if(!arr.includes(day.day)){ 
        arr.push(day.day)
      }
      return arr
    })
  }
  
  return <div>
  <p>{day.day}</p>
  <button >generate pdf </button >
  <button onClick={upload}>upload pdf to gdrive </button >
  </div>
}



const ForNewMonth = ()=>{
  const { currentMonthData } = useContext(Context)
  const [ pdfUploadDone, setPdfUploadDone ] = useState([])
  // button to patch up or update currentMonthData or previous month for today
  const [ buttonStyle, setButtonStyle ] = useState('hidden')
  
  useEffect(()=>{
    if( pdfUploadDone.length === currentMonthData.days.length){
      setButtonStyle('')
    }
  },[pdfUploadDone])
  
  return <div>
  its new month
  {JSON.stringify(pdfUploadDone)}
  
  <div>
    <div>to patch up : {currentMonthData.month}</div>
    {
      currentMonthData.days.map(day => <div>
        <OneDayToProcessForNewMonth day={day} setPdfUploadDone={setPdfUploadDone} />
      </div>)
    }
    <div class={buttonStyle}>
      <button > update previous month </button>
    </div>
    
  </div>
  
  
  </div>
}

export default ForNewMonth 