import { useState, useEffect, useContext } from 'react'
import { Context } from '../Diary'
import axios from 'axios'

export default function TagList () {
  const { taglist , baseUrl } = useContext(Context)
  const [ newTag, setNewTag ] = useState('')
  const [ isUpdateMode , setIsUpdateMode ] = useState({mode : false, id : ''})
  
  
  const change = (e) => {
    setNewTag(e.target.value)
  }
  
  const submitNew = () => {
    const data = { tag : newTag }
    axios.post(`${baseUrl}/create_tag`, data)
    setNewTag('')
    window.location.reload()
  }
  
  const update = (obj) => {
    setNewTag(obj.tag)
    const data = { mode : true , id : obj._id }
    setIsUpdateMode(data)
  }
  
  const submitUpdated = () => {
    const data = { tag : newTag , id : isUpdateMode.id }
    axios.post(`${baseUrl}/update_tag`, data )
    window.location.reload()
  }
  
  const deleteTag = (id) => {
    const data = { id : id}
    axios.post(`${baseUrl}/delete_tag`,data )
  }
  
  return <div>
  <div class='bg-gray-200 m-2 p-2 rounded flex'>
    <input type='text' value={newTag} onChange={change} />
    {isUpdateMode.mode?
      <button onClick={submitUpdated} class='bg-blue-200 p-2 m-2 rounded'>submit updated</button>
      :
      <button onClick={submitNew} class='bg-blue-200 p-2 m-2 rounded'>submit </button>
    }
  </div> 
  
  <div class=''>
    {taglist.map(obj => <div class='flex bg-gray-100'>
      <p class='m-2 p-2'>{obj.tag}</p>
      <button class='bg-green-200 m-2 p-2 rounded' onClick={()=>update(obj)}> update </button>
      <button class='bg-red-300 m-2 p-2 rounded' onClick={()=>deleteTag(obj._id)}> delete </button>
    </div>)}
  </div>
  </div>
}