import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-black  flex justify-center py-5'>
        made with ❤️ by &nbsp; <Link target='_blank' href='https://github.com/Riyasatt/WhisperChat' className='underline'>Riyasat</Link>
    </div>
  )
}

export default Footer