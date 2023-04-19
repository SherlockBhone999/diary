

export default function List({list, setItemToFetch}){
  
  
  return <div class='m-4 p-2 grid bg-gray-200'>
    {list.map(day => <div>
      <div class='flex'>
        <button onClick={()=>setItemToFetch(day)}>{day.day}</button>
        <p class='m-1 p-2'>{day.reason}</p>
      </div>
    </div>)}
  </div>
}