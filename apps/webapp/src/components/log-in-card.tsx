'use client';
import { useState } from "react";
import { GoogleAuthButton } from "./google-auth-button"
import { Input } from "./input"
import Link from "next/link";
import { PrimaryButton } from "./buttons";
import { PRIMARY_BACKEND_URL } from "config/config";

export const LogInCard = () =>{
    const [ email, SetEmail ] = useState<string>('');
    const [ isValidEmail, SetIsValidEmail ] = useState<boolean>(false);
    const [ password, SetPassword ] = useState<string>('');
    const [ loading, setLoading ] = useState<boolean>(false);
    const verifyEmail = async () => {
        setLoading(true);
        const response = await fetch(`${PRIMARY_BACKEND_URL}/api/v1/user/isValidEmail?email=${email}`);
        const data = await response.json();
        if(data.success){
            setLoading(false);
            SetIsValidEmail(true);
        }
        setLoading(false);
    }

    const loginHandler = async () => {
        setLoading(true);
        const response = await fetch(`${PRIMARY_BACKEND_URL}/api/v1/user/signin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                payload:{
                    email,
                    password:password
                }
            }),
        });
        const data = await response.json();
        if(data.success){
            setLoading(false);
            window.location.href = "/app";
        }
        setLoading(false);
    }

    return  <>
    <div className="flex flex-col justify-center items-center space-y-10">
    <span className="text-slate-900 font-semibold text-2xl">Log in to your account</span>
        {!isValidEmail && <GetEmail email={email} SetEmail={SetEmail} verifyEmail={verifyEmail} loading={loading}/>}
        {isValidEmail && <GetPassword SetPassword={SetPassword} email={email} loginHandler={loginHandler}/>}
        </div>
    </>
}

const GetEmail = ({ email, SetEmail, verifyEmail, loading }:{
    email:string, 
    SetEmail: (email:string)=>void,
    verifyEmail: () => void,
    loading:boolean
}) =>{
   return   <div className="border border-gray-500 w-[28vw] h-[70vh] rounded-sm flex flex-col align-middle content-center">
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

   <PrimaryButton disabled={!email || loading} classNames="rounded-sm" onClick={verifyEmail}> <div className="p-3">
       Continue
   </div>
   </PrimaryButton>

   </div>

   <div className="justify-center pt-2 content-center flex ">
   Don&apos;t have an account? <Link className="text-blue-600 underline" href={'/sign-up'}><span>Sign Up</span></Link>
   </div>
</div>
  
}
  
const GetPassword = ({ email, SetPassword, loginHandler } : { 
    email:string,
    SetPassword:(arg:string)=>void,
    loginHandler:()=>void
}) =>{
    return  <div className="border border-gray-500 w-[28vw] h-[40vh] rounded-sm flex flex-col align-middle content-center">
        <div className="flex justify-center items-center p-2 font-bold">Welcome back {email}!</div>

        <div className="flex flex-col p-4">
           <div>
           <label htmlFor="password" className="text-slate-900 font-semibold p-1">
               Password
               <span className="text-red-500 text-xl">*</span>
           </label> 
           <span>(required)</span>
           </div>
           <Input placeholder="Password" type="password" onChange={e =>{ 
               SetPassword(e.target.value)
           }}/>

       <PrimaryButton disabled={!email} classNames="rounded-sm" onClick={loginHandler}> <div className="p-3">
           Continue
       </div>
       </PrimaryButton>

       </div>

    </div>
}