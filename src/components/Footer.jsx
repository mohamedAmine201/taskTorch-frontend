import React from 'react'
import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className='border border-purple-500 mt-8'>
      <div className='container mx-auto p-2 flex flex-col md:flex-row justify-between items-center'>
        <p className='mb-2'>
        Copyright © 2025 TaskTorch. All rights reserved.
        </p>
        <div className='flex justify-between item-center'>
          <a href="https://www.instagram.com/amine.ghedhaifi/"><FaInstagram className='text-xl mr-4'/></a>
          <a href="https://www.linkedin.com/in/amine-ghedhaifi-658a24394/"><FaLinkedin className='text-xl mr-4'/></a>
          <a href="https://www.facebook.com/profile.php?id=61578375166118"><FaFacebook className='text-xl'/></a>
        </div>
      </div>
    </footer>
  )
}

export default Footer