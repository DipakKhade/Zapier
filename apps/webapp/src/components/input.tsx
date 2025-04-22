
export const Input = ({ type = "text", placeholder, onChange, ref } : {
    type: string,
    placeholder: string,
    onChange: (e:any) => void,
    ref?:any
}) => {
    return <input ref={ref} type={type} placeholder={placeholder} onChange={onChange} className="border border-slate-500 p-2 mb-4 rounded-sm" />
}