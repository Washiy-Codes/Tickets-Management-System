import Link from 'next/link'
import React from 'react'
import { buttonVariants } from './ui/button'
import { homePath, ticketsPath } from '@/paths'
import { LucideKanban } from 'lucide-react'
import { ThemeSwitcher } from './theme/theme-switcher'

const Header = () => {
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
            <Link href={ticketsPath()} className={buttonVariants({variant:"default"})}>
              Tickets
            </Link>
            </div>
        </nav>
  )
}

export { Header }