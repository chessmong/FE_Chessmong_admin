import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import Logo from "../../../assets/images/logo.png";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = () => {
    navigate("/");
  };

  const isActiveInput = location.pathname === "/list";

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <img
          onClick={handleLogoClick}
          src={Logo}
          width={200}
          height={65}
          alt="체스몽"
          style={{ cursor: "pointer" }}
        />
        <div className={styles.navContainer}>
          <button className={`${styles.navItem} ${isActiveInput ? styles.active : ""}`}>
            강의 목록
          </button>
        </div>
      </div>
    </div>
  );
}
