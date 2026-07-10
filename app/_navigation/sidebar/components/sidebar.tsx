
"use client";

import { createElement, useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { getActivePath } from "@/components/utils/get-active-path";
import { navItems } from "../constants";
import { SidebarItem } from "./sidebar-items";
import { signInPath, signUpPath } from "@/paths";

const Sidebar = () => {
  const { data: session, status } = useSession();
  const pathName = usePathname();

  const { activeIndex } = getActivePath(
    pathName,
    navItems.map((item) => item.href),
    [signInPath(), signUpPath()]
  );

  const [isTransition, setTransition] = useState(false);
  const [isOpen, setOpen] = useState(false);

  const handleToggle = (open: boolean) => {
    setTransition(true);
    setOpen(open);
    setTimeout(() => setTransition(false), 200);
  };

  // if (status === "loading") {
  //   return createElement("div", { className: "w-[78px] bg-secondary/20" });
  // }
  if (status === "loading") {
    return createElement("div", { className: "h-screen border-r bg-secondary/20" });
  }

  if (!session) {
    return null;
  }

  return createElement(
    "nav",
    {
      className: cn(
        "animate-sidebar-from-left",
        "h-screen border-r pt-24",
        isTransition && "duration-200",
        isOpen ? "md:w-60 w-[78px]" : "w-[78px]"
      ),
      onMouseEnter: () => handleToggle(true),
      onMouseLeave: () => handleToggle(false),
    },
    createElement(
      "div",
      { className: "px-3 py-2" },
      createElement(
        "nav",
        { className: "space-y-2" },
        ...navItems.map((navItem, index) =>
          createElement(SidebarItem, {
            key: navItem.title,
            isOpen,
            navItem,
            isActive: index === activeIndex,
          })
        )
      )
    )
  );
};

export { Sidebar };


// "use client";

// import { createElement } from "react";
// import { usePathname } from "next/navigation";
// import { useSession } from "next-auth/react";
// import { cn } from "@/lib/utils";
// import { getActivePath } from "@/components/utils/get-active-path";
// import { navItems } from "../constants";
// import { SidebarItem } from "./sidebar-items";
// import { signInPath, signUpPath } from "@/paths";

// const Sidebar = () => {
//   const { data: session, status } = useSession();
//   const pathName = usePathname();

//   const { activeIndex } = getActivePath(
//     pathName,
//     navItems.map((item) => item.href),
//     [signInPath(), signUpPath()]
//   );

//   // Loading state placeholder (Matches the final sidebar width to prevent layout shifts)
//   if (status === "loading") {
//     return createElement("div", { className: "w-60 h-screen border-r bg-secondary/20" });
//   }

//   // Do not render anything if the user is unauthenticated
//   if (!session) {
//     return null;
//   }

//   return createElement(
//     "nav",
//     {
//       className: cn(
//         "h-screen border-r pt-24 w-60" // Fixed width, no animation classes, no conditional states
//       ),
//     },
//     createElement(
//       "div",
//       { className: "px-3 py-2" },
//       createElement(
//         "nav",
//         { className: "space-y-2" },
//         ...navItems.map((navItem, index) =>
//           createElement(SidebarItem, {
//             key: navItem.title,
//             isOpen: true, // Always pass true so text/icons always display
//             navItem,
//             isActive: index === activeIndex,
//           })
//         )
//       )
//     )
//   );
// };

// export { Sidebar }