import { LucideLoaderCircle } from 'lucide-react'

const Spinner = () => {
  return (
    <div className="flex justify-center items-center self-center flex-1 min-h-70">
        <LucideLoaderCircle className="animate-spin w-16 h-16" />
    </div>
  )
}

export default Spinner