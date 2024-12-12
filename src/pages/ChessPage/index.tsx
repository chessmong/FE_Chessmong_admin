import { useRecoilState } from "recoil";
import styles from "./ChessPage.module.scss";
import ChessBoard from "../../components/ChessBoard";
import { positionsState } from "../../states/positionsState";
import Button from "../../components/Button";

export default function ChessPage() {
  const [savedPositions, setSavedPositions] = useRecoilState(positionsState);

  const savePosition = (position: string) => {
    setSavedPositions((prev) => [position, ...prev]);
  };

  const handleSubmit = () => {
    console.log("제출");
  };

  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <section className={styles.leftSection}>
          <ChessBoard onSavePosition={savePosition} />
        </section>
        <section className={styles.rightSection}>
          <div className={styles.positionContainer}>
            {savedPositions.map((position, index) => (
              <div key={index}>{position}</div>
            ))}
          </div>
          <div className={styles.buttonContainer}>
            <Button onClick={handleSubmit}>제출</Button>
          </div>
        </section>
      </section>
    </div>
  );
}
