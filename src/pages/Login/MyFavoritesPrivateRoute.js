import React from 'react'
import MyFavoritesPage from '../Userpage/MyFavorites/MyFavoritesPage'
import { Navigate } from 'react-router-dom'

const MyFavoritesPrivateRoute = ({authenticate}) => {
    return (
        authenticate == true ? <MyFavoritesPage /> : <Navigate to="/login" />
    )
}

export default MyFavoritesPrivateRoute
