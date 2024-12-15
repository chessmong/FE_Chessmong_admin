import { useState, useEffect } from "react";
import ChessBoard from "../../components/ChessBoard";
import Button from "../../components/Button";
import { positionsState } from "../../states/positionsState";
import { useRecoilState } from "recoil";
import styles from "./ChessPage.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { useAddLecture } from "../../apis/post/postAddLecture";
import Spinner from "../../components/Layout/Spinner";

export default function ChessPage() {
  const [savedPositions, setSavedPositions] = useRecoilState(positionsState);
  const [currentFen, setCurrentFen] = useState("");
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddLecture();
  const location = useLocation();
  const { url } = location.state || {};

  const savePosition = (position: string) => {
    setSavedPositions((prev) => [position, ...prev]);
  };

  const deletePosition = (index: number) => {
    setSavedPositions((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteMostRecentPosition = () => {
    setSavedPositions((prev) => prev.slice(1));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Delete") {
      event.preventDefault();
      deleteMostRecentPosition();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSubmit = () => {
    mutate(
      { link: url, positions: savedPositions },
      {
        onSuccess: () => {
          setSavedPositions([]);
          navigate("/");
        },
        onError: () => {
          alert("강의 등록에 실패했습니다. 다시 시도해 주세요.");
        },
      }
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <section className={styles.leftSection}>
          <ChessBoard onSavePosition={savePosition} onFenChange={setCurrentFen} />
        </section>
        <section className={styles.rightSection}>
          <div className={styles.positionBg}>
            <div className={styles.positionContainer}>
              {savedPositions.map((position, index) => (
                <div
                  key={index}
                  className={`${styles.positionItem} ${
                    position === currentFen ? styles.highlighted : ""
                  }`}
                >
                  <p className={styles.positionText}>{position}</p>
                  <button className={styles.deleteButton} onClick={() => deletePosition(index)}>
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/11600/11600230.png"
                      width={15}
                      height={15}
                      alt="삭제 버튼"
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={handleSubmit} disabled={savedPositions.length === 0 || isLoading}>
              제출
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
}
