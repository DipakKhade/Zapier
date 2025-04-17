import { SignUpCard } from "@/components/sign-up";
import { SignUpSideCard } from "@/components/sign-up-sidecard";

export default function SignUp() {
    return <div className="flex w-full justify-center space-x-40 pt-12">
        <SignUpSideCard/>
        <SignUpCard/>
    </div>
}