import { Sidebar } from "@/components/sidebar";
import { ZapList } from "@/components/zap-list";

export default function Page(){

    return <>
    <div className="flex">
        <Sidebar/>
        <ZapList/>
    </div>
    </>
}