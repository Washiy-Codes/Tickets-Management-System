import {ThemeProvider} from 'next-themes'

type ThemeProviderWrapperProps = {
    children: React.ReactNode;
}

const ThemeProviderWrapper = ({children}: ThemeProviderWrapperProps) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>
    )
}
export {ThemeProviderWrapper}