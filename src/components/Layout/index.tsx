import Header from "./Header";
import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.innerContainer}>{children}</div>
      </div>
    </>
  );
}
