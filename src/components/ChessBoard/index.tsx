import { useState } from "react";
import Chessground from "@react-chess/chessground";
import styles from "./ChessBoard.module.scss";
import "../../assets/chessground.base.css";
import "../../assets/chessground.brown.css";
import "../../assets/chessground.cburnett.css";
import turnicon from "../../assets/icons/turn-icon.svg";

export default function ChessBoard() {
  const [isRotated, setIsRotated] = useState(false);
  const [turnColor, setTurnColor] = useState<"white" | "black">("white");

  const changeTurn = () => {
    setTurnColor(turnColor === "white" ? "black" : "white");
    setIsRotated((prev) => !prev);
  };

  const config = {
    fen: "start",
    orientation: turnColor,
    turnColor: turnColor,
    highlight: {
      lastMove: true,
      check: true,
    },
    movable: {
      free: true,
      color: turnColor,
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
      <div
        className={`${styles.changeTurn} ${isRotated && styles.rotated}`}
        onClick={changeTurn}
        role="button"
        tabIndex={0}
      >
        <img src={turnicon} alt="흑백전환" width={60} height={60} />
      </div>
      <div className={styles.chessContainer}>
        <Chessground config={config} contained={true} />
      </div>
    </div>
  );
}
