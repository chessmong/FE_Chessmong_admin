import { useRecoilState } from "recoil";
import styles from "./ChessPage.module.scss";
import ChessBoard from "../../components/ChessBoard";
import { positionsState } from "../../states/positionsState";

export default function ChessPage() {
  const [savedPositions, setSavedPositions] = useRecoilState(positionsState);

  const savePosition = (position: string) => {
    setSavedPositions((prev) => [position, ...prev]);
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
        </section>
      </section>
    </div>
  );
}
