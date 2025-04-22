'use client';
import { useRef, useState } from "react";
import { GoogleAuthButton } from "./google-auth-button"
import { Input } from "./input"
import Link from "next/link";
import { PrimaryButton } from "./buttons";
import { verify } from "crypto";
import { PRIMARY_BACKEND_PORT } from "config/config";

export const LogInCard = () =>{
    const [ email, SetEmail ] = useState<string>('');
    const verifyEmail = async () => {
        const response = await fetch(`http://localhost:${PRIMARY_BACKEND_PORT}/api/v1/user/isValidEmail?email=${email}`);
        const data = await response.json();
        if(data.success){
            alert("email is valid")
        }
    }

    return  <div className="flex flex-col justify-center items-center space-y-10">
        <span className="text-slate-900 font-semibold text-2xl">Log in to your account</span>
        <div className="border border-gray-500 w-[28vw] h-[70vh] rounded-sm flex flex-col align-middle content-center">
            <GoogleAuthButton title="Continue with Google"/>
            <div className="flex">
                <hr className="border-t-[1px] border-gray-500 w-48 mx-auto my-4" />
                <span className="text-gray-600 font-semibold">OR</span>
                <hr className="border-t-[1px] border-gray-500 w-48 mx-auto my-4" />
            </div>
            <div className="flex flex-col p-4">
                <div>
                <label htmlFor="email" className="text-slate-900 font-semibold p-1">
                    Email
                    <span className="text-red-500 text-xl">*</span>
                </label> 
                <span>(required)</span>
                </div>
                <Input placeholder="Email" type="text" onChange={e =>{ 
                    SetEmail(e.target.value)
                }}/>

            <PrimaryButton disabled={!email} classNames="rounded-sm" onClick={verifyEmail}> <div className="p-3">
                Continue
            </div>
            </PrimaryButton>

            </div>

            <div className="justify-center pt-2 content-center flex ">
            Don&apos;t have an account? <Link className="text-blue-600 underline" href={'/sign-up'}><span>Sign Up</span></Link>
            </div>
    </div>
    </div>
}
  