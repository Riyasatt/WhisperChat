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
    <nav className='p-4 md:p-6 shadow-md bg-slate-900 text-white sticky top-0 z-50'>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a className='text-xl font-bold mb-4 md:mb-0' href="/">Whisper Chat</a>
            {
                session ? (
                    <>
                        <span className='mr-4'>
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