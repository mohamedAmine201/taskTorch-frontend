import React from 'react'
import {motion} from 'framer-motion'
import heroBg from '../assets/heroBg.jpg'

const Hero = () => {
  return (
    <section>
      <div className='container mx-auto p-4 mt-6'>
        <motion.h1 className='text-center text-3xl md:text-5xl text-gray-800'
        initial={{y: '-100vh', opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{type: 'spring', stiffness: 60, delay: 0.3}}
        >
          Take <span className='bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent font-bold'>
            Control</span> of Your Day <p className='mt-2'>with
            <span className='bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent font-bold'>
            TaskTorch</span></p>
          </motion.h1>
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start mt-5 md:mt-10'>
          <motion.div
          initial={{y: '100vh', opacity: 0}}
          animate={{y: 0, opacity: 1}}
          transition={{type: 'spring', stiffness: 60, delay: 0.3}}
          >
            <h3 className='mt-10 font-bold text-2xl mb-2'>Organize smarter, achieve faster, and never lose track of what matters.</h3>
            <p className='mb-10 md:mb-20'>Manage tasks with ease using smart reminders and a clean, responsive interface.
               From daily errands to big projects, TaskTorch helps you stay organized, focused,
               and motivated—so you can achieve more with less stress.</p>
              <h3 className='font-bold text-2xl mb-2'>Turn intentions into achievements—one task at a time.</h3>
            <p className='mb-6'>TaskTorch is built to help you reclaim your time and focus on what truly matters. With smart reminders, seamless organization, and a beautifully responsive interface, it transforms your daily chaos into a clear, actionable plan.
               Whether you're managing personal goals or professional deadlines,
                TaskTorch keeps you moving forward—one task at a time.</p>
          </motion.div>
          <motion.img src={heroBg} className='w-[400px] rounded-lg ml-4'
          initial={{x:'100vw', opacity: 0}}
          animate={{x:0, opacity: 1}}
          transition={{type: 'spring', stiffness: 60, delay: 0.3}}
          />
        </div>
      </div>
    </section>
  )
}

export default Hero