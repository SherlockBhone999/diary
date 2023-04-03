import Navbar from '../components/Navbar'
import Form from '../components/Form'
import {useState} from 'react'
import Notificationbar from '../components/Notificationbar'




const ChosenInterface = () =>{
  const [interfaceType, setInterfaceType] = useState('choose')
  
  return <div>
  {
    interfaceType==='choose'? <div>
    <Notificationbar />
    <button onClick={()=>setInterfaceType('write')}>Write</button> 
    
    </div> : <div>
    <Form setInterfaceType={setInterfaceType} />
    </div>
    
  }
  </div>
  
}


function Homepage(){

  
  return <div>
  <Navbar/>
  <ChosenInterface />
  </div>
}

export default Homepage