import React from 'react'
//import classes from './home.module.css'
import Navbar from '../../componets/navbar/navbar'
 import Categories from '../../componets/categories/categories'
 import Footer from '../../componets/footer/footer'
//import Newsletter from '../../componets/newsletter/newsletter'
import FeaturedBlogs from '../../componets/featuredBlogs/featuredblog'

const home = () => {
  return (
    <div>
      <Navbar/>
      <FeaturedBlogs />
      <Categories />
      {/* <Newsletter /> */}
      <Footer />
    </div>
  )
}

export default home
