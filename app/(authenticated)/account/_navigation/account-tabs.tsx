"use client";

import { TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs";
import { accountProfilePath, accountPasswordPath } from "@/paths";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AccountTabs = () => {
    const pathname = usePathname();
    return(
        <Tabs value={pathname.includes("password") ? "password" : "profile"} className="w-full">
                <TabsList>
                    <TabsTrigger value="profile" asChild>
                        <Link href={accountProfilePath()}>Profile</Link>
                    </TabsTrigger>
                    <TabsTrigger value="password" asChild>
                        <Link href={accountPasswordPath()}>Password</Link>
                    </TabsTrigger>
                </TabsList>
            </Tabs>
    )
}

export default AccountTabs;