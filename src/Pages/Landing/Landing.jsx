import React from 'react'
import LayOut from '../../LayOut/LayOut'
import Carousol from '../../Components/Carousel/CarouselEffect'
import Category from '../../Components/Category/Category'
import Product from '../../Components/Product/Product'

function Landing() {
  return (
    <LayOut>
        <Carousol />
        <Category />
        <Product />
      
    </LayOut>
  )
}

export default Landing
