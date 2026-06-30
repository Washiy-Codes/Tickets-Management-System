"use client"
import { loginWithSocials } from "@/features/auth/actions/socials-login";
import { FaGithub, FaGoogle } from "react-icons/fa";

const LogInWithSocials = () => {
    return (
        <form action={loginWithSocials} className="flex flex-col gap-4">
            <button type="submit" name="action" value="github"className="w-full flex items-center gap-x-2 text-center gap-2 bg-black text-white px-4 py-2 rounded-md cursor-pointer">
                <FaGithub className="text-2xl text-gray-800 text-center"/>
                <span className="text-green-50 text-center">Sign in with Github</span>   
            </button>

            <button type="submit" name="action" value="google" className="w-full flex items-center gap-x-2 text-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-md cursor-pointer">
                <FaGoogle className="text-2xl text-gray-800 text-center"/>
                <span className="text-green-50 text-center">Sign in with Google</span>   
            </button>

        </form>
    )
}

export { LogInWithSocials }