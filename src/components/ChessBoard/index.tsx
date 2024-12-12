import { useState } from "react";
import Chessground from "@react-chess/chessground";
import styles from "./ChessBoard.module.scss";
import "../../assets/chessground.base.css";
import "../../assets/chessground.brown.css";
import "../../assets/chessground.cburnett.css";
import turnicon from "../../assets/icons/turn-icon.svg";
import { Chess, SQUARES, Square } from "chess.js";
import { Key } from "chessground/types";
import { useRecoilState } from "recoil";
import { chessState } from "../../states/chessState";
import Button from "../Button";
import { ChessBoardProps } from "./ChessBoard.types";

export default function ChessBoard({ onSavePosition }: ChessBoardProps) {
  const [chess, setChess] = useRecoilState(chessState);
  const [turnColor, setTurnColor] = useState<"white" | "black">("white");
  const [isRotated, setIsRotated] = useState(false);
  const [history, setHistory] = useState<string[]>([chess.fen()]);

  const changeTurn = () => {
    setTurnColor(turnColor === "white" ? "black" : "white");
    setIsRotated((prev) => !prev);
  };

  const savePosition = () => {
    onSavePosition(chess.fen());
  };

  const undoMove = () => {
    if (history.length > 1) {
      const lastFen = history[history.length - 2];
      const newChess = new Chess(lastFen);
      setChess(newChess);
      setHistory(history.slice(0, -1));
    }
  };

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
    fen: chess.fen(),
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

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div
          className={`${styles.changeTurn} ${isRotated && styles.rotated}`}
          onClick={changeTurn}
          role="button"
          tabIndex={0}
        >
          <img src={turnicon} alt="흑백전환" width={60} height={60} />
        </div>
        <div className={styles.chessContainer}>
          <Chessground key={chess.fen()} config={config} contained={true} />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.button}>
          <Button onClick={savePosition}>상태저장</Button>
        </div>
        <div className={styles.rightButton}>
          <Button onClick={undoMove}>되돌리기</Button>
        </div>
      </div>
    </div>
  );
}
