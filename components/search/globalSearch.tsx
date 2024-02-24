"use client"

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils'
import GlobalResult from './globalResult'

const GlobalSearch = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const searchContainerRef = useRef(null);

    const query = searchParams.get("q");

    const [search, setSearch] = useState(query || "");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (
                searchContainerRef.current &&
                // @ts-ignore
                !searchContainerRef.current?.contains(event.target)
            ) {
                setIsOpen(false);
                setSearch("");
            }
        };

        setIsOpen(false);
        document.addEventListener("click", handleOutsideClick);

        return () => {
            document.removeEventListener("click", handleOutsideClick);
        };
    }, [pathname]);


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "global",
                    value: search,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if (query) {
                    const newUrl = removeKeysFromQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["global", "type"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [search, pathname, router, searchParams, query]);
    
    return (
        <div className=' relative w-full max-w-[600px] max-lg:hidden' ref={searchContainerRef}>
            <div className=' relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4'>
                <Image
                    src="/assets/icons/search.svg"
                    alt='Search'
                    width={24}
                    height={24}
                    className=' cursor-pointer text-transparent'
                    loading='lazy'
                />
                <Input
                    type='text'
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);

                        if(!isOpen) setIsOpen(true);
                        if(e.target.value === "" && isOpen) setIsOpen(false);
                    }}
                    placeholder='Search Gloabally..'
                    className='bg-input flex h-9 w-full rounded-md border border-slate-200 px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 border-none shadow-none outline-none'
                />
            </div>

            {isOpen && <GlobalResult />}
        </div>
    )
}

export default GlobalSearch;