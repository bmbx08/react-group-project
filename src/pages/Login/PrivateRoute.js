import React from 'react'
import ItemDetailPage from '../ItemDetail/ItemDetailPage'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ authenticate }) => {
    return (
        authenticate == true ? <ItemDetailPage /> : <Navigate to="/login" />
    )
}

export default PrivateRoute