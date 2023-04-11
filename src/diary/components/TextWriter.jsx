
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import {useCallback, useState, useEffect} from 'react'
import axios from 'axios'
import { pdfExporter } from 'quill-to-pdf'



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


const deltaa = {"ops":[{insert:"Bhone"},{ attributes:{bold:true},insert:"5.4.2023Text"},{attributes:{link:"https://www.google.com"},insert:"Google"},{insert:{image:"https://octodex.github.com/images/labtocat.png"}},{insert:"\n"},{insert:{video:"https://www.youtube.com/embed/tgbNymZ7vqY"}}]}




export default function TextWriter({disable, setDisable}){
  const [quill,setQuill] = useState()
  const [delta , setDelta ] = useState({})
  const baseUrl = 'http://localhost:3000'
  //const [ disable, setDisable ] = useState(false)
  
  const handleUpload = async (e) =>{
    e.preventDefault()
    const d = quill.getContents()
    setDelta(d)
    const quillToPdfConfig = {
        exportAs: 'blob'
      };
    
    const pdfAsBlob = await pdfExporter.generatePdf(d, quillToPdfConfig )
    const data = {blob : pdfAsBlob }
    axios.post(`${baseUrl}/save_pdf_in_backend`, data, config )
  }
  
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
        setQuill(q)
      },[])
    
  
  
  return <div class=''>
  <div class='bg-rose-200 w-20 mt-4'>
    { disable? 
    <button class='m-2 p-2 bg-blue-400 rounded' onClick={()=>{
      quill.enable()
      setDisable(false)
    }}> Edit </button>
    :
    <button class='m-2 p-2 bg-blue-400 rounded' onClick={()=>{
      quill.disable()
      setDisable(true)
    }}> Done </button>
    }
  </div>
  
  <div class='bg-rose-200 p-2'>
    <div class=' m-3 bg-gray-200 rounded border-2 border-black'>
      <div id='container' ref={containerRef} ></div>
    </div>
  </div>
  
  {/*
  <div class='w-full fixed h-[9vh] bottom-0 left-0'>
    <div class='h-full bg-gray-400 m-3'>
      <button class='m-3 bg-blue-400 rounded p-2' onClick={handleUpload}>submit </button>
    </div>
  </div>
  */}
  
  </div>
}



