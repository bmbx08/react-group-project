import React from 'react'
import ItemDetailPage from '../ItemDetail/ItemDetailPage'
import { Navigate, useLocation } from 'react-router-dom'

const ItemDetailPrivateRoute = ({ authenticate }) => {
    const location = useLocation()

    return (
        authenticate ? (
            <ItemDetailPage />
        ) : (
            <Navigate to="/login" state={{ from: location }} />
        )
    );
}

export default ItemDetailPrivateRoute 