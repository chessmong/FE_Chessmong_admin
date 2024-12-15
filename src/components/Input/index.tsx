import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import styles from "./Input.module.scss";
import { useCheckLecture } from "../../apis/post/postCheckLecture";
import Spinner from "../Layout/Spinner";

export default function Input() {
  const [url, setUrl] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { mutate, isLoading } = useCheckLecture();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setIsButtonEnabled(e.target.value !== "");
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (url) {
        setIsButtonEnabled(true);
        handleClick();
      } else {
        setIsButtonEnabled(false);
      }
    }
  };

  const handleClick = () => {
    if (!url) {
      return;
    }

    mutate(url, {
      onSuccess: () => {
        navigate("/chess", { state: { url } });
      },
      onError: (error: any) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              setError("잘못된 요청입니다. URL을 다시 확인해 주세요.");
              break;
            case 401:
              setError("인증에 실패했습니다. 다시 로그인해 주세요.");
              break;
            case 409:
              setError("이미 등록된 강의입니다.");
              break;
            default:
              setError("강의 등록에 실패했습니다. 다시 시도해 주세요.");
          }
        } else {
          setError("네트워크 오류가 발생했습니다.");
        }
      },
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputErrorContainer}>
        <div className={styles.inputContainer}>
          <input
            className={`${styles.input} ${error ? styles.errorInput : ""}`}
            value={url}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="유튜브 강의 URL을 입력해주세요."
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
      <Button onClick={handleClick} disabled={!isButtonEnabled || isLoading}>
        입력
      </Button>
    </div>
  );
}
