import styles from "./Spinner.module.scss";
import Logo from "../../../assets/images/chess.png";

export default function Spinner() {
  return (
    <div className={styles.loader}>
      <img src={Logo} alt="Logo" className={styles.logo} width={180} height={180} />
    </div>
  );
}
