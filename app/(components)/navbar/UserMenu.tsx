import { SafeUser } from '@/app/types'
import React from 'react'
import { User } from '@/app/constants'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { signOut } from 'next-auth/react'


interface UserMenuProps {
    currentUser: SafeUser | null
    closeUserMenu: () => void;
}
export default function UserMenu({currentUser, closeUserMenu}: UserMenuProps) {
    const router = useRouter()
  return (
    <div className='flex flex-col bg-white shadow-lg rounded-lg px-4 py-2 gap-6 absolute z-50 min-h-fit'>
        <div className='flex items-center gap-4'>
            <div>
                <span>{currentUser?.name?.at(0)?.toUpperCase()}</span>
            </div>
            <div className='flex flex-col gap-1'>
                <span>{currentUser?.name}</span>
                <span>{currentUser?.email}</span>
            </div>
        </div>
        <div className='flex flex-col gap-2'>
            {User.map((items)=>(
                <div 
                    key={items.name} 
                    onClick={closeUserMenu}
                    className='hover:bg-gray-500 rounded-md p-2 transition cursor-pointer'
                > 
                    <Link href={items.link} className='block w-full'>
                        {items.name}
                    </Link>
                </div>
            ))}
            <div className='border-black border-[1px] py-2 px-2 hover:bg-gray-100 rounded-md transition cursor-pointer'>
                <button onClick={() => signOut()} className='w-full text-left'>
                    Logout
                </button>
            </div>
        </div>
    </div>
  )
}
