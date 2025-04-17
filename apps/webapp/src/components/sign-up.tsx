
export const SignUpCard = () =>{
    return <div className="border border-gray-500 w-[28vw] h-[70vh] rounded-sm">
        <GoogleSignUpButton/>
        <div className="flex">
            <hr className="border-t-[1px] border-gray-500 w-48 mx-auto my-4" />
            <span className="text-gray-600 font-semibold">OR</span>
            <hr className="border-t-[1px] border-gray-500 w-48 mx-auto my-4" />
        </div>
        </div>
}

const GoogleSignUpButton = () =>{
    return <div className="flex  max-w-96 bg-blue-500 text-slate-50 p-3 space-x-16 rounded-sm justify-start m-5">
        <div className="bg-slate-50 rounded-sm p-1">
        <svg height="21" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262" width="21" xmlns="http://www.w3.org/2000/svg"><title>Google Logo</title><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4"></path><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853"></path><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05"></path><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335"></path></svg>
        </div>
        <div className="text-lg font-bold">
            Sign up with Google
        </div>
    </div>
}