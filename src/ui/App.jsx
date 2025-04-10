import { useEffect, useState } from 'react'
import './App.css'
import Frame from './components/frame'
import {Routes, Route } from 'react-router'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import User from './pages/User'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Layout from './components/layout';
import Sidebar from './components/Sidebar'
import RegisterForm from './pages/Register'
import Login from './pages/Login'

function App() {
  // const [time, setTime] = useState(null)

  // useEffect(() => {
  //   const unsubscribe = window.electron.subscribeStatistics((stats) => {
  //     setTime(stats)
  //   })
  //   return unsubscribe
  // })

  return (
    <>
      <Frame />
      <Navbar />
      <Sidebar />
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />

          <Route path='/users' element={<User />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>

      <Footer />
    </>
  )
}

export default App
