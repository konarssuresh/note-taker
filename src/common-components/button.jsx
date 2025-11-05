import { useMemo } from "react";

export const Button = ({
  variant,
  children,
  className = "",
  isRounded = false,
  ...remaining
}) => {
  const defaultClassNames = `cursor-pointer text-preset-4 px-4 py-3 focus:outline-2 focus:outline-offset-2 focus:outline-neutral-300 disabled:text-neutral-50 disabled:text-neutral-300 disabled:border-transparent disabled:cursor-not-allowed`;

  const roundedClassNames = isRounded ? "rounded-full" : "rounded-md";
  const primaryClassNames =
    "bg-blue-700 hover:bg-blue-500 focus:bg-blue-500 text-neutral-0";

  const secondaryClassNames =
    "bg-neutral-100 text-neutral-600 hover:bg-neutral-0 hover:text-neutral-600 hover:text-neutral-950 focus:bg-neutral-0";

  const borderClassNames =
    "text-neutral-950 bg-neutral-100 border border-neutral-300 hover:border-transparent focus:bg-neutral-0 focus:border-neutral-950";

  const dangerClassNames = "bg-red-500 text-neutral-0";

  const variantClass = useMemo(() => {
    switch (variant) {
      case "primary":
        return primaryClassNames;
      case "secondary":
        return secondaryClassNames;
      case "border":
        return borderClassNames;
      case "danger":
        return dangerClassNames;
      default:
        return primaryClassNames;
    }
  }, [variant]);
  return (
    <button
      className={`${defaultClassNames} ${variantClass} ${roundedClassNames} ${className}`}
      {...remaining}
    >
      {children}
    </button>
  );
};
