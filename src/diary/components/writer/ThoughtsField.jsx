




const ThoughtsField = ({field, setField , disable }) => {
  
  const remove = (index) => {
    const arr=[...field]
    arr.splice(index, 1)
    setField(arr)
  }
  
  const add = () => {
    const arr = [...field]
    arr.push('')
    setField(arr)
  }
  
  const update =(e,index)=>{
    const input = e.target.value
    const arr = [...field]
    arr[index] = input
    setField(arr)
  }
  
  return <div>
    <div class='flex'>My Thoughts : 
    { disable ? null : <button onClick={add} >++</button> }
    </div>
    
    <div class='bg-gray-200 h-60 overflow-scroll m-2 rounded '>
      {
        field.map((str,index) => <div key={index} class='flex m-2 p-2'>
          <textarea value={str} onChange={(e)=>update(e,index)} class='flex-auto'/>
          { disable? null :
            <button class='bg-red-200 p-2 m-1' onClick={()=>remove(index)}> -- </button>
          }
        </div>)
      }
    </div>
    
  </div>
}

export default ThoughtsField