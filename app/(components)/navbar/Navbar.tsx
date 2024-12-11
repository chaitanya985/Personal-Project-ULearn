'use client';

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {User} from '@prisma/client'
import { SafeUser } from '@/app/types';
import { MdShoppingCart } from 'react-icons/md';
import UserMenu from './UserMenu';
import { useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useRouter } from 'next/navigation';


interface UserMenuProps {
    myUser: SafeUser | null;
    basketItem: any
}

function Navbar({myUser, basketItem}: UserMenuProps) {
    const [userMenu, setUserMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    const params = useSearchParams();
    const router = useRouter();

    const closeUserMenu = () =>{
        setUserMenu(false);
    }

    const onSearch = (e: React.FormEvent)=>{
        e.preventDefault();
        
        if (!searchQuery.trim()) {
            router.push('/');
            return;
        }

        let currentQuery = {};
        if (params) {
            currentQuery = qs.parse(params.toString())
        }
        const updatedQuery:any = {
            ...currentQuery,
            result: searchQuery
        }
        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, {skipNull: true})
        router.push(`/search/${url}`)
    }
  return (
    <div className='shadow-xl bg-white'>
        <div className='p-3 px-4'>
            <div className='flex items-center justify-between gap-2'>
                <div className='flex items-center'>
                    <Link href='/'>
                        <Image src='/images/logo.png' alt='logo' width={140} height={40}/>
                    </Link>
                </div>

                <form className='flex-1 hidden lg:flex justify-center' onSubmit={onSearch}>
                    <input 
                        type='text' 
                        className='w-[80%] p-3 bg-white rounded-full border-black border-[2px] outline-none' 
                        placeholder='Search for courses'
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </form>
                
                <div className='items-center gap-4 text-md px-2 hidden lg:flex'>
                    {/* <div>
                        <Link href='/business'>ULearn Business</Link>
                    </div> */}
                    <div>
                        <a href='/create'>Add your courses</a>
                    </div>
                    <div className='relative'>
                        <Link href='/cart'>
                            <MdShoppingCart className='h-6 w-6'/>
                        </Link>
                        <div className='absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center'>
                            {basketItem.length}
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-3'>
                    {!myUser && (
                        <>
                            <div>
                                <Link href='/login' className='text-black font-semibold hover:underline'>Login</Link>
                            </div>
                            <div>
                                <Link href='/register' className='text-black font-semibold hover:underline'>Register</Link>
                            </div>
                        </>
                    )}
                    {myUser && (
                        <div className='w-[30px] h-[30px] rounded-full bg-gray-300 flex items-center justify-center text-black cursor-pointer font-bold' onClick={() => setUserMenu(prev => !prev)}>
                            <span>{myUser.name.at(0)?.toUpperCase()}</span>
                        </div>
                    )}

                    {userMenu && (
                        <div className='absolute right-0 top-14 w-48 bg-white shadow-lg rounded-lg'>
                            <UserMenu currentUser={myUser}
                            closeUserMenu={closeUserMenu}/>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar