import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "../../../assets/images/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputClick = () => {
    navigate("/input");
  };

  const handleListClick = () => {
    navigate("/list");
  };

  const isActiveInput = location.pathname === "/input" || location.pathname === "/";
  const isActiveList = location.pathname === "/list";

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img src={Logo} width={200} height={65} alt="체스몽" style={{ cursor: "pointer" }} />
        <div className={styles.navContainer}>
          <button
            className={`${styles.navItem} ${isActiveInput ? styles.active : ""}`}
            onClick={handleInputClick}
          >
            강의 등록
          </button>
          <button
            className={`${styles.navItem} ${isActiveList ? styles.active : ""}`}
            onClick={handleListClick}
          >
            등록한 강의
          </button>
        </div>
      </div>
    </div>
  );
}