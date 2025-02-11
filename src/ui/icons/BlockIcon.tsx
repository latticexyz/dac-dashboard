import { IconSVG, Props } from "./IconSVG";

export function BlockIcon(props: Props) {
  return (
    <IconSVG {...props}>
      <path
        fillRule="evenodd"
        d="M10.362 1.093a.75.75 0 00-.724 0L2.523 5.018 10 9.143l7.477-4.125-7.115-3.925zM18 6.443l-7.25 4v8.25l6.862-3.786A.75.75 0 0018 14.25V6.443zm-8.75 12.25v-8.25l-7.25-4v7.807a.75.75 0 00.388.657l6.862 3.786z"
        clipRule="evenodd"
      />
    </IconSVG>
  );
}
