import Link from 'next/link'
import clsx from 'clsx'

const variantStyles = {
  primary:
    'bg-cyan-800 font-semibold text-cyan-100 hover:bg-cyan-700 active:bg-cyan-800 active:text-cyan-100/70 dark:bg-cyan-700 dark:hover:bg-cyan-600 dark:active:bg-cyan-700 dark:active:text-cyan-100/70',
  secondary:
    'bg-cyan-50 font-medium text-cyan-900 hover:bg-cyan-100 active:bg-cyan-100 active:text-cyan-900/60 dark:bg-cyan-800/50 dark:text-cyan-300 dark:hover:bg-cyan-800 dark:hover:text-cyan-50 dark:active:bg-cyan-800/50 dark:active:text-cyan-50/70',
}

type ButtonProps = {
  variant?: keyof typeof variantStyles
} & (
  | (React.ComponentPropsWithoutRef<'button'> & { href?: undefined })
  | React.ComponentPropsWithoutRef<typeof Link>
)

export function Button({
  variant = 'primary',
  className,
  ...props
}: ButtonProps) {
  className = clsx(
    'inline-flex items-center gap-2 justify-center rounded-md py-3 px-3 mt-4 text-sm outline-offset-2 transition active:transition-none',
    variantStyles[variant],
    className,
  )

  return typeof props.href === 'undefined' ? (
    <button className={className} {...props} />
  ) : (
    <Link className={className} {...props} />
  )
}
