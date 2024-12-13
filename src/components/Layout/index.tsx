import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";

export default function Layout({ children }: LayoutProps) {
  return <div className={styles.container}>{children}</div>;
}
