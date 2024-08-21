import React from 'react'
import MyCartPage from '../Userpage/MyCartPage'
import { Navigate } from 'react-router-dom'

const MyCartPrivateRoute = ({ authenticate }) => {
    return (
        authenticate == true ? <MyCartPage /> : <Navigate to="/login" />
    )
}

export default MyCartPrivateRoute