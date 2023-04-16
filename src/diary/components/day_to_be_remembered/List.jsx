

export default function List({list}){
  return <div>
    {list.map(day => <div>
      <button >{day.day}</button>
    </div>)}
  </div>
}