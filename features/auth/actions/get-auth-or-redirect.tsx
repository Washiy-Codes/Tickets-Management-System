import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { signInPath } from "@/paths";

const getAuthOrRedirect = async () => {
    const session = await auth();
    const user = session?.user;
    if(!user){
        redirect(signInPath());
    }
    return user;
}

export {getAuthOrRedirect}