import Image from "next/image"
import heroimg from "../../../public/homepage-hero_vvpkmi.avif"

export const Hero = () =>{
    return <div className="flex">
    <div className="max-w-[40vw] pt-32">
        <div className="font-extrabold text-3xl lg:text-8xl text-start">
        Automate without limits
        </div>
        <div className="font-medium text-sm lg:text-2xl text-start">
        Turn chaos into smooth operations by automating workflows yourself—no developers, no IT tickets, no delays. The only limit is your imagination.
        </div>
    </div>
    <div>
            <Image src={heroimg} width={600} height={800} alt=""/>
        </div>
    </div>
}