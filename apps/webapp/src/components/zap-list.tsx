'use client';

import { PRIMARY_BACKEND_URL } from "config/config";
import { useEffect, useState } from "react";

interface Zap {
    id: string;
    createdAt: string;
    trigger: {
        type: {
            name: string;
            image: string;
        };
    } | null;
    action: {
        type: {
            name: string;
            image: string;
        };
        sortingOrder: number;
    }[]
}

export const ZapList = () =>{
    const [ zaps, setZaps ] = useState<Zap[]>([]);

    useEffect(()=>{
        (async ()=>{
            const response = await fetch(`${PRIMARY_BACKEND_URL}/api/v1/zap/zapRuns`,{
                method:'GET',
                headers:{
                    'authorization':`Bearer ${localStorage.getItem('token')}`,
                    'Content-Type':'application/json'
                }
            });
            const data = await response.json();
            setZaps(data.data);
        })();
    },[])

    return <>
    <div className="flex-col space-y-10 pt-2 w-full justify-center">
        <span className="text-slate-900 font-semibold text-2xl flex items-center justify-center">Zap List</span>

        <table className="border-collapse border border-gray-400 w-full">
            <thead>
                <tr>
                <th className="border border-gray-300">Zap</th>
                <th className="border border-gray-300">Zap Id</th>
                <th className="border border-gray-300">Web hook</th>
                <th className="border border-gray-300">Create Date</th>
                </tr>
            </thead>
            <tbody>
                    {zaps.map((zap)=>{
                        return <tr key={zap.id}>
                        <td className="border border-gray-300">
                            <Zap key={zap.id} zap={zap}/>
                        </td>
                        <td className="border border-gray-300">{zap.id}</td>
                        <td className="border border-gray-300">hook url</td>
                        <td className="border border-gray-300">{zap.createdAt}</td>
                        </tr>
                    })}
            </tbody>
        </table>
    </div>
    </>
}

const Zap = ({zap}:{
    zap:Zap
}) =>{

    return <div>
        <div className="flex items-center space-x-2 p-2">
            <div className="flex items-center space-x-2">
                <img src={zap.trigger?.type?.image} alt="img" className="w-10 h-10 rounded-full" />
                <div className="flex flex-col space-y-1">
                    <span className="text-slate-900 font-semibold text-lg">{zap.trigger?.type?.name}</span> 
                    <span className="text-slate-500 font-semibold text-sm">Trigger</span>
                </div>
            </div>
            
            {
                zap.action.map((action,index)=>{
                    return <div key={index} className="flex items-center space-x-2">
                        <img src={action.type.image} alt="img" className="w-10 h-10 rounded-full" />
                        <div className="flex flex-col">   
                            <span className="text-slate-900 font-semibold text-lg">{action.type.name}</span> 
                            <span className="text-slate-500 font-semibold text-sm">Action {index+1}</span>
                        </div>
                    </div>
                })
            }
        </div>
    </div>
}