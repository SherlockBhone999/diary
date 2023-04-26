

export default function List({list, setItemToFetch}){
  
  
  return <div class='m-4 p-2 bg-gray-200'>
    {list.map(day => <div>
      <div class=''>
        <button onClick={()=>setItemToFetch(day)}>
          <p class='flex justify-start mt-2'>{day.day}</p>
          <div class='m-1 mt-0 p-2 pt-1 text-2xs flex justify-center '>{day.reason}</div>
        </button>
        <hr class='h-1 bg-black' />
      </div>
    </div>)}
  </div>
}