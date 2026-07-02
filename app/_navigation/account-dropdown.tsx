"use client";
import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
import { signOut } from "next-auth/react";
import { accountPasswordPath, accountProfilePath } from "@/paths";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";                                  
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type AccountDropdownProps = {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
};

const AccountDropdown = ({ user }: AccountDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarFallback>
            {user.name ? user.name[0].toUpperCase() : "T"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="font-bold text-lg">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={accountProfilePath()}>
            <LucideUser className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={accountPasswordPath()}>
            <LucideLock className="mr-2 h-4 w-4" />
            <span>Password</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center w-full"
          >
            <LucideLogOut className="mr-2 h-4 w-4" />
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { AccountDropdown };



















// import { Link } from "next/link";
// import { LucideLock, LucideLogOut, LucideUser } from "lucide-react";
// import { signOut } from "@/auth";
// import { accountPasswordPath, accountProfilePath } from "@/paths";
// import { Avatar, AvatarFallback } from "./ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { getAuthOrRedirect } from "@/features/auth/actions/get-auth-or-redirect";

// const user = getAuthOrRedirect();

// type AccountDropdownProps = {
//   user: typeof user;
// };

// const AccountDropdown = ({ user }: AccountDropdownProps) => {
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Avatar>
//           <AvatarFallback>{user.username[0].toUpperCase()}</AvatarFallback>
//         </Avatar>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="w-56">
//         <DropdownMenuLabel>My Account</DropdownMenuLabel>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem asChild>
//           <Link href={accountProfilePath()}>
//             <LucideUser className="mr-2 h-4 w-4" />
//             <span>Profile</span>
//           </Link>
//         </DropdownMenuItem>
//         <DropdownMenuItem asChild>
//           <Link href={accountPasswordPath()}>
//             <LucideLock className="mr-2 h-4 w-4" />
//             <span>Password</span>
//           </Link>
//         </DropdownMenuItem>
//         <DropdownMenuSeparator />
//         <DropdownMenuItem asChild>
//           <form action={signOut}>
//             <LucideLogOut className="mr-2 h-4 w-4" />
//             <button type="submit">Sign Out</button>
//           </form>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//     // <form action={signOut}>
//     //   <SubmitButton label="Sign Out" icon={<LucideLogOut />} />
//     // </form>
//   );
// };

// export { AccountDropdown };