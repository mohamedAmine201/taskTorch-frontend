import {Outlet} from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import React, {useState} from 'react'

const MainLayout = ({isAuthenticated, setIsAuthenticated}) => {
    return (
      <div>
          <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
          <Outlet context={{setIsAuthenticated}} />
          <Footer />
      </div>
    )
}

export default MainLayout