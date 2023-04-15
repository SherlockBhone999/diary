import { useState, useContext, useRef, useEffect } from 'react'
import { Context } from '../Diary'
import axios from 'axios'
import { pdfExporter } from 'quill-to-pdf'
import loadingGif from '../../assets/Loading_icon.gif'


const quillToPdfConfig = {
        exportAs: 'blob'
  };

const config = {
      headers :{
        "content-type":"multipart/form-data"
      }
    }

const OneDayToProcessForNewMonth = ({day}) => {
  const [ ready, setReady ] = useState(true)
  
  return <div class='flex w-full justify-between'>
  <p>{day.day}</p>
  <p >generated pdf </p >
  <input type='checkbox' checked={ready} class='m-2' readOnly/>
  </div>
}

//save delta as pdf in backend
//merge pdf
//upload pdf to gdrive
//update this year



 
const ForNewMonth = ()=>{
  const { currentMonthData, baseUrl } = useContext(Context)
  //const uploadingPdfToBackendProgressArray
  const [ backendPdfCount , setBackendPdfCount ] = useState(0)
  const [ progress , setProgress ] = useState('hi')
  const [ popUpStyle , setPopUpStyle ] = useState('hidden')
  
  const sendBlobToBackend = async (delta_data) => {
    const pdfAsBlob = await pdfExporter.generatePdf(delta_data, quillToPdfConfig )
    const data = {blob : pdfAsBlob , name : '1'}
    axios.post(`${baseUrl}/save_pdf_in_backend`, data, config )
    .then((res)=>{
      setProgress('pdf saved :' + res.data + '/' + currentMonthData.days.length)
      setBackendPdfCount(res.data)
    })
  }
  
  const start = () => {
    setPopUpStyle('')
    setProgress('pdf saved :' + 0 + '/' + currentMonthData.days.length )
    currentMonthData.days.map( (day,index) => {
       setTimeout(()=>{
         sendBlobToBackend(day.delta_data)
       },100*index)
    })
  }
  
  const mergePdfs = () => {
    axios.get(`${baseUrl}/merge_pdfs`)
  }
  
  useEffect(()=>{
    if( backendPdfCount === currentMonthData.days.length){
      setProgress('all days are saved as pdfs')
    }
  },[backendPdfCount])
  
  return <div>
  
  <div>
    <div>to patch up : {currentMonthData.month}</div>
    
    <button class='bg-blue-400 m-3 p-3 rounded border-2 border-black shadow' 
    onClick={start}>
      Start
    </button>
      
    {
      currentMonthData.days.map(day => <div>
        <OneDayToProcessForNewMonth day={day}/>
      </div>)
    }
    
    
  </div>
  
  <div class={`fixed w-screen h-screen bg-black opacity-60 top-0 left-0 flex justify-center ${popUpStyle}`}>
    <div class='fixed top-60'>
      <img src={loadingGif} class=''/>
      <div class='text-white text-xl flex justify-center'>{progress}</div>
    </div>
    <button class='text-white' onClick={mergePdfs}>merge</button>
    <button class='text-white' onClick={()=>setPopUpStyle('hidden')}>back</button>
  </div>
  
  </div>
}

export default ForNewMonth 