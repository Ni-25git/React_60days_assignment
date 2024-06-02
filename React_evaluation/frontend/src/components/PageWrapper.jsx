import React from 'react'
import { Navigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContextProvider'

const PageWrapper = ({children}) => {
    const {authDetails} = useContext(AuthContext)

    if(!authDetails?.isAuthenticated){
        return <Navigate to="/login" />
    }
  return (
    children
  )
}

export default PageWrapper
