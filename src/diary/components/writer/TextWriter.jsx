
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import {useCallback, useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { pdfExporter } from 'quill-to-pdf'
import { Context } from '../../Diary'
 

//////
const TOOLBAR_OPTIONS = [ 
  [{ header: [1, 2, 3, 4, 5, 6, false] }], 
  [{ font: [] }], [{ list: "ordered" }, { list: "bullet" }], 
  ["bold", "italic", "underline"], 
  [{ color: [] }, { background: [] }], 
  [{ script: "sub" }, { script: "super" }], 
  [{ align: [] }], 
  ["image", "blockquote", "code-block", "video"],
  ["clean"],
  ]

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};  



const date = new Date()
const d = date.getDate()
const m = date.getMonth() + 1
const y = date.getFullYear()
const fulldate = d + '.' + m +'.' + y



export default function TextWriter({disable, setDisable }){
  //const [quill,setQuill] = useState()
  const { baseUrl , formdata, setFormdata , quill , setQuill } = useContext(Context)
  
  /*
  const handleUpload = async (e) =>{
    e.preventDefault()
    const d = quill.getContents()
    const quillToPdfConfig = {
        exportAs: 'blob'
      };
    
    const pdfAsBlob = await pdfExporter.generatePdf(d, quillToPdfConfig )
    const data = {blob : pdfAsBlob }
    axios.post(`${baseUrl}/save_pdf_in_backend`, data, config )
  }
  */
      const containerRef = useCallback(()=>{
        const q = new Quill('#container', {
          theme : 'snow',
          modules : {
            toolbar:{ 
              container : TOOLBAR_OPTIONS
            }
          }
        })
    
        //q.insertText(100, 'Hello', 'bold', true);
        //q.setContents(deltaa)
        //q.disable()
        
        if(!formdata.delta_data){
          q.insertText(0 , fulldate , 'bold' , true)
        }else{
          q.setContents(formdata.delta_data)
        }
        
        setQuill(q)
      },[]) 
    
  
  
  return <div class=''>
  <div class='w-20'>
    { disable? 
    <button class='m-2 p-2 bg-blue-400 rounded' onClick={()=>{
      quill.enable()
      setDisable(false)
    }}> Edit </button>
    :
    <button class='m-2 p-2 bg-blue-400 rounded' onClick={()=>{
      quill.disable()
      setDisable(true)
      const d = quill.getContents()
      const data = { ...formdata, delta_data : d }
      setFormdata(data)
    }}> Done </button>
    }
  </div>
  

  <div class=' m-3 bg-gray-200 rounded border-2 border-black'>
    <div id='container' ref={containerRef} ></div>
  </div>
  
  
  
  </div>
}



/*
const deltaa = {"ops":[{insert:"Bhone"},{ attributes:{bold:true},insert:"5.4.2023Text"},{attributes:{link:"https://www.google.com"},insert:"Google"},{insert:{image:"https://octodex.github.com/images/labtocat.png"}},{insert:"\n"},{insert:{video:"https://www.youtube.com/embed/tgbNymZ7vqY"}}]}
*/