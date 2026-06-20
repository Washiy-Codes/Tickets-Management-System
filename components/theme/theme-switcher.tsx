"use client"

import { LucideMoon, LucideSunMedium } from "lucide-react";
import {useTheme} from "next-themes"

const ThemeSwitcher = () => {
    const {theme, setTheme} = useTheme();
    const handleClick = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return(
        <button onClick={handleClick} className="p-2 rounded bg-secondary/20">
            {theme === "light" ? 
            <LucideMoon /> : 
            <LucideSunMedium />}
            <span className="sr-only">Toggle Theme</span>
        </button>
    )
}
export {ThemeSwitcher}