import { useState, useEffect, useContext , useCallback } from 'react'
import axios from 'axios'
import {Context} from '../Diary'
import Quill from 'quill'
import "quill/dist/quill.snow.css"


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
  

const fetchDaylist = (baseUrl, setDaylist) => {
  axios.get(`${baseUrl}/get_day_to_be_remembered`)
  .then(res=>setDaylist(res.data))
}



const Sidepage = ({sidepage, setSidepage}) => {
  const [quill,setQuill] = useState()
  const { baseUrl } = useContext(Context)
  
  const containerRef = useCallback(()=>{
    const q = new Quill('#container', {
      theme : 'snow',
      modules : {
        toolbar:{ 
          container : TOOLBAR_OPTIONS
        }
      }
    })
    setQuill(q)
  },[])
  
  
  return <div>

  <div class={`fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-80 flex justify-center ${sidepage.style}`}>
    
    <div class='bg-white p-2 rounded fixed top-80 w-4/6'>
        <button onClick={()=>{ 
          const data = { ...sidepage, style : 'hidden'}
          setSidepage(data)
        }} class='m-2 p-2 bg-blue-200'>back </button>
        
        {sidepage.editDisable === true ?
          <button onClick={()=>{
            const data = {...sidepage, editDisable : false }
            setSidepage(data)
          }} class='m-2 p-2 bg-blue-200'>edit</button>
        : null
        }
        
        <button onClick={()=>{quill.setContents(sidepage.chosenDay.delta_data)}}>load delta</button>
        
        <p>{sidepage.chosenDay.day}</p>
    
        <textarea value={sidepage.chosenDay.reason} disabled={sidepage.editDisable} 
          onChange={(e)=>{
            const data = {...sidepage.chosenDay, reason : e.target.value}
            const dataa = { ...sidepage, chosenDay : data }
            setSidepage(dataa)
          }}
        class='bg-gray-100' />
          
        <div id='container' ref={containerRef}></div>
          
        <button onClick={()=>{
          const newDelta = quill.getContents()
          const data = {...sidepage.chosenDay , delta_data : newDelta }
          axios.post(`${baseUrl}/update_day_to_be_remembered`, data)
        }} class='m-1 p-2 bg-blue-400 rounded'>submit</button>
        
        <button class='m-1 p-2 bg-red-400 rounded' onClick={()=>{
          const data = { _id : sidepage.chosenDay._id }
          axios.post(`${baseUrl}/delete_day_to_be_remembered`, data)
        }}>delete</button>
        
    </div>
  </div>
  
  </div>
}

export default function DayToBeRememberedList(){
  const { baseUrl } = useContext(Context)
  const [daylist, setDaylist ] = useState([])
  const [ sidepage , setSidepage ] = useState({
      style : 'hidden', 
      chosenDay : { day : '' , reason : '' , delta_data : []},
      editDisable : true
    })
  
  useEffect(()=>{
    fetchDaylist( baseUrl, setDaylist)
  },[])
  
  return <div>
  
  <div>
    {daylist.map(obj => <div>
      <p>{obj.day}</p>
      <p class='m-2 p-2 border-2 border-black rounded'>{obj.reason}</p>
      <button onClick={()=>{
        const data = { style : '', chosenDay : obj , editDisable : true }
        setSidepage(data)
      }} class='bg-blue-200 m-1 p-2' > read </button>
    </div>)}
  </div>
  
  <Sidepage sidepage={sidepage} setSidepage={setSidepage}/>
  
  </div>
}