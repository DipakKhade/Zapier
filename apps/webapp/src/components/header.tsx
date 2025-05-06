'use client';

import Link from "next/link"
import { HoverButton, PrimaryButton } from "./buttons"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Header = () => {
    const [token, setToken] = useState<string | null>(null);
    const router = useRouter();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        }
    },[token]);
    return <>
        <div className="flex justify-around p-2 border border-b border-b-gray-400 h-16 z-10 fixed w-full bg-amber-50">
            <div className="text-3xl font-extrabold">
                <Link href={'/'}>
                <span className="text-orange-500">_</span>Zapier
                </Link>
            </div>

            {!token && <div className="flex space-x-4">
                <HoverButton>
                    <Link href={'/login'}>
                    Log in
                    </Link>
                </HoverButton>
                <PrimaryButton>
                    <Link href={'/sign-up'}>
                    Sign up
                    </Link>
                </PrimaryButton>
            </div>}

            {
                token && <div className="flex space-x-4">   
                    <PrimaryButton onClick={()=>{
                        localStorage.removeItem('token');
                        setToken(null);
                        router.push('/')
                    }}>
                        <Link href={'/'}>
                        Log out
                        </Link>
                    </PrimaryButton>
                    </div>
            }
        </div>
    </>
}