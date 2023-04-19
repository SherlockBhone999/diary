import { useContext } from 'react'
import { Context } from '../../Diary'


const deltaa = {"ops":[{insert:"Bhone"},{ attributes:{bold:true},insert:"5.4.2023Text"},{attributes:{link:"https://www.google.com"},insert:"Google"},{insert:{image:"https://octodex.github.com/images/labtocat.png"}},{insert:"\n"},{insert:{video:"https://www.youtube.com/embed/tgbNymZ7vqY"}}]}


export default function List() {
  const { quill } = useContext(Context)
  return <div>
  
    list :
    <button onClick={()=>{
    quill.setContents(deltaa)
    }}>click</button>
  </div>
}