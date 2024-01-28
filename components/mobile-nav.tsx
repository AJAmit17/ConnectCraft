"use client"

import {
    Sheet,
    SheetContent,
    SheetClose,
    SheetTrigger,
} from "@/components/ui/sheet"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { SignedOut } from "@clerk/nextjs"
import { Button } from "./ui/button"
import { sidebarLinks } from "@/constants/sidebarlinks"
import { usePathname } from "next/navigation"

const NavContent = () => {
    const pathname = usePathname()

    return (
        <section className="flex h-full flex-col gap-6 pt-16">
            {sidebarLinks.map((item) => {
                const isActive = (pathname.includes(item.route) && item.route.length > 1) || pathname === item.route;
                return (
                    <SheetClose asChild key={item.route}>
                        <Link
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
                            <p className=" font-bold">{item.label}</p>
                        </Link>
                    </SheetClose>
                )
            })}
        </section>
    )
}
const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <HamburgerMenuIcon width={24} height={24} className="p-[2px]" />
            </SheetTrigger>
            <SheetContent side="left" className="border-none bg-secondary">
                <Link href="/" className='flex items-center gap-1'>
                    <Image
                        src="/assets/images/site-logo.svg"
                        width={23}
                        height={23}
                        alt='ConnectCraft'
                    />
                    <p className=' font-bold text-primary max-sm:hidden'>Connect
                        <span className=' text-violet-900 font-bold'>Craft</span>
                    </p>
                </Link>
                <div className="no-scrollbar flex h-[calc(100vh-80px)] flex-col justify-between overflow-y-auto">
                    <SheetClose asChild>
                        <NavContent />
                    </SheetClose>

                    <SignedOut>
                        <div className="flex flex-col gap-3 mt-4 justify-end">
                            <SheetClose asChild>
                                <Link href='sign-in'>
                                    <Button className="w-full p-2 min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                                        <span>Sign In</span>
                                    </Button>
                                </Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <Link href='sign-up'>
                                    <Button className="w-full p-2 min-h-[41px] rounded-lg px-4 py-3 shadow-none">
                                        <span>Sign Up</span>
                                    </Button>
                                </Link>
                            </SheetClose>
                        </div>
                    </SignedOut>
                </div>
            </SheetContent>
        </Sheet>

    )
}

export default MobileNav