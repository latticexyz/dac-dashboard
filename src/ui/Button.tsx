import { PendingIcon } from "@/ui/icons/PendingIcon";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  pending?: boolean;
  error?: ReactNode;
};

export function Button({
  type,
  className,
  pending,
  disabled,
  error,
  title,
  children,
  ...props
}: Props) {
  return (
    <button
      type={type || "button"}
      aria-busy={!!pending}
      aria-disabled={disabled}
      // TODO: disable click handlers during pending/disabled?
      className={twMerge(
        "group bg-red-500 text-white font-mono uppercase leading-none transition hover:brightness-125",
        "aria-[busy=true]:bg-red-800 aria-[busy=true]:cursor-default",
        "aria-[disabled=true]:bg-neutral-800 aria-[disabled=true]:text-white/40 aria-[disabled=true]:cursor-not-allowed",
        className
      )}
      {...props}
    >
      <span className="inline-grid place-items-center pointer-events-none overflow-hidden p-4">
        <span
          className={twMerge(
            "row-start-1 col-start-1",
            "transition opacity-100 translate-y-0",
            "group-aria-[busy=true]:opacity-0 group-aria-[busy=true]:-translate-y-3"
          )}
        >
          {children}
        </span>
        <span
          aria-hidden
          className={twMerge(
            "row-start-1 col-start-1",
            "transition opacity-0 translate-y-3",
            "group-aria-[busy=true]:opacity-100 group-aria-[busy=true]:translate-y-0"
          )}
        >
          {/* TODO: replace with themed pending icon */}
          <PendingIcon />
        </span>
      </span>
    </button>
  );
}
