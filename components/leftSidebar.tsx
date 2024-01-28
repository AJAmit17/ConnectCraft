"use client"

import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from "@/constants/sidebarlinks"
import { SignedOut } from '@clerk/nextjs';
import { Button } from './ui/button';

const LeftSideBar = () => {
  const pathname = usePathname()

  return (
    <section className='bg-muted sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-36 shadow-white-300 dark:shadow-none max-sm:hidden lg:w-[360px]'>
      <section className="flex h-full flex-col gap-6 pt-16">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
          return (
              <Link
              key={item.route}
                href={item.route}
                className={`${isActive ? "bg-violet-600" : ""}
                                flex items-center gap-4 p-4  rounded-lg
                            `}
              >
                <Image
                  src={item.imageURL}
                  alt={item.label}
                  width={20}
                  height={20}
                />
                <p className={`${isActive ? "font-bold" : "font-medium"} max-lg:hidden`}>{item.label}</p>
              </Link>
          )
        })}
      </section>

      {/* Auth Options */}
      <SignedOut>
        <div className="flex flex-col gap-3 mt-4 justify-end">
          <div>
            <Link href='sign-in'>
              <Button className="w-full p-2 min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/account.svg"
                  width={14}
                  height={14}
                  alt='Profile'
                />
                <span>Sign In</span>
              </Button>
            </Link>
          </div>
          <div>
            <Link href='sign-up'>
              <Button className="w-full p-2 min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                <span>Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </SignedOut>
    </section>
  )
}

export default LeftSideBar