import { ZapList } from "@/components/zap-list";
import Link from "next/link";

export default function Page(){

    return <>
        <div>
            <div className="flex space-x-4 p-4 justify-end">
                <Link href={'/zap/create'}>
                <button className="bg-purple-500 text-slate-50 p-2 rounded-sm px-1 py-1.5 hover:text-gray-700 focus:outline-none cursor-pointer">
                    Create Zap
                </button>
                </Link>
            </div>

            <div className="flex-1 p-6">
                <ZapList/>
            </div>
        </div>
        </>
}