import Link from "next/link"
import { PrimaryButton } from "./buttons"

export const Sidebar = () =>{

    return <div className="h-screen w-72 bg-slate-50 border-r border-b border-gray-400 flex flex-col items-center">
        <div>
            <Link href={'/zap/create'}>
                    <PrimaryButton classNames="rounded-sm w-[250px] p-2 mt-3">
                        <div className="flex justify-center items-center space-x-1.5">
                            <span className="font-semibold text-2xl pr-2">+</span> 
                            <span className="font-semibold text-xl">Create</span>
                        </div>
                    </PrimaryButton>
            </Link>
        </div>
    </div>
}