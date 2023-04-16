

const ChartForTheYear = ({chosenYear}) => {
  return <div>
  { chosenYear === ''? null :
    <div class='bg-gray-200 aspect-square w-80 mr-2 overflow-scroll'>

        <div class='grid'>
          {chosenYear.days_of_the_year.map(day => <div class='flex'>
            <p>{day.day}</p>
            <p class='ml-5'>{day.reason}</p>
          </div>)}
        </div>
      
    </div>
  }
  </div>
}

export default ChartForTheYear