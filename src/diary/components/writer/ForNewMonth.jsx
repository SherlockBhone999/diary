
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../Diary'
import { pdfExporter } from 'quill-to-pdf'
import axios from 'axios'
import FormForCreateORUpdateYear from './FormForCreateORUpdateYear'
import loadingImg from '../../../assets/Loading_icon.gif'
import { useNavigate } from 'react-router-dom'


const fetch = (baseUrl, setChosenButton, setCurrentMonthDaysFull, setProgress ) => {
  //fetch current month days 
  axios.get(`${baseUrl}/get_all_current_month_days_full`)
  .then(res => {
    setCurrentMonthDaysFull(res.data)
    setProgress('fetched')
    setChosenButton('savePdfsInBackend')
  })
  
}



const savePdfsInBackend = (baseUrl, setChosenButton, currentMonthDaysFull , 
  setProgress ) => {
  
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };  
  const quillToPdfConfig = {
    exportAs: 'blob'
  };
  
  currentMonthDaysFull.map(async (day) => {
    const pdfAsBlob = await pdfExporter.generatePdf(day.delta_data , quillToPdfConfig )
    const data = {blob : pdfAsBlob }
    axios.post(`${baseUrl}/save_pdf_in_backend`, data, config )
    .then(res => {
      const pdfcount = res.data
      if(pdfcount < currentMonthDaysFull.length){
        setProgress(`saved_pdf : ${count}/${currentMonthDaysFull.length}`)
      }else{
        setProgress('saved_all_pdfs_in_backend')
        setChosenButton('merge_pdfs')
      }
    })
  })
}


const mergePdfsInBackend = (baseUrl, setChosenButton, setProgress ) => {
  axios.get(`${baseUrl}/merge_pdfs`)
  .then(res => {
    setProgress('merged_pdf')
    setChosenButton('uploadPdfToGdrive')
  })
}


const uploadPdfToGdrive = (baseUrl, setChosenButton, setCurrentMonthExtraData , setProgress) => {
  setChosenButton('loading')
  axios.get(`${baseUrl}/upload_pdf_to_gdrive`)
  .then(res => {
    const gdriveLink = res.data
    setCurrentMonthExtraData(prevv =>{ return {...prevv, gdriveLink : gdriveLink } })
    setProgress('uploaded_pdf_to_gdrive')
    setChosenButton('createYear')
  })
}


const deleteCurrentMonthDaysAndExtra = (baseUrl, setChosenButton, currentMonthDaysFull, currentMonthExtraData, setProgress ) => {
  
  currentMonthDaysFull.map(day => {
    axios.post(`${baseUrl}/delete_current_month_day`, {_id : day._id })
  })
  
  const date = new Date()
  const m = date.getMonth()+1 
  const y = date.getFullYear()
  const thismonth = m + '.' + y 
  const dataForCMED = { _id : currentMonthExtraData._id , resolution : '', 
  month : thismonth.toString() }
  axios.post(`${baseUrl}/update_current_month_extra_data`, dataForCMED )
  
  setProgress('deleted_current_month_days_&_extra')
  setChosenButton('deletePdfsInBackend')
}


const deletePdfsInBackend = (baseUrl, setChosenButton , setProgress ) => {
  axios.get(`${baseUrl}/delete_pdfs`)
  setProgress('deleted_pdfs_in_backend')
  setChosenButton('done')
  
}

const Chosen = () => {
  const [ progress , setProgress ] = useState('')
  const [ chosenButton, setChosenButton ] = useState('start')
  const { baseUrl , currentMonthExtraData, setCurrentMonthExtraData, dTBRMin , allYearsData } = useContext(Context)
  const [ currentMonthDaysFull , setCurrentMonthDaysFull ] = useState([])
  
  const navigate = useNavigate()
  const btnStyle = 'bg-blue-400 p-6 mb-4 rounded'
  
  return <div >
  
    <div class='relative h-[50vh] bg-gray-400'>
      <p class='absolute top-20 text-2xl m-2 bg-slate-600 text-white border-2 border-white p-4'> progress : {progress} </p>
      
      <div class='flex justify-center items-center h-full '>
        { chosenButton === 'start'?
          <button onClick={()=>fetch(baseUrl, setChosenButton, setCurrentMonthDaysFull , setProgress )} class={btnStyle}> start </button> 
        : null}
        
        { chosenButton === 'savePdfsInBackend'?
          <button onClick={()=>savePdfsInBackend( baseUrl, setChosenButton, currentMonthDaysFull , setProgress )} class={btnStyle}> generate pdf</button>
        : null }
        
        { chosenButton === 'merge_pdfs'?
          <button onClick={()=>mergePdfsInBackend(baseUrl, setChosenButton, setProgress)} class={btnStyle}> merge pdfs</button>
        : null }
        
        { chosenButton === 'uploadPdfToGdrive'?
          <button onClick={()=>uploadPdfToGdrive( baseUrl, setChosenButton, setCurrentMonthExtraData, setProgress )} class={btnStyle}> upload pdf </button>
        : null }
        
        { chosenButton === 'deleteCurrentMonthDaysAndExtra'?
          <button onClick={()=>deleteCurrentMonthDaysAndExtra(baseUrl, setChosenButton, currentMonthDaysFull, currentMonthExtraData , setProgress )}
          class={btnStyle}>delete current month</button>
        : null }
        
        { chosenButton === 'deletePdfsInBackend'?
          <button onClick={()=>deletePdfsInBackend( baseUrl, setChosenButton, setProgress )} class={btnStyle}>deletePdfs</button>
        : null }
        
        { chosenButton === 'done'?
          <button class={btnStyle} onClick={()=>{
            navigate('/history')
          }}>done</button>
        : null }
        
        { chosenButton === 'loading'?
          <div class='w-40 '>
            <img src={loadingImg} class='rounded-lg'/>
          </div>
        : null }
      
      </div>
    
      { chosenButton === 'createYear' ?
        <div class='absolute top-0 bg-black bg-opacity-80 h-full w-full'>  
          <FormForCreateORUpdateYear setChosenButton={setChosenButton}
          setProgress={setProgress}
          currentMonthDaysFull={currentMonthDaysFull}/>
        </div>
      : null }
        
    </div>  
    

  <button class='p-4 m-4 ' onClick={()=>setChosenButton('createYear')}> hi </button>
  <button class='p-4 m-4' onClick={()=>setChosenButton('loading')}>load</button>
  
  </div>
}

export default function ForNewMonth () {
  return <div>
    <Chosen />
  </div>
}