import { IconSVG, Props } from "./IconSVG";

export function ClockIcon(props: Props) {
  return (
    <IconSVG {...props}>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
        clipRule="evenodd"
      />
    </IconSVG>
  );
}
