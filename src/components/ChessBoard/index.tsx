import { useState } from 'react';
import Chessground from '@react-chess/chessground';
import styles from './ChessBoard.module.scss';
import '../../assets/chessground.base.css';
import '../../assets/chessground.brown.css';
import '../../assets/chessground.cburnett.css';
import turnicon from '../../assets/icons/turn-icon.svg';
import { Chess, ChessInstance, SQUARES, Square } from 'chess.js';
import { Key } from 'chessground/types';

export default function ChessBoard() {
  const [isRotated, setIsRotated] = useState(false);
  const [turnColor, setTurnColor] = useState<'white' | 'black'>('white');
  const [chess, setChess] = useState(
    new Chess('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1')
  );
  const [chessFen, setChessFen] = useState(chess.fen());

  const changeTurn = () => {
    setTurnColor(turnColor === 'white' ? 'black' : 'white');
    setIsRotated((prev) => !prev);
  };

  const toDests = (chess: ChessInstance) => {
    const dests = new Map();
    SQUARES.forEach((s) => {
      const ms = chess.moves({ square: s, verbose: true });
      if (ms.length)
        dests.set(
          s,
          ms.map((m) => m.to)
        );
    });
    return dests;
  };

  const config = {
    fen: chessFen,
    orientation: turnColor,
    turnColor: turnColor,
    highlight: {
      lastMove: true,
      check: true,
    },
    movable: {
      free: false,
      color: 'both' as const,
      dests: toDests(chess),
    },
    events: {
      move: (orig: Key, dest: Key) => {
        const move = chess.move({
          from: orig as Square,
          to: dest as Square,
          promotion: 'q',
        });
        if (move) {
          setChessFen(chess.fen());
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
