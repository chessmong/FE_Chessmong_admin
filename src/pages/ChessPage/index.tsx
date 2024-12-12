import { useState } from "react";
import ChessBoard from "../../components/ChessBoard";
import Button from "../../components/Button";
import { positionsState } from "../../states/positionsState";
import { useRecoilState } from "recoil";
import styles from "./ChessPage.module.scss";

export default function ChessPage() {
  const [savedPositions, setSavedPositions] = useRecoilState(positionsState);
  const [currentFen, setCurrentFen] = useState("");

  const savePosition = (position: string) => {
    setSavedPositions((prev) => [position, ...prev]);
  };

  const handleSubmit = () => {
    alert("제출했습니다.........ㅋ");
  };

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
                </div>
              ))}
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={handleSubmit}>제출</Button>
          </div>
        </section>
      </section>
    </div>
  );
}
