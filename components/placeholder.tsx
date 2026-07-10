import { LucideMessageSquareWarning } from "lucide-react";   
import { cloneElement} from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<{ className?: string }>;
  button?: React.ReactElement<{ className?: string }>;
}
const Placeholder = ({label, icon=<LucideMessageSquareWarning />, button=<div />}: PlaceholderProps) => {
  return (
    <div className="flex-1 flex self-center items-center justify-center flex-col gap-y-2">

        {cloneElement(icon, { className: "w-16 h-16" })}
      <h2 className="text-center font-semibold">{label}</h2>

      {cloneElement(button, {
       className:"h-10"
      })}
    </div>
  )
}

export { Placeholder }
