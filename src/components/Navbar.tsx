'use client'

import React from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import {User} from 'next-auth'
import { Button } from './ui/button'

const Navbar = () => {

    const {data : session} = useSession()
    const user : User= session?.user as User

  return (
    <nav className='py-4 md:py-6  bg-slate-900 text-white top-0 z-50 overflow-hidden '>
        <div className='container  flex justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0' href="/">Asli Feedback </a>
            {
                session ? (
                    <>
                        <span className=' hidden md:visible'>
                            Welcome {user?.username || user?.email} 
                        </span>
                        <Button className='text-white' variant='destructive' onClick={()=>signOut()}>
                            Logout
                        </Button>
                    </>
                ) : (
                    <>
                        <Link href="/sign-in"><Button className='w-full md:w-auto font-bold bg-btn text-white'>Login</Button></Link>
                    </>
                )
            }
        </div>
    </nav>
  )
}

export default Navbar