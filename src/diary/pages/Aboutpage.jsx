import Navbar from '../components/Navbar'
import {useNavigate} from 'react-router-dom'


function Aboutpage(){
  const navigate = useNavigate()
  
  
  return <div>
  <Navbar />
  
  <div>
    <button onClick={()=>navigate(-1)}>back</button>
  </div>
  I decided to build this project because it is incovenient to write diary in my phone app.
  I often wonder why time fly so fast, I don't remember how I live my days, especially in 2019, 2020, 2021 and 2022. So I decided to write diary in late 2022. From this project, I hope to be able to record my life and make improvements. Also possibly getting a job.
  </div>
}

export default Aboutpage