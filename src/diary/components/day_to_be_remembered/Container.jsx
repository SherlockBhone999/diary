import List from './List'
import { useState } from 'react'

export default function Container ({list}) {
  const [formdata , setFormdata ] = useState(null)
  return <div>
  <List list={list} />
  </div>
}