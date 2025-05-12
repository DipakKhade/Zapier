import { Star } from 'lucide-react';

export const ZapCreateHeader = ({onPublish}:{
    onPublish:() => void
}) => {
    return <div className='flex items-center justify-end rounded-b-md z-20 w-full bg-blue-800 h-12'>
       <div className="pr-6">
        <button onClick={onPublish} className="flex space-x-2 text-gray-800 text-xl bg-gray-400 p-2 rounded-sm px-1 py-1.5 hover:text-gray-700 focus:outline-none">
            <span className='pr-2'><Star/></span>Publish
        </button>
       </div>
    </div>  
}   