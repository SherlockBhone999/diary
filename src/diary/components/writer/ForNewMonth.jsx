
import { useState, useEffect, useContext } from 'react'
import { Context } from '../../Diary'
import { pdfExporter } from 'quill-to-pdf'
import axios from 'axios'
import FormForCreateORUpdateYear from './FormForCreateORUpdateYear'




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
  
  const dataForCMED = { _id : currentMonthExtraData._id , resolution : ''}
  axios.post(`${baseUrl}/update_current_month_extra_data`, dataForCMED )
  
  setProgress('deleted_current_month_days_&_extra')
  setChosenButton('deletePdfsInBackend')
}


const deletePdfsInBackend = (baseUrl, setChosenButton , setProgress ) => {
  axios.get(`${baseUrl}/delete_pdfs`)
  .then(()=>{
    setProgress('deleted_pdfs_in_backend')
    setChosenButton('done')
  })
  
}

const Chosen = () => {
  const [ progress , setProgress ] = useState('')
  const [ chosenButton, setChosenButton ] = useState('start')
  const { baseUrl , currentMonthExtraData, setCurrentMonthExtraData, dTBRMin , allYearsData } = useContext(Context)
  const [ currentMonthDaysFull , setCurrentMonthDaysFull ] = useState([])
  

  
  return <div class='relative h-48'>
  currentMonthDaysFull : {JSON.stringify(currentMonthDaysFull)}
  <hr/>
  currentMonthExtra : {JSON.stringify(currentMonthExtraData)}
  <hr/>
  progress : {progress}
  
  <div class='grid'>
  { chosenButton === 'start'?
    <button class='' onClick={()=>fetch(baseUrl, setChosenButton, setCurrentMonthDaysFull , setProgress )}> start </button> 
  : null}
  
  { chosenButton === 'savePdfsInBackend'?
    <button class='' onClick={()=>savePdfsInBackend( baseUrl, setChosenButton, currentMonthDaysFull , setProgress )}> generate pdf</button>
  : null }
  
  { chosenButton === 'merge_pdfs'?
    <button class='' onClick={()=>mergePdfsInBackend(baseUrl, setChosenButton, setProgress)}> merge pdfs</button>
  : null }
  
  { chosenButton === 'uploadPdfToGdrive'?
    <button class='' onClick={()=>uploadPdfToGdrive( baseUrl, setChosenButton, setCurrentMonthExtraData, setProgress )} > upload pdf </button>
  : null }
  
  { chosenButton === 'createYear' ?
    <div class='absolute w-full h-full top-0 left-0 bg-black bg-opacity-40 '>  
      <FormForCreateORUpdateYear setChosenButton={setChosenButton}
      setProgress={setProgress}
      currentMonthDaysFull={currentMonthDaysFull}/>
    </div>
  : null }
  
  { chosenButton === 'deleteCurrentMonthDaysAndExtra'?
    <button class='' onClick={()=>deleteCurrentMonthDaysAndExtra(baseUrl, setChosenButton, currentMonthDaysFull, currentMonthExtraData , setProgress )}>delete current month</button>
  : null }
  
  { chosenButton === 'deletePdfsInBackend'?
    <button class='' onClick={()=>deletePdfsInBackend( baseUrl, setChosenButton, setProgress )}>deletePdfs</button>
  : null }
  
  { chosenButton === 'done'?
    <button class='' onClick={()=>{}}>done</button>
  : null }
  
  </div>
  
    

  

  
  <hr/>
  <hr/>
  <button class='' onClick={()=>setChosenButton('createYear')}> create Year </button>
  <button class='' onClick={()=>deletePdfsInBackend( baseUrl, setChosenButton, setProgress )}>deletePdfs</button>
  </div>
}

export default function ForNewMonth () {
  return <div>
    <Chosen />
  </div>
}