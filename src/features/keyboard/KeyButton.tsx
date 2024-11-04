import { cn } from "~/lib/utils";
import { Button, type ButtonProps } from "../../components/ui/button";

interface KeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const KeyButton = ({
  text,
  className = "",
  children,
  ...rest
}: KeyButtonProps &
  ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      className={cn(
        "h-full w-full truncate px-0 py-2 text-5xl font-extrabold",
        className,
      )}
      {...rest}
    >
      {children}
      {text}
    </Button>
  );
};
