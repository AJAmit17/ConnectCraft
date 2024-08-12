"use client"

import React from 'react'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { sidebarLinks } from "@/constants/sidebarlinks"
import { SignedOut, useAuth } from '@clerk/nextjs';
import { Button } from './ui/button';
import {
  Home,
  User,
  UsersRound,
  Star,
  Tags,
  Computer,
  LogIn,
  UserPlus,
  BriefcaseIcon
} from 'lucide-react';

const LeftSideBar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();

  return (
    <section className='bg-primary-foreground sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto p-6 pt-36 shadow-white-300 dark:shadow-none max-sm:hidden lg:w-[290px] border-r-2'>
      <section className="flex h-full flex-col gap-6 pt-16">
        {sidebarLinks.map((item) => {
          const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;

          if (item.route === "/profile") {
            if (userId) {
              item.route = `/profile/${userId}`;
            } else {
              return null;
            }
          }
          
          let icon = null;
          switch (item.route) {
            case '/':
              icon = <Home />;
              break;
            case '/community':
              icon = <UsersRound />;
              break;
            case '/collection':
              icon = <Star />;
              break;
            case '/tags':
              icon = <Tags />;
              break;
            case `/profile/${userId}`:
              icon = <User />;
              break;
            case '/ask-questions':
              icon = <Tags />;
              break;
            case '/experiments':
              icon = <Computer />;
              break;
            case "/jobs":
              icon = <BriefcaseIcon/>;
              break;
            default:
              icon = null;
          }

          return (
            <Link
              key={item.route}
              href={item.route}
              className={`${isActive ? "bg-violet-600" : ""}
                                flex items-center gap-4 p-4  rounded-lg
                            `}
            >
              {icon} {/* Render the icon */}
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
                <LogIn />
                <span className='p-2'>Sign In</span>
              </Button>
            </Link>
          </div>
          <div>
            <Link href='sign-up'>
              <Button className="w-full p-2 min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                <UserPlus />
                <span className='p-2'>Sign Up</span>
              </Button>
            </Link>
          </div>
        </div>
      </SignedOut>
    </section>
  )
}

export default LeftSideBar