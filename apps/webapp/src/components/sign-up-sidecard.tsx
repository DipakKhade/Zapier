
export const SignUpSideCard = () =>{
    return <div className="w-[30vw] h-[70vh] p-3 pt-24">
        <div className="font-bold text-4xl text-start">
        Join millions worldwide who automate their work using Zapier.
        </div>
        <div className="flex flex-col space-y-4 pt-4">
            <div className="flex gap-2"><CheckTick/> Easy setup, no coding required</div>
            <div className="flex gap-2"><CheckTick/> Free forever for core features</div>
            <div className="flex gap-2"><CheckTick/> 14-day trial of premium features & apps</div>
        </div>
    </div>
}

const CheckTick = () =>{
    return <svg className="text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="20" width="20" color="StatusSuccessStronger" name="formCheckCircle"><path fill="#00FF00" d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM8.21 10.79l2.79 2.8 5.29-5.3 1.42 1.42-6.71 6.7-4.21-4.2 1.42-1.42Z"></path></svg>
}

