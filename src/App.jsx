import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  console.log(import.meta.env.VITE_APPWRITE_URL);
  return (
    <>
      <h1 className='text-3xl text-orange-500 bg-gray-700 p-4 font-bold'>Let's Start</h1>
    </>
  )
}

export default App
