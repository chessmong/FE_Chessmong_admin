import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import styles from "./Auth.module.scss";

export default function Auth() {
  const [inputValue, setInputValue] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const code = "CODE";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue === code) {
        setIsButtonEnabled(true);
        setIsError(false);
        handleClick();
      } else {
        setIsError(true);
        setIsButtonEnabled(false);
      }
    }
  };

  const handleClick = () => {
    if (inputValue === code) {
      navigate("/");
    } else {
      setIsError(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputErrorContainer}>
        <div className={styles.inputContainer}>
          <input
            className={`${styles.input} ${isError ? styles.errorInput : ""}`}
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="인증코드를 입력해주세요."
          />
        </div>
        {isError && <p className={styles.errorText}>코드가 일치하지 않습니다.</p>}
      </div>
      <Button onClick={handleClick} disabled={!isButtonEnabled}>
        입력
      </Button>
    </div>
  );
}
