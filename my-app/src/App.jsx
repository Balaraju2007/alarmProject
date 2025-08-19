import { useState } from 'react'
import './App.css'
import Body from './assets/Body.jsx'


const Header = () => {
  return (
      <header>
       <h1 className='p-4 text-center text-2xl w-[50%] border border-blue-700 m-auto'> Alarm </h1> 
      </header>
  )
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    <main className='text-center h-full mt-4 '>
      <div className='bg-color-blue-500 border border-black-500 w-[40%] m-auto h-[30rem] p-4 rounded-2xl'>
          <Header />
          <Body />
      </div>
      </main>
    </>
  )
}

export default App
