import {useNavigate} from 'react-router-dom'
import PieChart from '../PieChart'


const ChartForTheMonth = ({chosenMonth, pieChartLabels}) => {
  const navigate = useNavigate()
  return <div class='flex '>
    <div class='bg-gray-200 w-80 h-80  mr-2 overflow-scroll relative' >
      <p>{chosenMonth.month}</p>
      <p>resolution : {chosenMonth.resolution}</p>
      <p>resolution_fullfilled : {chosenMonth.resolution_fulfilled}</p>
      
      <div>
        <p>my_comment :</p>
        <textarea value={chosenMonth.comment}/>
      </div>
      
      <div class='grid'>
        <p>my thoughts during the month : </p>
        {
          chosenMonth.thoughts.map(str => <p>
            {str}
          </p>)
        }
      </div>
      
      <div class='absolute bottom-0 right-0'>
        <a class='bg-red-600 text-white m-2 p-2 rounded' href="https://drive.google.com/file/d/1ynnMemPS17kE02O0vAnW83026PRQ6I7b/view" > Read </a>
      </div>
    </div>
    
    
    
    
    
    <div class='bg-gray-200 w-80 h-80 flex flex-auto overflow-scroll'>
      <div class='grid'>
        <PieChart pieData={chosenMonth.pie_data}/>
            
        <div>
          {pieChartLabels.map(item => 
            <div class='flex m-1'>
            <div class={`w-5 h-5 ${item.color}`}> </div>
            <p class='pl-2'>{item.tag}</p>
          </div>) }
        </div>
      </div>
    </div>
  </div>
}


export default ChartForTheMonth

