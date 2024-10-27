import { cn } from "~/lib/utils";
import { Button } from "../../components/ui/button";

interface KeyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
}

export const KeyButton = ({
  text,
  className = "",
  children,
  ...rest
}: KeyButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <Button
      className={cn("h-36 py-2 text-5xl font-extrabold", "flex-1", className)}
      {...rest}
    >
      {children}
      {text}
    </Button>
  );
};
