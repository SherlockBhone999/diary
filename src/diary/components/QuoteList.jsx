import { useState, useEffect, useContext } from 'react'
import { Context } from '../Diary'
import axios from 'axios'


export default function QuoteList () {
  const { baseUrl, quotelist } = useContext(Context)
  const [ newQuote, setNewQuote ] = useState({text : '', by_who : ''})
  const [ updateMode , setUpdateMode ] = useState(false)
  
  const changeText = (e) => {
    const data = {...newQuote, text : e.target.value }
    setNewQuote(data)
  }
  
  const changeByWho = (e) => {
    const data = {...newQuote, by_who : e.target.value }
    setNewQuote(data)
  }
  
  const submitNew = () => {
    axios.post(`${baseUrl}/create_quote`, newQuote )
    window.location.reload()
  }
  
  const update = (obj) => {
    setNewQuote(obj)
    setUpdateMode(true)
  }
  
  const submitUpdated = () => {
    axios.post(`${baseUrl}/update_quote`, newQuote )
    window.location.reload()
  }
  
  const deleteTag = (id) => {
    const data = { id : id}
    axios.post(`${baseUrl}/delete_quote`, data )
    window.location.reload()
  }
  
  return <div>
  <div class='bg-gray-200 m-2 p-2 rounded flex'>
    <input type='text' value={newQuote.text} onChange={changeText} />
    <input type='text' value={newQuote.by_who} onChange={changeByWho} />
    {updateMode?
      <button onClick={submitUpdated} class='bg-blue-200 p-2 m-2 rounded'>submit updated</button>
      :
      <button onClick={submitNew} class='bg-blue-200 p-2 m-2 rounded'>submit </button>
    }
  </div> 
  
  <div class=''>
    {quotelist.map(obj => <div class='flex bg-gray-100'>
      <p class='m-2 p-2'>{obj.text}</p>
      <p class='m-2 p-2'> --by-- {obj.by_who}</p>
      <button class='bg-green-200 m-2 p-2 rounded' onClick={()=>update(obj)}> update </button>
      <button class='bg-red-300 m-2 p-2 rounded' onClick={()=>deleteTag(obj._id)}> delete </button>
    </div>)}
  </div>
  </div>
}