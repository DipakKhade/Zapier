import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick, classNames, disabled } : { children:ReactNode, onClick? : ()=> void, classNames?:string, disabled?:boolean }) =>{
    return <button disabled={disabled} onClick={onClick} className={`rounded-3xl px-4 py-0 font-semibold cursor-pointer ${disabled ? 'bg-gray-200 text-gray-600' : 'bg-orange-500 text-slate-50'} ${classNames}`}>
        {children}
    </button>
}

export const HoverButton = ({ children, onClick } : { children: ReactNode, onClick?: ()=> void}) =>{
    return <button onClick={onClick} className="hover:bg-slate-100 px-2 rounded-sm cursor-pointer">
        {children}
    </button>
}