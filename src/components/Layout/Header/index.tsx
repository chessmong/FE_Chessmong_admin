import styles from "./Header.module.scss";
import Logo from "../../../assets/images/logo.png";

export default function Header() {
  const handleReset = () => {
    window.location.reload();
  };

  return (
    <header className={styles.container}>
      <div className={styles.bar}>
        <div className={styles.title}>
          <img
            src={Logo}
            width={160}
            alt="체스몽"
            style={{ cursor: "pointer" }}
            onClick={handleReset}
          />
        </div>
      </div>
    </header>
  );
}
