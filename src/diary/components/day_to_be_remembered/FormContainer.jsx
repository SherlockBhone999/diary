import { useState , useEffect, useContext } from 'react'
import { Context } from '../../Diary'
import TextWriter from '../writer/TextWriter'
import axios from 'axios'

const deleteSubmit = (baseUrl , formdata ) => {
  axios.post(`${baseUrl}/delete_day_to_be_remembered`, {_id : formdata._id })
}

const DeleteBox = ({setShowDeleteBox}) => {
  const { baseUrl , formdata } = useContext(Context)
  
  return <div class='text-white'>
    <div class='flex justify-center text-xl'> Are you sure ?</div>
    <div class='flex justify-center'>
      
        <button onClick={()=>{
          deleteSubmit(baseUrl, formdata)
          setShowDeleteBox('hidden')
        }} class='bg-red-500 p-2 m-2 w-20 rounded'> yes </button>
        <button onClick={()=>{
          setShowDeleteBox('hidden')
        }} class='bg-gray-300 p-2 m-2 w-20 rounded'> no </button>
      
    </div>
  </div>
}


const updateSubmit = (baseUrl, formdata) => {
  axios.post(`${baseUrl}/update_day_to_be_remembered`, formdata )
}

export default function FormContainer () {
  const [ editDisabled , setEditDisabled ] = useState(false)
  const { quill, formdata , setFormdata , baseUrl } = useContext(Context)
  const [ showDeleteBox , setShowDeleteBox ] = useState('hidden')
  
  return <div class='relative'>
 
  <div id="necessary_for_delbox_to_cover_this_div">
    <div class=' relative'>
   
      <TextWriter disable={editDisabled} setDisable={setEditDisabled} />
      <button class='bg-red-500 m-2 p-2 rounded absolute top-0 left-20' onClick={()=>setShowDeleteBox('')}> delete </button>
    </div>
    
    <div class='bg-gray-200 p-4 m-3'>
      <input type='text' placeholder='...short reason' class='w-full rounded p-2 border-2 border-black' 
      disabled={editDisabled} value={formdata.reason} 
      onChange={(e)=>{
        const data = { ...formdata, reason : e.target.value }
        setFormdata(data)
      }}/>
    </div>
    
    
    { !editDisabled ? null : 
      <div class=' h-20 bg-black text-white m-2 p-2 rounded-lg flex justify-center'>
        <button onClick={()=>updateSubmit(baseUrl, formdata )}>submit</button>
      </div>
    }
  </div>
  
  <div class={`bg-black bg-opacity-60 absolute top-0 right-0 w-full h-full flex justify-center items-center ${showDeleteBox}`}> 
      <DeleteBox setShowDeleteBox={setShowDeleteBox}/>
  </div>
  
  </div>
}