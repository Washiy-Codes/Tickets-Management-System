import { Separator } from "@/components/ui/separator"
type HeadingProps = {
  title: string;
  description?: string;
}
const Heading = ({ title, description }: HeadingProps) => {
  return (
    <>
    <div className="ml-4 flex flex-col gap-1 pt-4">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <Separator />
    </>
  )
}
export { Heading }