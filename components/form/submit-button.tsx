"use client"
import { useFormStatus } from "react-dom"
import { Button } from "../ui/button"
import { LoaderCircle } from "lucide-react"
import { clsx } from "clsx"
import {cloneElement} from "react"

type SubmitButtonProps = { 
    label?: string,
    icon?: React.ReactElement<{className?: string}>,
    variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "secondary"
    size?: "default" | "sm" | "lg"
} 

const SubmitButton = ({ label, icon, variant, size }: SubmitButtonProps) => {
    const { pending } = useFormStatus()
    
    return(
        <Button type="submit" disabled={pending} variant={variant} size={size}>
     {pending && <LoaderCircle className={clsx("animate-spin h-4 w-4", {
            "mr-2": !!label
      })} /> }  
        {label}
        {!pending && icon && (
  <span
    className={clsx({
      "ml-2": !!label,
    })}
  >
    {cloneElement(icon, {className: "h-4 w-4"})}
  </span>
)}
      </Button>

    )
}

export { SubmitButton }