import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Login from '../pages/Login'
import PageWrapper from './PageWrapper'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<PageWrapper><Home/></PageWrapper>} />
        <Route path='/productDetails' element={<PageWrapper><ProductDetails/></PageWrapper>}/>
        <Route path='/login' element={<Login/>} />
      
    </Routes>
  )
}

export default AllRoutes
