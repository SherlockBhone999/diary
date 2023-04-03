import Quill from 'quill'
import "quill/dist/quill.snow.css"
import {useCallback, useState, useEffect} from 'react'
import * as quillToWord from 'quill-to-word'
import axios from 'axios'




const TOOLBAR_OPTIONS = [ 
  [{ header: [1, 2, 3, 4, 5, 6, false] }], 
  [{ font: [] }], [{ list: "ordered" }, { list: "bullet" }], 
  ["bold", "italic", "underline"], 
  [{ color: [] }, { background: [] }], 
  [{ script: "sub" }, { script: "super" }], 
  [{ align: [] }], 
  ["image", "blockquote", "code-block"],
  ["clean"],
  ]

const config = {
  headers: {
    'content-type': 'multipart/form-data',
  },
};  
  

export default function TextWriter(){
  const [quill,setQuill] = useState()
  
  const handleUpload = async (e) =>{
    e.preventDefault()
    const delta = quill.getContents();
    const quillToWordConfig = {
        exportAs: 'blob'
      };
    const docAsBlob = await quillToWord.generateWord(delta, quillToWordConfig);
    
    
    
    axios.post('http://localhost:3000/', 
    {doc: docAsBlob } , config )
    .then(()=>console.log('document is sent'))
  }
  
  
  
  const containerRef = useCallback(()=>{
    const q = new Quill('#container', {
      theme : 'snow',
      modules : {toolbar:TOOLBAR_OPTIONS}
    })
    setQuill(q)
  },[])
  
  return <div>
  <form onSubmit={handleUpload} >
  <div id='container' ref={containerRef}></div>
 
 <button type='submit'>upload</button>
 
  </form>

  </div>
}