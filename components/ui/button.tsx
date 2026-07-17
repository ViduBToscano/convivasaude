import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  // Base: layout + focus + disabled + trailing-arrow animation (via cv-btn CSS class)
  "cv-btn inline-flex shrink-0 items-center justify-center gap-2 font-semibold whitespace-nowrap rounded-2xl cursor-pointer outline-none select-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA, navy gradient + colored shadow + 3-D lift
        default: "cv-btn-primary",
        // Secondary, outline that becomes primary on hover
        outline: "cv-btn-secondary",
        // Ghost, subtle text button
        ghost: "cv-btn-ghost",
        // Inverted, white on primary-colored backgrounds
        inverted: "cv-btn-inverted",
        // Outline Inverted, transparent/white border on primary backgrounds
        "outline-inverted": "cv-btn-outline-inverted",
        // Kept for internal shadcn component compatibility
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-all duration-200",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 border-2 border-transparent transition-all duration-200 focus-visible:ring-destructive/30",
        link: "text-primary underline-offset-4 hover:underline border-2 border-transparent",
      },
      size: {
        default: "h-11 px-6 text-sm",
        xs:      "h-7 gap-1 rounded-xl px-3 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm:      "h-9 px-4 text-sm",
        lg:      "h-12 px-8 text-base",
        icon:    "size-10 rounded-xl p-0",
        "icon-xs": "size-7 rounded-lg p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8 rounded-xl p-0",
        "icon-lg": "size-11 rounded-xl p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {children}
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
