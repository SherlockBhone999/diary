
import Quill from 'quill'
import "quill/dist/quill.snow.css"
import {useCallback } from 'react'
import axios from 'axios'


 

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



function Writer({quill, setQuill ,formdata4DTBR}){
  

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
    q.setContents(formdata4DTBR.delta_data)
    setQuill(q)
  },[])
    
  
  
  return <div class=''>
  
  
  <div class='bg-gray-200 p-2'>
    <div class=' m-3 bg-gray-200 rounded border-2 border-black'>
      <div id='container' ref={containerRef} ></div>
    </div>
  </div>
  
  
  </div>
}



/*
const deltaa = {"ops":[{insert:"Bhone"},{ attributes:{bold:true},insert:"5.4.2023Text"},{attributes:{link:"https://www.google.com"},insert:"Google"},{insert:{image:"https://octodex.github.com/images/labtocat.png"}},{insert:"\n"},{insert:{video:"https://www.youtube.com/embed/tgbNymZ7vqY"}}]}
*/


export default Writer