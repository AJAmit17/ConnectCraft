"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Input } from '../ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'

interface CustomInputProps {
    route: string
    iconPosition: string
    imgSrc: string
    placeholder: string
    otherClasses: string
}

const LocalSearch = ({
    route,
    iconPosition,
    imgSrc,
    placeholder,
    otherClasses
}: CustomInputProps) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const query = searchParams.get("q");

    const [search, setSearch] = useState(query || "");

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "q",
                    value: search,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (pathname === route) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["q"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [route, search, pathname, router, searchParams, query]);

    return (
        <>
            <div className={`bg-input flex min-h-[56px] grow items-center gap-4 rounded-lg px-4 ${otherClasses}`}>
                {iconPosition === 'left' && (
                    <Image
                        src={imgSrc}
                        alt='Search Icon'
                        width={28}
                        height={28}
                        className='cursor-pointer'
                    />
                )}

                <Input
                    type='text'
                    value={search}
                    placeholder={placeholder}
                    onChange={(e) => setSearch(e.target.value)}
                    className='no-focus flex-1 border-none shadow-none outline-none'
                />

                {iconPosition === "right" && (
                    <Image
                        src="/assets/icons/search.svg"
                        alt="seacrhIcon"
                        width={28}
                        height={28}
                        className="cursor-pointer"
                    />
                )}
            </div>
        </>
    )
}

export default LocalSearch