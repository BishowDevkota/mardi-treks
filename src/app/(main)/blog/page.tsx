import SubHero from '@/components/SubHeroComponent'
import BlogPage from '@/components/Blog/BlogPage'
import React from 'react'

const Blog = () => {
  return (
    <div><SubHero siteTitle="Blog" backgroundImage='/images/slide3.jpg' />
    <BlogPage />
    </div>
  )
}

export default Blog