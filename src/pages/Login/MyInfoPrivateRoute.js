import React from 'react'
import MyInfoPage from '../Userpage/MyInfoPage'
import { Navigate } from 'react-router-dom'

const MyInfoPrivateRoute = ({authenticate}) => {
  return (
    authenticate === true ? <MyInfoPage /> : <Navigate to="/login" />
  )
}

export default MyInfoPrivateRoute