
import Link from "next/link"
import { HoverButton, PrimaryButton } from "./buttons"

export const Header = () => {
    return <>
        <div className="flex justify-around p-2 border border-b border-b-gray-400 h-16 z-10 fixed w-full bg-amber-50">
            <div className="text-3xl font-extrabold">
                <Link href={'/'}>
                <span className="text-orange-500">_</span>Zapier
                </Link>
            </div>

            <div className="flex space-x-4">
                <HoverButton>Log in</HoverButton>
                <PrimaryButton>
                    <Link href={'/sign-up'}>
                    Sign up
                    </Link>
                </PrimaryButton>
            </div>
        </div>
    </>
}