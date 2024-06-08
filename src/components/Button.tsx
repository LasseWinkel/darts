import "./Button.css";
import classnames from "classnames";

interface ButtonProps {
  handleClick?: () => void;
  styleName?: string;
  children: React.ReactNode;
  disabled?: boolean;
}

function Button(props: ButtonProps) {
  const { handleClick, children, styleName, disabled } = props;

  return (
    <div
      className={classnames("button", styleName, { disabled })}
      onClick={disabled ? () => {} : handleClick}
    >
      {children}
    </div>
  );
}

export default Button;
