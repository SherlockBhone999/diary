import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import DiaryContextProvider from './diary/DiaryContextProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <DiaryContextProvider />
    </div>
  )
}

export default App
