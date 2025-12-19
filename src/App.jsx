import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <div className='flex flex-col justify-between h-screen'>
        <Navbar />
        <Manager />
        <Footer />
      </div>
    </>
  )
}

export default App
