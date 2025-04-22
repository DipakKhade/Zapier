'use client';
import { useRef, useState } from "react";
import { PrimaryButton } from "./buttons";
import Link from "next/link";
import { PRIMARY_BACKEND_PORT } from "config/config";
import { signInType } from "common-types";
import { GoogleAuthButton } from "./google-auth-button";
import { Input } from "./input";

export const SignUpCard = () =>{
    const [ username, SetUsername ] = useState<string>('');
    const [ email, SetEmail ] = useState<string>('');
    const [ password, SetPassword ] = useState<string>('');
    const [ loading , setLoading ] = useState<boolean>(false);

    const usernameRef = useRef(username);
    const emailRef = useRef(email);
    const passwordRef = useRef(password);

    const handleSignUp = async () => {
        if (!username) {
            (usernameRef.current as unknown as HTMLInputElement).focus();
            return;
        }else if(!email){
            (emailRef.current as unknown as HTMLInputElement).focus();
            return;
        }else if(!password){
            (passwordRef.current as unknown as HTMLInputElement).focus();
            return;
        }
        setLoading(true);
        const payload : signInType = {
            username,
            email,
            password,
        }
        await fetch(`http://localhost:${PRIMARY_BACKEND_PORT}/api/v1/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payload
            }),
        });
        setLoading(false);
    }
    return <div className="border border-gray-500 w-[28vw] h-[70vh] rounded-sm flex flex-col align-middle content-center">
        <GoogleAuthButton  title="Sign up with Google"/>
        <div className="flex">
            <hr className="border-t-[1px] border-gray-500 w-48 mx-auto my-4" />
            <span className="text-gray-600 font-semibold">OR</span>
            <hr className="border-t-[1px] border-gray-500 w-48 mx-auto my-4" />
        </div>
        <div className="flex flex-col p-4">
            <Input ref={usernameRef} placeholder="Enter Username" type="text" onChange={e =>{
                SetUsername(e.target.value)
            }}/>
            <Input ref={emailRef} placeholder="Enter Email" type="text" onChange={e =>{
                SetEmail(e.target.value)
            }}/>
            <Input ref={passwordRef} placeholder="Enter Passowrd" type="password" onChange={e =>{
                SetPassword(e.target.value)
            }}/>

            <PrimaryButton disabled={loading} classNames="rounded-sm" onClick={handleSignUp}> <div className="p-3">
            Get started for free
            </div>
            </PrimaryButton>
            <div className="justify-center pt-2">
            By signing up, you agree to Zapier&apos;s <Link className="text-blue-600 underline" href={'/terms'}><span>Terms of Service</span></Link> and <Link className="text-blue-600 underline" href={'/privacy'}><span>Privacy Policy</span></Link>
            </div>
            <div className="justify-center pt-2 content-center flex ">
            Already have an account? <Link className="text-blue-600 underline" href={'/login'}><span>Log In</span></Link>
            </div>
        </div>
        </div>
}

