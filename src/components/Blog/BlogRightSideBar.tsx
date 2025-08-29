import React from 'react'
import Carousel from './RecentPost'
import GlassOfferCard from './Discount'
// import { Crouser } from './RecentPost'

const BlogRightSideBar = () => {
  return (
    <div className='flex sticky top-20 flex-col space-y-4'>
      <Carousel />
<GlassOfferCard />    </div>
  )
}

export default BlogRightSideBar