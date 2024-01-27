import React from 'react'
import { ModeToggle } from './toggleMode'

import { UserButton } from '@clerk/nextjs'

const Navbar = () => {
  return (
    <div>Navbar
        <ModeToggle/>
        <UserButton />
    </div>
  )
}

export default Navbar