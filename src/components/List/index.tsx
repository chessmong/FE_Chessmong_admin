import { useState } from "react";
import styles from "./List.module.scss";
import { useLectures } from "../../apis/get/getLecturesList";
import Spinner from "../Layout/Spinner";
import { Lecture } from "./List.types";

export default function List() {
  const [fen, setFen] = useState("");
  const [triggeredFen, setTriggeredFen] = useState("");
  const { data, isLoading } = useLectures(triggeredFen);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFen(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && fen) {
      setTriggeredFen(fen);
    }
  };

  const handleLectureClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          className={styles.input}
          value={fen}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="검색할 FEN 코드를 입력하세요."
        />
      </div>
      <div className={styles.listContainer}>
        {isLoading ? (
          <Spinner />
        ) : data && data.length === 0 ? (
          <p>등록된 강의가 없습니다.</p>
        ) : (
          <div className={styles.innerContainer}>
            <ul className={styles.lectures}>
              {Array.isArray(data) &&
                data.map((lecture: Lecture, index: number) => (
                  <li key={index}>
                    <div
                      className={styles.lectureWrapper}
                      onClick={() => handleLectureClick(lecture.link)}
                    >
                      <img src={lecture.image} alt={lecture.title} width={100} height={80} />
                      <div className={styles.lectureInfo}>
                        <div>
                          <h3 className={styles.title}>{lecture.title}</h3>
                          <p className={styles.channelName}>{lecture.channelName}</p>
                        </div>
                        <p className={styles.publishedAt}>
                          {new Date(lecture.publishedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
