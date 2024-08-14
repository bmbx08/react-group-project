import React from 'react'
import './Homepage.style.css'
import WeeklyItem from './Slide/WeeklyItem'
import Banner from './Banner/Banner'
import ItemCard from './ItemCard/ItemCard'

const Homepage = () => {
  return (
    <div>
      <Banner />
      <WeeklyItem />
      <ItemCard />
    </div>
  )
}

export default Homepage
