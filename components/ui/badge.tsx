import { cn } from '@/lib/utils'

function Badge({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      data-slot="badge"
      className={cn(
        'inline-flex items-center rounded-full border border-transparent bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground',
        className,
      )}
      {...props}
    />
  )
}

export { Badge }
