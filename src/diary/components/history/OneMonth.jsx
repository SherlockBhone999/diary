

const colors = ['bg-green-500','bg-yellow-300','bg-orange-500','bg-sky-400','bg-rose-400', 'bg-indigo-500']

const OneMonth = ({month, setChosenMonth, setPieChartLabels}) => {
  
  const updatePieChartLabels = () => {
    const arrayOfCounts = []
    month.pie_data.map(tagobj => {
      arrayOfCounts.push(tagobj.count)
    })
    arrayOfCounts.sort((a,b)=>{
     return b-a
    })
    const arrayOfCountsWithoutDuplicates = []
    arrayOfCounts.map(num => {
      if(!arrayOfCountsWithoutDuplicates.includes(num)){
        arrayOfCountsWithoutDuplicates.push(num)
      }
    })
    const objsArray = []
    arrayOfCountsWithoutDuplicates.map(num =>{
      month.pie_data.map((obj, index) => {
        if(num === obj.count ){
          const item = {
            tag : obj.tag,
            count : obj.count.toString(),
            color : colors[index]
          }
          console.log(num + obj.count.toString())
          objsArray.push(item)
        }
      })
    })
    console.log(objsArray)
    setPieChartLabels(objsArray)
  }
  
  
  return <div class='flex bg-blue-200 m-1 justify-center'>
    <button onClick={()=>{
      setChosenMonth(month)
      setPieChartLabels([])
      updatePieChartLabels()
    }} class='w-full p-2'>{month.month}</button>
  </div>
}

export default OneMonth