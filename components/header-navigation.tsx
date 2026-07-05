
import { auth } from '@/auth'
import { ThemeSwitcher } from '@/components/theme/theme-switcher'
import { buttonVariants } from '@/components/ui/button'
import { signUpPath, signInPath, homePath } from '@/paths'
import { LucideKanban } from 'lucide-react'

const HeaderNavigation = async() => {
  const session =  await auth()
  const user = session?.user

  const navigation = (
    user ? (
      <AccountDropdown user={user} />
    ) : (
      <>
       
        <Link href={signUpPath()} className={buttonVariants({variant:"outline"})}>
              Sign Up
        </Link>
        <Link href={signInPath()} className={buttonVariants({variant:"default"})}>
              Sign In
        </Link>      
    </>
  )
  )
  return (
    <nav className="
          flex justify-between py-2.5 px-5
           border-b w-full fixed left-0 right-0 top-0 z-20
         supports-backdrop-blur:bg-background/80 backdrop-blur-sm">
          <div>
        <Link href={homePath()} className={buttonVariants({variant:"ghost"})}>
             <LucideKanban />
             <h1 className="text-lg ml-2 font-bold">TicketBounty</h1>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ThemeSwitcher />
            {navigation}
            </div>
        </nav>
  )
}

export { HeaderNavigation }


















import Link from 'next/link'
// import { useSession, signOut } from 'next-auth/react'
import { AccountDropdown } from '@/app/_navigation/account-dropdown'
// import { buttonVariants } from './ui/button'
// import { ticketsPath, signUpPath, signInPath, homePath } from '@/paths'
// import { LucideLogOut } from 'lucide-react'
// import { SubmitButton } from './form/submit-button'

// export function HeaderNavigation() {
//   const { data: session, status } = useSession()
//   const user = session?.user

//   if (status === 'loading') {
//     return <div className="w-16 animate-pulse h-9 bg-muted rounded-md" />
//   }

//   return !user ? (
//     <>
//       <Link href={signUpPath()} className={buttonVariants({ variant: "outline" })}>
//         Sign Up
//       </Link>
//       <Link href={signInPath()} className={buttonVariants({ variant: "default" })}>
//         Sign In
//       </Link>
//     </>
//   ) : (
//     <>
//       <Link href={ticketsPath()} className={buttonVariants({ variant: "default" })}>
//         Tickets
//       </Link>

//       <form
//         onSubmit={async (e) => {
//           e.preventDefault()
//           await signOut({ callbackUrl: homePath() })
//         }}
//       >
//         <SubmitButton label={"Sign Out"} icon={<LucideLogOut />} />
//       </form>
//     </>
//   )
// }




