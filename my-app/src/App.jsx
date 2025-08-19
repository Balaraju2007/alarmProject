import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header className="text-[400%] font-bold text-blue-600 mb-4">
        Alarm
      </header>
    </>
  )
}

export default App
