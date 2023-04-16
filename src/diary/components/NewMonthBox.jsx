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
    


//save delta as pdf in backend
//merge pdf
//upload pdf to gdrive
//update this year

const ProgressBox = ({progress, mergePdfs, deletePdfs, uploadPdfToGdrive , setPopUpStyle}) => {
  if(progress === 'all days are saved as pdfs'){
    return <div>
      <button class='text-white bg-purple-800 p-4 m-2 rounded' onClick={mergePdfs}>merge</button>
      <div class='text-white text-xl flex justify-center'>{progress}</div>
    </div>
  }else if(progress === 'pdfs_merged'){ 
    return <div>
      <button class='text-white bg-purple-800 p-4 m-2 rounded' onClick={uploadPdfToGdrive}>upload</button>
      <div class='text-white text-xl flex justify-center'>{progress}</div>
    </div>
  }else if( progress === 'uploaded pdf to gdrive' ){ 
    return <div>
      <button class='text-white bg-purple-800 p-4 m-2 rounded' onClick={deletePdfs}>delete</button>
      <div class='text-white text-xl flex justify-center'>{progress}</div>
    </div>
  }else if( progress === 'deleted all files'){ 
    return <div>
      <button class='text-white bg-purple-800 p-4 m-2 rounded' onClick={()=>setPopUpStyle('hidden')}>done</button>
      <div class='text-white text-xl flex justify-center'>{progress}</div>
    </div>
  }else{
    return <div>
      <img src={loadingGif} class=''/>
      <div class='text-white text-xl flex justify-center'>{progress}</div>
    </div>
  }
}


const fetchCurrentMonthDataFull = (baseUrl, setCurrentMonthData) => {
  axios.get(`${baseUrl}/get_current_month_full`)
  .then(res => setCurrentMonthData(res.data))
}
  
const ForNewMonth = ()=>{
  const { currentMonthData,  baseUrl, allYearsData } = useContext(Context)
  //const [ currentMonthData , setCurrentMonthData ] = useState([])
  
  //const uploadingPdfToBackendProgressArray
  const [ backendPdfCount , setBackendPdfCount ] = useState(0)
  const [ progress , setProgress ] = useState('hi')
  const [ popUpStyle , setPopUpStyle ] = useState('hidden')
  const [formdataForCurrentMonth , setFormdataForCurrentMonth ] = useState({resolution_fulfilled : '' , comment : '', gdrive_file_link : ''})
  
  
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
    .then(res => setProgress(res.data))
  }
  
  const deletePdfs = () => {
    axios.get(`${baseUrl}/delete_pdfs`)
    .then(res => setProgress(res.data))
  }
  
  const uploadPdfToGdrive = () => {
    axios.get(`${baseUrl}/upload_pdf_to_gdrive`)
    .then(res => {
      const data = {...formdataForCurrentMonth, gdrive_file_link : res.data }
      setFormdataForCurrentMonth(data)
      setProgress('uploaded pdf to gdrive')
    })
  }
   
  ///createYearData start
  const createYearData = () => {
    //prepare days_of_the_year
    const mydays_of_the_year = []
    currentMonthData.days.map(day => {
      if(day.included_in_days_of_the_year){
        const obj = {
          day : day.day,
          reason : day.reason_to_be_included
        }
        mydays_of_the_year.push(obj)
      }
    })
    ///////done
    
    ////////prepare months
    const thoughtsForThisMonth = []
    currentMonthData.days.map(day =>{
      day.thoughts.map(thoughtStr =>{
        thoughtsForThisMonth.push(thoughtStr)
      })
    })
    
    //to get pie_data
    const tagsForThisMonth = []
    currentMonthData.days.map(day =>{
      day.tags.map(tagStr => {
        tagsForThisMonth.push(tagStr)
      })
    })
    
    const pieDataForThisMonth = []
    tagsForThisMonth.map(tagStr => {
      var count = 0
      tagsForThisMonth.map(tagStr2 => {
        if(tagStr2 === tagStr ){ count = count + 1 }
      })
      const obj = { tag : tagStr , count : count }
      // if already exist don't push
      var alreadyExist = false
      pieDataForThisMonth.map(objj =>{
        if(objj.tag === obj.tag){ alreadyExist = true }
      })
      if(!alreadyExist){ pieDataForThisMonth.push(obj) }
    })
    
    const mymonths = []
    const objForThisMonth = {
        month : currentMonthData.month,
        resolution : currentMonthData.resolution,
        resolution_fulfilled : formdataForCurrentMonth.resolution_fulfilled ,
        comment : formdataForCurrentMonth.comment,
        thoughts : thoughtsForThisMonth,
        gdrive_file_link : formdataForCurrentMonth.gdrive_file_link ,
        pie_data : pieDataForThisMonth
    }
    
    mymonths.push(objForThisMonth)
    ////////done
    
    //////prepare year
    const date = new Date()
    const currentYear = date.getFullYear()
    ////done
    
    
    const bigObjForTheYear = {
      year : currentYear,
      days_of_the_year : mydays_of_the_year,
      months : mymonths
    }
    axios.post(`${baseUrl}/create_year`, bigObjForTheYear )
    .then(res => setProgress(res.data))
  }
  /////createYearData end 
  
  
  
  const createOrUpdateYearData = () => {
    const arrOFYears = []
    allYearsData.map(year => arrOFYears.push(year.year))
    const date = new Date()
    const currentYear = date.getFullYear().toString()
    if(arrOFYears.includes(currentYear)){
      console.log('update')
    }else{
      console.log('create')
      createYearData()
    }
  }
  
  useEffect(()=>{
    if( backendPdfCount === currentMonthData.days.length){
      setProgress('all days are saved as pdfs')
    }
  },[backendPdfCount])
  
//  useEffect(()=>{
//    fetchCurrentMonthDataFull(baseUrl, setCurrentMonthData )
//  },[])
  
  return <div>
  
  <div>
    <div>to patch up : {currentMonthData.month}</div>
    <div> resolution : {currentMonthData.resolution} </div>
    <div>
      <input type='text' placeholder='resolution_fulfilled?' onChange={(e)=>{
        const data = {...formdataForCurrentMonth, resolution_fulfilled : e.target.value }
        setFormdataForCurrentMonth(data)
      }}/>
      <textarea placeholder='comment for this month' onChange={(e)=>{
        const data = {...formdataForCurrentMonth, comment : e.target.value }
        setFormdataForCurrentMonth(data)
      }}/>
    </div>
    
    <button class='bg-blue-400 m-3 p-3 rounded border-2 border-black shadow' 
    onClick={start}>Start</button>
      
    { currentMonthData.days && 
      currentMonthData.days.map((day,index) => <div key={index}>
        <p>{day.day}</p>
      </div>)
    }
  
  </div>
  
  
  <div class={`fixed w-screen h-screen bg-black bg-opacity-60 top-0 left-0 flex justify-center ${popUpStyle}`}>
    <div class='fixed top-60'>
      <button class=' bg-blue-800 m-2 p-2 rounded' onClick={()=>setPopUpStyle('hidden')}>back</button>
      
      <ProgressBox progress={progress} 
      mergePdfs={mergePdfs} 
      deletePdfs={deletePdfs} 
      uploadPdfToGdrive={uploadPdfToGdrive} 
      setPopUpStyle={setPopUpStyle}/>
  
    </div>
  </div>
  
  
  <button onClick={createOrUpdateYearData}>submit</button>
  
  </div>
}

export default ForNewMonth 