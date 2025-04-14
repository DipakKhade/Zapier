import { ReactNode } from "react"

export const PrimaryButton = ({ children, onClick } : { children:ReactNode, onClick? : ()=> void }) =>{
    return <button onClick={onClick} className="bg-orange-500 rounded-3xl px-4 py-0 text-slate-50 font-semibold">
        {children}
    </button>
}

export const HoverButton = ({ children, onClick } : { children: ReactNode, onClick: ()=> void}) =>{
    return <button onClick={onClick}>
        {children}
    </button>
}