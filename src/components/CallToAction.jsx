import React from 'react'
import {Link} from 'react-router-dom'
import Card from './Card'

const CallToAction = () => {
  return (
    <section>
      <div className='container mx-auto p-4 mt-10'>
        <Card className='flex flex-col justify-center items-center'>
          <h2 className='text-xl text-center md:text-2xl'>Boost your productivity—create your to-do list in seconds!</h2>
          <Link 
          className='mt-4 p-4 font-bold border rounded-lg hover:bg-white hover:text-stone-700 hover:border-transparent'
          to='tasks/'
          >
            Get Started
          </Link>
        </Card>
      </div>
    </section>
    
  )
}

export default CallToAction