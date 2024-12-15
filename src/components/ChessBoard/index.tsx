import { useState, useEffect, useCallback, useMemo } from "react"; // useMemo를 추가
import { useRecoilState } from "recoil";
import { chessState } from "../../states/chessState";
import { positionsState } from "../../states/positionsState";
import Chessground from "@react-chess/chessground";
import "../../assets/chessground.base.css";
import "../../assets/chessground.brown.css";
import "../../assets/chessground.cburnett.css";
import { Chess, SQUARES, Square } from "chess.js";
import { Key } from "chessground/types";
import Button from "../Button";
import { useNavigate, useLocation } from "react-router-dom";
import { useAddLecture } from "../../apis/post/postAddLecture";
import Spinner from "../../components/Layout/Spinner";
import styles from "./ChessBoard.module.scss";

export default function ChessBoard() {
  const initialChess = useMemo(() => new Chess(), []);
  const [chess, setChess] = useRecoilState(chessState);
  const [savedPositions, setSavedPositions] = useRecoilState(positionsState);
  const [turnColor, setTurnColor] = useState<"white" | "black">("white");
  const [history, setHistory] = useState<string[]>([initialChess.fen()]);
  const [currentFen, setCurrentFen] = useState(initialChess.fen());
  const navigate = useNavigate();
  const { mutate, isLoading } = useAddLecture();
  const location = useLocation();
  const fen = chess.fen();
  const { url } = location.state || {};

  useEffect(() => {
    if (!url) {
      navigate("/");
    }
  }, [url, navigate]);

  useEffect(() => {
    setCurrentFen(fen);
  }, [fen]);

  useEffect(() => {
    setChess(new Chess());
    setSavedPositions([]);
    setHistory([initialChess.fen()]);
    setTurnColor("white");
  }, [initialChess, setChess, setSavedPositions]);

  const changeTurn = useCallback(() => {
    setTurnColor(turnColor === "white" ? "black" : "white");
  }, [turnColor]);

  const savePosition = useCallback(() => {
    const currentFen = fen;

    if (savedPositions.length === 0 || !savedPositions.includes(currentFen)) {
      setSavedPositions((prev) => [currentFen, ...prev]);
    } else {
      alert("이미 저장된 상태입니다!");
    }
  }, [fen, savedPositions, setSavedPositions]);

  const deleteMostRecentPosition = useCallback(() => {
    setSavedPositions((prev) => prev.slice(1));
  }, [setSavedPositions]);

  const deletePosition = (index: number) => {
    setSavedPositions((prev) => prev.filter((_, i) => i !== index));
  };

  const undoMove = useCallback(() => {
    if (history.length > 1) {
      const lastFen = history[history.length - 2];
      const newChess = new Chess(lastFen);
      setChess(newChess);
      setHistory(history.slice(0, -1));
    }
  }, [history, setChess]);

  const toDests = (chessInstance: typeof chess) => {
    const dests = new Map();
    SQUARES.forEach((s) => {
      const ms = chessInstance.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });
    return dests;
  };

  const config = {
    fen: fen,
    orientation: turnColor,
    turnColor: turnColor,
    highlight: {
      lastMove: true,
      check: true,
    },
    movable: {
      free: false,
      color: "both" as const,
      dests: toDests(chess),
    },
    events: {
      move: (orig: Key, dest: Key) => {
        const move = chess.move({
          from: orig as Square,
          to: dest as Square,
          promotion: "q",
        });
        if (move) {
          setHistory([...history, chess.fen()]);
          setChess(new Chess(chess.fen()));
        }
      },
    },
    premovable: {
      enabled: true,
      showDests: true,
    },
    draggable: {
      enabled: true,
      distance: 10,
      showGhost: true,
    },
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "s") {
        event.preventDefault();
        savePosition();
      } else if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        event.preventDefault();
        undoMove();
      } else if (event.key === "Delete") {
        event.preventDefault();
        deleteMostRecentPosition();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [savePosition, undoMove, deleteMostRecentPosition]);

  const handleSubmit = () => {
    mutate(
      { link: url, positions: savedPositions },
      {
        onSuccess: () => {
          setSavedPositions([]);
          setChess(new Chess());
          setHistory([initialChess.fen()]);
          setTurnColor("white");
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
        <section className={styles.section}>
          <div className={styles.chessContainer}>
            <Chessground key={fen} config={config} contained={true} />
          </div>
          <div className={styles.buttons}>
            <div onClick={changeTurn} role="button" tabIndex={0}>
              <Button onClick={undoMove}>흑백전환</Button>
            </div>
            <Button onClick={savePosition}>상태저장</Button>
            <Button onClick={undoMove}>되돌리기</Button>
          </div>
        </section>
        <section className={styles.section}>
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
          <div className={styles.buttons}>
            <Button onClick={handleSubmit} disabled={savedPositions.length === 0 || isLoading}>
              제출
            </Button>
          </div>
        </section>
      </section>
    </div>
  );
}
