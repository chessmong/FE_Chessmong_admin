import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.types";

export default function Button({ children, onClick, disabled }: ButtonProps) {
  return (
    <div
      className={`${styles.container} ${disabled && styles.disabled}`}
      onClick={!disabled ? onClick : undefined}
    >
      {children}
    </div>
  );
}
