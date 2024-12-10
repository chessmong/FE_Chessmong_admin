import Button from "../../components/Button";
import ChessBoard from "../../components/ChessBoard";
import styles from "./ChessPage.module.scss";

export default function ChessPage() {
  return (
    <div className={styles.container}>
      <section className={styles.sectionContainer}>
        <section className={styles.leftSection}>
          <ChessBoard />
          <div className={styles.buttonContainer}>
            <Button text="상태저장" />
            <Button text="되돌리기" />
          </div>
        </section>
        <section className={styles.rightSection}>
          <div className={styles.positionContainer}></div>
          <div className={styles.rightButtonContainer}>
            <Button text="다음" />
          </div>
        </section>
      </section>
    </div>
  );
}
