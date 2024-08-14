import React from 'react'
import { Outlet } from 'react-router-dom'

const AppLayout = () => {
  return (
    <div style={{color:'white'}}>
      navbar here
      <Outlet/>
    </div>
  )
}

export default AppLayout