import React from 'react'
import { ModeToggle } from './toggleMode'
import Image from 'next/image'
import GlobalSearch from './search/globalSearch'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Link from 'next/link'
import MobileNav from './mobile-nav'

const Navbar = () => {
  return (
    <nav className=' bg-primary-foreground flex items-center justify-center fixed z-50 w-full gap-5 p-6 shadow-md sm:px-12'>
      <Link href="/" className='flex items-center gap-1'>
        <Image
          src="/assets/icons/Logo.svg"
          width={35}
          height={35}
          alt='ConnectCraft'
        />
        <p className='p-2 font-bold text-primary max-sm:hidden'>Connect
          <span className='text-violet-900 font-bold p-1'>Craft</span>
        </p>
      </Link>

      {/* globalSearch */}
      <GlobalSearch />

      {/* modeToggle */}
      <div className='hidden md:flex gap-3'>
        <ModeToggle />
        <SignedIn>
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: 'h-10 w-10'
              },
              variables: {
                colorPrimary: "#311362"
              }
            }}
          />
        </SignedIn>
      </div>

      <MobileNav />
    </nav>
  )
}

export default Navbar