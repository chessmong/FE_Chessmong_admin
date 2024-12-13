import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import styles from "./Input.module.scss";

export default function Input() {
  const [inputValue, setInputValue] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsButtonEnabled(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputValue) {
        setIsButtonEnabled(true);
        handleClick();
      } else {
        setIsButtonEnabled(false);
      }
    }
  };

  const handleClick = () => {
    if (inputValue) {
      navigate("/");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="유튜브 강의 URL을 입력해주세요."
        />
      </div>
      <Button onClick={handleClick} disabled={!isButtonEnabled}>
        입력
      </Button>
    </div>
  );
}
