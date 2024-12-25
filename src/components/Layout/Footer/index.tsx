import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.footerWrapper}>
        <p className={styles.reservedTxt}>© CHESSMONG, All rights reserved.</p>
      </div>
    </footer>
  );
}
