import React from 'react'
import Footer from '../components/footer'




import { Link, Outlet } from 'react-router-dom'
import Header from '../components/Header'



function Auth() {
  return (
    <div>
       <Header/>
     <Outlet/>
     <Footer/>
  
</div>
  )
}

export default Auth
