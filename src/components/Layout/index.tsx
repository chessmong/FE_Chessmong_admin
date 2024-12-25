import { useLocation } from "react-router-dom";
import Header from "./Header";
import styles from "./Layout.module.scss";
import { LayoutProps } from "./Layout.types";
import Footer from "./Footer";

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const isAuthPage = location.pathname === "/auth";

  return (
    <>
      {!isAuthPage && <Header />}
      <div className={styles.container}>
        <div className={styles.innerContainer}>{children}</div>
      </div>
      <Footer />
    </>
  );
}
