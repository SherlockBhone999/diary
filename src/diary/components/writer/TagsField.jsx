import {useState, useEffect, useContext , useRef } from 'react'
import { Context } from '../../Diary'


const TagsField = ({field, setField, disable }) => {
  const [newTag, setNewTag ] = useState('')
  const [recommandedList , setRecommandedList ] = useState([])
  const { taglist } = useContext(Context)
  const inputRef = useRef()
  
  const add = () => {
    const arr = [...field]
    arr.push(newTag)
    setField(arr)
    setNewTag('')
  }
  
  const remove = (index) => {
    console.log(index)
    const arr = [...field]
    arr.splice(index, 1)
    setField(arr)
  }
  
  const update = (e) => {
    const input = e.target.value
    setNewTag(input)
    const arr = taglist.filter(item => item.tag.includes(input) )
    setRecommandedList(arr)
  }
  
  const addRecommandedTag = (obj) => {
    const arr= [...field]
    arr.push(obj.tag)
    setField(arr)
    setNewTag('')
    setRecommandedList([])
    inputRef.current.focus()
  }
  
  useEffect(()=>{
    if(newTag===''){
      setRecommandedList([])
    }
  },[newTag])
  
  
  return (<div class=''>

  <p>Tags : </p>

  <div class='grid grid-cols-4 bg-gray-200 m-2 rounded h-60 overflow-scroll'>
  {
    field.map((str,index) => <div key={index} class='bg-blue-200 p-1 m-1 h-min overflow-scroll'>
      <p>{str}</p>
      { disable? null :
        <button onClick={()=>remove(index)} class='bg-red-200 p-2' > -- </button>
      }
    </div>)
  }
  </div>

  { disable? null :
    <div class='flex m-2 p-2'>
      <input type='text'  onChange={update} value={newTag} ref={inputRef} disabled={disable}/>
        <button onClick={add} disabled={disable }>++ </button>
    </div>
  }
  
  { recommandedList.length === 0 ? null :
    <div class='bg-gray-300 grid w-40 overflow-scroll m-2 rounded p-2 h-40 '>
      {
        recommandedList.map(obj => <div>
          <button onClick={()=>addRecommandedTag(obj)}>{obj.tag}</button>
        </div>)
      }
    </div>
  }
  
  </div>)
}

export default TagsField