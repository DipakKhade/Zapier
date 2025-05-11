import ReactJson from 'react-json-view'

export const PrettyMetadata = (metadata:{
    metadata:object
}) =>{

    return <div className="flex flex-col p-2">
        <h2 className='text-slate-900 font-semibold text-lg'>Metadata</h2>
        <ReactJson src={metadata} onSelect={(x)=>{
            console.log(x)
        }} />
    </div>
}