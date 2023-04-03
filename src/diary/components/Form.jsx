import TextWriter from './TextWriter'
import {useState} from 'react'
import Select from 'react-select'
import {useForm, useController } from 'react-hook-form'

const happinessIndexOptions = [
  {value:10, label:'10%'},
  {value:20, label:'20%' },
  ]
  
const faketaglistdata = ['alone', 'aa', 'add', 'alert', 'array', 'arraybuffer', 'alert','arguments']


  
const TagSuggestion = ({newTag,setNewTag,setHide}) => {
  const list = faketaglistdata.filter(item=> item.includes(newTag)).slice(0,5)
  
  return <div> 
  { newTag===''? null : <div class=' bg-yellow-200'>
    {
      list.map(item => <button class='block'
      onClick={()=>{
        setNewTag(item)
        setHide('hidden')
      } }>{item}</button>)
    }
    </div>
  }
  </div>
}


const Tagbar = () => {
  const [taglist, setTaglist] = useState([])
  const [newTag, setNewTag] = useState('')
  const [hide,setHide] = useState('hidden')
  
  const handleNewTag = (e) =>{
    setHide('')
    setNewTag(e.target.value)
  }
  
  const handleAdd = () => {
    setTaglist([...taglist, newTag])
    setNewTag('')
  }
  
  const handleRemove = (item) => {
    const list = taglist.filter(n => n !== item)
    setTaglist(list)
    
  }
  
  return <div class='bg-gray-400 p-3'>
  <input type='text' onChange={handleNewTag} value={newTag}/>
  <button onClick={handleAdd}>add</button>
  
  <div class={hide} >
    <TagSuggestion newTag={newTag} setNewTag={setNewTag} setHide={setHide}/>
  </div>
  
  <div>
  {
    taglist.map(item=><div class='inline'>
      {item}
      <button class='bg-red-400 p-2'
      onClick={()=>handleRemove(item)}>x</button>
    </div>)
  }
  </div>
  
  </div>
}







const FormField = () => {
  const [formdata,setFormdata] = useState({})
  const [hideName, setHideName] = useState(true)
  const {register, handleSubmit} = useForm()
  const [happinessIndex, setHappinessIndex] = useState(0)
  
  const doSubmit = (data) => {
    console.log(data)
  }
  
  const plus = () =>{
    if(happinessIndex == 100 ) return
    setHappinessIndex(happinessIndex + 10)
  }
  
  const minus = () =>{
    if (happinessIndex == -100) return
    setHappinessIndex(happinessIndex - 10)
  }
  
  return <div class='bg-yellow-200'>
  
  <form onSubmit={handleSubmit(doSubmit)} >
  
  <div>
    <label>Happiness index:</label>
    <button onClick={plus} >plus</button>
    <div>{happinessIndex}</div>
    <button onClick={minus} >minus</button>
  </div>
  
    <Tagbar />
    
  <div>
    <label>Good things</label>
    <textarea {...register('goodthings')} />
  </div>
  
  <div>
    <label>Bad things</label>
    <textarea {...register('badthings')} />
  </div>
    
  <div>
    <label>lesson:</label>
      <textarea {...register('lesson')}/>
  </div>
  
  <div>
    <label>What's on my head</label>
    <textarea {...register('thoughts')} />
  </div>
  
  <div>
    To be remembered?
    <input type='checkbox' 
    {...register('toBeRemembered')}
    onChange={()=>{
      hideName?setHideName(false) :
      setHideName(true)
    } } />
  </div>
  
  {hideName? null : 
  <div>
  name:<input type='text' {...register('name')}/>
  </div>
  }
  <button type='submit'>Save</button>
  </form >
  </div>
}

export default function Form({setInterfaceType}){
  
  const [showForm,setShowForm] = useState(false)
  
  
  return <div>
  <button onClick={()=>setInterfaceType('choose')}>Back</button>
  
  <button onClick={()=>{
    showForm? setShowForm(false):setShowForm(true)
  }}> {showForm? 'hide Form':'show Form'}
  </button>
  {showForm? <FormField /> : null }
  
  <TextWriter />
  
  </div>
}

