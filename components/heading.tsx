import { Separator } from "@/components/ui/separator"
type HeadingProps = {
  title: string;
  description?: string;
  tabs?: React.ReactNode;
  action?: React.ReactNode;
}
const Heading = ({ title, description, tabs, action }: HeadingProps) => {
  return (
    <>
    {tabs}
    <div className="flex items-center justify-between gap-x-4">
      <div className="ml-2 flex flex-col gap-y-1 pt-2">
        <h1 className="text-2lg font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      <div className="flex items-center gap-x-2 justify-center">
        {action}
      </div>
    </div>
      <Separator />
    </>
  )
}
export { Heading }