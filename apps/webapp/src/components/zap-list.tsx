'use client';

import { PRIMARY_BACKEND_URL } from "config/config";
import { useEffect, useState } from "react";

interface Zap {
        trigger: {
            id: string;
            availableTriggerId: string;
            zapId: string;
        } | null;
        action: {
            id: string;
            sortingOrder: number;
            actionId: string;
            zapId: string;
        }[];
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
    <div className="flex flex-col justify-center items-center space-y-10">
    <span className="text-slate-900 font-semibold text-2xl">Zaps</span>
    </div>
    </>
}


const Zap = ({zap}:{
    zap:Zap
}) =>{

    return <div>

    </div>
}