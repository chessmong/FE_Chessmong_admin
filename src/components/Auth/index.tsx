import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import styles from "./Auth.module.scss";
import { useAuthenticate } from "../../apis/post/postAuthenticate";
import { useRecoilState } from "recoil";
import { authState } from "../../states/authState";

export default function Auth() {
  const [inputValue, setInputValue] = useState("");
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();
  const { mutate, isLoading } = useAuthenticate();
  const [auth, setAuth] = useRecoilState(authState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleClick = () => {
    mutate(inputValue, {
      onSuccess: (response) => {
        const token = response.accessToken;
        setAuth({
          accessToken: token,
          isLoggedIn: true,
        });
        localStorage.setItem("accessToken", token);
        navigate("/");
      },
      onError: () => {
        setIsError(true);
      },
    });
  };

  useEffect(() => {
    if (auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth.isLoggedIn, navigate]);

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
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? "확인 중" : "입력"}
      </Button>
    </div>
  );
}
