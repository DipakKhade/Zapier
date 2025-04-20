import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick, classNames } : { children:ReactNode, onClick? : ()=> void, classNames?:string }) =>{
    return <button onClick={onClick} className={`bg-orange-500 rounded-3xl px-4 py-0 text-slate-50 font-semibold cursor-pointer ${classNames}`}>
        {children}
    </button>
}

export const HoverButton = ({ children, onClick } : { children: ReactNode, onClick?: ()=> void}) =>{
    return <button onClick={onClick} className="hover:bg-slate-100 px-2 rounded-sm cursor-pointer">
        {children}
    </button>
}