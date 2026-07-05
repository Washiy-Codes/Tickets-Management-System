import { usePathname } from "next/navigation";
import { NavItem } from "../types";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cloneElement } from "react";
import { closedClassName } from "../constants";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

type SidebarItemProps = {
  isOpen: boolean;
  navItem: NavItem;
  isActive: boolean;
};

const SidebarItem = ({ isOpen, navItem, isActive }: SidebarItemProps) => {
  return (
    <div className="flex flex-col">
    {navItem.separator && (<Separator className="my-2 h-4" />)}
    <Link
      href={navItem.href}
      className={cn(
        buttonVariants({ variant: "ghost" }),
        "group relative flex h-12 justify-start",
        isActive && "bg-muted font-bold hover:bg-muted"
      )}
    >
      {/* {cloneElement(navItem.icon as React.ReactElement, {
        className: "h-5 w-5",
      })} */}
      {cloneElement(navItem.icon as React.ReactElement<{ className?: string }>, {
  className: cn(
    "h-5 w-5",
    (navItem.icon as React.ReactElement<{ className?: string }>).props.className
  ),
})}

      <span
        className={cn(
          "absolute left-12 text-base duration-200",
          !isOpen ? "md:block hidden" : "w-19",
          !isOpen && closedClassName
        )}
      >
        {navItem.title}
      </span>
    </Link>
    </div>
  );
}

export { SidebarItem };