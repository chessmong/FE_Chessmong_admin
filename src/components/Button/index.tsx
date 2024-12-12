import styles from "./Button.module.scss";
import { ButtonProps } from "./Button.types";

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <div className={styles.container} onClick={onClick}>
      {children}
    </div>
  );
}
