import { useState, useEffect } from "react";
import { Smile, Frown, Flag } from "lucide-react";

const ROWS = 9;
const COLS = 9;
const MINES = 10;

type Cell = {
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
  neighborMines: number;
};

export default function Minesweeper() {
  const [grid, setGrid] = useState<Cell[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [minesLeft, setMinesLeft] = useState(MINES);

  const initializeGrid = () => {
    let newGrid = Array(ROWS)
      .fill(null)
      .map(() =>
        Array(COLS)
          .fill(null)
          .map(() => ({
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            neighborMines: 0,
          })),
      );

    let minesPlaced = 0;
    while (minesPlaced < MINES) {
      const r = Math.floor(Math.random() * ROWS);
      const c = Math.floor(Math.random() * COLS);
      if (!newGrid[r][c].isMine) {
        newGrid[r][c].isMine = true;
        minesPlaced++;
      }
    }

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!newGrid[r][c].isMine) {
          let count = 0;
          for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
              if (
                r + i >= 0 &&
                r + i < ROWS &&
                c + j >= 0 &&
                c + j < COLS &&
                newGrid[r + i][c + j].isMine
              ) {
                count++;
              }
            }
          }
          newGrid[r][c].neighborMines = count;
        }
      }
    }

    setGrid(newGrid);
    setGameOver(false);
    setWon(false);
    setMinesLeft(MINES);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const revealCell = (r: number, c: number) => {
    if (gameOver || won || grid[r][c].isRevealed || grid[r][c].isFlagged) return;

    const newGrid = [...grid];
    newGrid[r][c].isRevealed = true;

    if (newGrid[r][c].isMine) {
      setGameOver(true);
      // Reveal all mines
      for (let i = 0; i < ROWS; i++) {
        for (let j = 0; j < COLS; j++) {
          if (newGrid[i][j].isMine) newGrid[i][j].isRevealed = true;
        }
      }
      setGrid(newGrid);
      return;
    }

    if (newGrid[r][c].neighborMines === 0) {
      // flood fill
      const stack = [[r, c]];
      while (stack.length > 0) {
        const [cr, cc] = stack.pop()!;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const nr = cr + i,
              nc = cc + j;
            if (
              nr >= 0 &&
              nr < ROWS &&
              nc >= 0 &&
              nc < COLS &&
              !newGrid[nr][nc].isRevealed &&
              !newGrid[nr][nc].isFlagged
            ) {
              newGrid[nr][nc].isRevealed = true;
              if (newGrid[nr][nc].neighborMines === 0) stack.push([nr, nc]);
            }
          }
        }
      }
    }

    setGrid(newGrid);
    checkWin(newGrid);
  };

  const toggleFlag = (e: React.MouseEvent, r: number, c: number) => {
    e.preventDefault();
    if (gameOver || won || grid[r][c].isRevealed) return;

    const newGrid = [...grid];
    newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
    setMinesLeft((prev) => (newGrid[r][c].isFlagged ? prev - 1 : prev + 1));
    setGrid(newGrid);
  };

  const checkWin = (currentGrid: Cell[][]) => {
    let unrevealedSafe = 0;
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (!currentGrid[r][c].isRevealed && !currentGrid[r][c].isMine) unrevealedSafe++;
      }
    }
    if (unrevealedSafe === 0) setWon(true);
  };

  const getNumberColor = (num: number) => {
    const colors = [
      "#0000ff",
      "#008000",
      "#ff0000",
      "#000080",
      "#800000",
      "#008080",
      "#000000",
      "#808080",
    ];
    return colors[num - 1] || "#000";
  };

  if (grid.length === 0) return null;

  return (
    <div style={{ padding: "8px", background: "#c0c0c0", userSelect: "none" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "4px",
          borderTop: "2px solid #808080",
          borderLeft: "2px solid #808080",
          borderBottom: "2px solid #fff",
          borderRight: "2px solid #fff",
          marginBottom: "8px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            background: "#000",
            color: "#ff0000",
            fontFamily: "monospace",
            fontSize: "1.2rem",
            padding: "2px 4px",
            border: "1px inset #808080",
          }}
        >
          {minesLeft.toString().padStart(3, "0")}
        </div>
        <button
          onClick={initializeGrid}
          style={{
            width: 30,
            height: 30,
            background: "#c0c0c0",
            borderTop: "2px solid #fff",
            borderLeft: "2px solid #fff",
            borderBottom: "2px solid #808080",
            borderRight: "2px solid #808080",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          {gameOver ? <Frown size={20} /> : <Smile size={20} />}
        </button>
        <div
          style={{
            background: "#000",
            color: "#ff0000",
            fontFamily: "monospace",
            fontSize: "1.2rem",
            padding: "2px 4px",
            border: "1px inset #808080",
          }}
        >
          000
        </div>
      </div>

      <div
        style={{
          borderTop: "3px solid #808080",
          borderLeft: "3px solid #808080",
          borderBottom: "3px solid #fff",
          borderRight: "3px solid #fff",
          display: "inline-block",
        }}
      >
        {grid.map((row, r) => (
          <div key={r} style={{ display: "flex" }}>
            {row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                onClick={() => revealCell(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                style={{
                  width: 24,
                  height: 24,
                  background: cell.isRevealed ? "#c0c0c0" : "#c0c0c0",
                  borderTop: cell.isRevealed ? "1px solid #808080" : "2px solid #fff",
                  borderLeft: cell.isRevealed ? "1px solid #808080" : "2px solid #fff",
                  borderBottom: cell.isRevealed ? "none" : "2px solid #808080",
                  borderRight: cell.isRevealed ? "none" : "2px solid #808080",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                  color:
                    cell.isRevealed && cell.neighborMines > 0
                      ? getNumberColor(cell.neighborMines)
                      : "#000",
                  cursor: "pointer",
                }}
              >
                {cell.isRevealed ? (
                  cell.isMine ? (
                    "💣"
                  ) : cell.neighborMines > 0 ? (
                    cell.neighborMines
                  ) : (
                    ""
                  )
                ) : cell.isFlagged ? (
                  <Flag size={14} color="#ff0000" />
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
