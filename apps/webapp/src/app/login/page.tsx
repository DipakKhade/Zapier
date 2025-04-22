import { LogInCard } from "@/components/log-in-card";
import { LoginSideCard } from "@/components/login-sidecard";

export default function Login() {
  return <div className="flex w-full justify-center space-x-40 pt-12">
    <LoginSideCard/>
    <LogInCard/>
  </div>
}