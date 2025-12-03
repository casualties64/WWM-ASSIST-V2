import React, { useState, useEffect, useRef } from 'react';
import { BoardState, PieceColor, PieceType, Piece } from '../types';
import { getBestMove, boardToFen, initEngine } from '../services/xiangqiEngine';
import { Loader2, RefreshCw, Trash2, ArrowRight, Zap, AlertCircle, Sparkles, Wrench, Hand, Trophy, Cpu } from 'lucide-react';

const INITIAL_BOARD: BoardState = {
  // Black (Top)
  "0,0": { id: "br1", type: PieceType.ROOK, color: PieceColor.BLACK },
  "1,0": { id: "bn1", type: PieceType.HORSE, color: PieceColor.BLACK },
  "2,0": { id: "bb1", type: PieceType.ELEPHANT, color: PieceColor.BLACK },
  "3,0": { id: "ba1", type: PieceType.ADVISOR, color: PieceColor.BLACK },
  "4,0": { id: "bk", type: PieceType.KING, color: PieceColor.BLACK },
  "5,0": { id: "ba2", type: PieceType.ADVISOR, color: PieceColor.BLACK },
  "6,0": { id: "bb2", type: PieceType.ELEPHANT, color: PieceColor.BLACK },
  "7,0": { id: "bn2", type: PieceType.HORSE, color: PieceColor.BLACK },
  "8,0": { id: "br2", type: PieceType.ROOK, color: PieceColor.BLACK },
  "1,2": { id: "bc1", type: PieceType.CANNON, color: PieceColor.BLACK },
  "7,2": { id: "bc2", type: PieceType.CANNON, color: PieceColor.BLACK },
  "0,3": { id: "bp1", type: PieceType.PAWN, color: PieceColor.BLACK },
  "2,3": { id: "bp2", type: PieceType.PAWN, color: PieceColor.BLACK },
  "4,3": { id: "bp3", type: PieceType.PAWN, color: PieceColor.BLACK },
  "6,3": { id: "bp4", type: PieceType.PAWN, color: PieceColor.BLACK },
  "8,3": { id: "bp5", type: PieceType.PAWN, color: PieceColor.BLACK },

  // Red (Bottom)
  "0,9": { id: "rr1", type: PieceType.ROOK, color: PieceColor.RED },
  "1,9": { id: "rn1", type: PieceType.HORSE, color: PieceColor.RED },
  "2,9": { id: "rb1", type: PieceType.ELEPHANT, color: PieceColor.RED },
  "3,9": { id: "ra1", type: PieceType.ADVISOR, color: PieceColor.RED },
  "4,9": { id: "rk", type: PieceType.KING, color: PieceColor.RED },
  "5,9": { id: "ra2", type: PieceType.ADVISOR, color: PieceColor.RED },
  "6,9": { id: "rb2", type: PieceType.ELEPHANT, color: PieceColor.RED },
  "7,9": { id: "rn2", type: PieceType.HORSE, color: PieceColor.RED },
  "8,9": { id: "rr2", type: PieceType.ROOK, color: PieceColor.RED },
  "1,7": { id: "rc1", type: PieceType.CANNON, color: PieceColor.RED },
  "7,7": { id: "rc2", type: PieceType.CANNON, color: PieceColor.RED },
  "0,6": { id: "rp1", type: PieceType.PAWN, color: PieceColor.RED },
  "2,6": { id: "rp2", type: PieceType.PAWN, color: PieceColor.RED },
  "4,6": { id: "rp3", type: PieceType.PAWN, color: PieceColor.RED },
  "6,6": { id: "rp4", type: PieceType.PAWN, color: PieceColor.RED },
  "8,6": { id: "rp5", type: PieceType.PAWN, color: PieceColor.RED },
};

// Custom Piece Images
const PIECE_IMAGES: Record<string, string> = {
  // Red Pieces
  [`${PieceColor.RED}_${PieceType.KING}`]: "https://i.imgur.com/pcZiqVj.jpeg",
  [`${PieceColor.RED}_${PieceType.ADVISOR}`]: "https://i.imgur.com/jJsMtZM.jpeg",
  [`${PieceColor.RED}_${PieceType.ELEPHANT}`]: "https://i.imgur.com/9dICJlm.jpeg",
  [`${PieceColor.RED}_${PieceType.HORSE}`]: "https://i.imgur.com/2JbdoA0.jpeg",
  [`${PieceColor.RED}_${PieceType.ROOK}`]: "https://i.imgur.com/5mxOHC5.jpeg",
  [`${PieceColor.RED}_${PieceType.CANNON}`]: "https://i.imgur.com/4dnVhPE.jpeg",
  [`${PieceColor.RED}_${PieceType.PAWN}`]: "https://i.imgur.com/ISuiiBP.jpeg",

  // Black Pieces
  [`${PieceColor.BLACK}_${PieceType.KING}`]: "https://i.imgur.com/ySn5zBF.jpeg",
  [`${PieceColor.BLACK}_${PieceType.ADVISOR}`]: "https://i.imgur.com/xXF0ydt.jpeg",
  [`${PieceColor.BLACK}_${PieceType.ELEPHANT}`]: "https://i.imgur.com/jYLQQct.jpeg",
  [`${PieceColor.BLACK}_${PieceType.HORSE}`]: "https://i.imgur.com/AA2kSf1.jpeg",
  [`${PieceColor.BLACK}_${PieceType.ROOK}`]: "https://i.imgur.com/rL5jWOb.jpeg",
  [`${PieceColor.BLACK}_${PieceType.CANNON}`]: "https://i.imgur.com/3vuXn7D.jpeg",
  [`${PieceColor.BLACK}_${PieceType.PAWN}`]: "https://i.imgur.com/3HanMGR.jpeg",
};

const SETUP_TOOLS = [
  { type: PieceType.KING, color: PieceColor.RED },
  { type: PieceType.ADVISOR, color: PieceColor.RED },
  { type: PieceType.ELEPHANT, color: PieceColor.RED },
  { type: PieceType.HORSE, color: PieceColor.RED },
  { type: PieceType.ROOK, color: PieceColor.RED },
  { type: PieceType.CANNON, color: PieceColor.RED },
  { type: PieceType.PAWN, color: PieceColor.RED },
  { type: PieceType.KING, color: PieceColor.BLACK },
  { type: PieceType.ADVISOR, color: PieceColor.BLACK },
  { type: PieceType.ELEPHANT, color: PieceColor.BLACK },
  { type: PieceType.HORSE, color: PieceColor.BLACK },
  { type: PieceType.ROOK, color: PieceColor.BLACK },
  { type: PieceType.CANNON, color: PieceColor.BLACK },
  { type: PieceType.PAWN, color: PieceColor.BLACK },
];

// --- Helper Functions for Validation ---

const isPathClear = (board: BoardState, fromX: number, fromY: number, toX: number, toY: number): boolean => {
  const dx = Math.sign(toX - fromX);
  const dy = Math.sign(toY - fromY);
  let x = fromX + dx;
  let y = fromY + dy;
  while (x !== toX || y !== toY) {
    if (board[`${x},${y}`]) return false;
    x += dx;
    y += dy;
  }
  return true;
};

const countObstacles = (board: BoardState, fromX: number, fromY: number, toX: number, toY: number): number => {
  const dx = Math.sign(toX - fromX);
  const dy = Math.sign(toY - fromY);
  let x = fromX + dx;
  let y = fromY + dy;
  let count = 0;
  while (x !== toX || y !== toY) {
    if (board[`${x},${y}`]) count++;
    x += dx;
    y += dy;
  }
  return count;
};

const areKingsFacing = (board: BoardState): boolean => {
  let redKingPos: {x: number, y: number} | null = null;
  let blackKingPos: {x: number, y: number} | null = null;

  for (const key in board) {
    const p = board[key];
    if (p.type === PieceType.KING) {
      const [kx, ky] = key.split(',').map(Number);
      if (p.color === PieceColor.RED) redKingPos = { x: kx, y: ky };
      else blackKingPos = { x: kx, y: ky };
    }
  }

  if (!redKingPos || !blackKingPos) return false;
  if (redKingPos.x !== blackKingPos.x) return false;

  const fileX = redKingPos.x;
  const minY = Math.min(redKingPos.y, blackKingPos.y);
  const maxY = Math.max(redKingPos.y, blackKingPos.y);

  for (let y = minY + 1; y < maxY; y++) {
    if (board[`${fileX},${y}`]) return false; 
  }

  return true; 
};

const isGeometryValid = (fromX: number, fromY: number, toX: number, toY: number, piece: Piece, board: BoardState): boolean => {
  const dx = toX - fromX;
  const dy = toY - fromY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  const targetKey = `${toX},${toY}`;
  const targetPiece = board[targetKey];

  if (toX < 0 || toX > 8 || toY < 0 || toY > 9) return false;
  if (targetPiece && targetPiece.color === piece.color) return false;

  switch (piece.type) {
    case PieceType.KING:
      if (!((absDx === 1 && absDy === 0) || (absDx === 0 && absDy === 1))) return false;
      if (toX < 3 || toX > 5) return false;
      if (piece.color === PieceColor.RED) {
        if (toY < 7 || toY > 9) return false;
      } else {
        if (toY < 0 || toY > 2) return false;
      }
      return true;

    case PieceType.ADVISOR:
      if (absDx !== 1 || absDy !== 1) return false;
      if (toX < 3 || toX > 5) return false;
      if (piece.color === PieceColor.RED) {
        if (toY < 7 || toY > 9) return false;
      } else {
        if (toY < 0 || toY > 2) return false;
      }
      return true;

    case PieceType.ELEPHANT:
      if (absDx !== 2 || absDy !== 2) return false;
      if (piece.color === PieceColor.RED) {
        if (toY < 5) return false;
      } else {
        if (toY > 4) return false;
      }
      const eyeX = fromX + dx / 2;
      const eyeY = fromY + dy / 2;
      if (board[`${eyeX},${eyeY}`]) return false;
      return true;

    case PieceType.HORSE:
      if (!((absDx === 1 && absDy === 2) || (absDx === 2 && absDy === 1))) return false;
      if (absDx === 2) {
        if (board[`${fromX + Math.sign(dx)},${fromY}`]) return false;
      } else {
        if (board[`${fromX},${fromY + Math.sign(dy)}`]) return false;
      }
      return true;

    case PieceType.ROOK:
      if (fromX !== toX && fromY !== toY) return false;
      if (!isPathClear(board, fromX, fromY, toX, toY)) return false;
      return true;

    case PieceType.CANNON:
      if (fromX !== toX && fromY !== toY) return false;
      const obstacles = countObstacles(board, fromX, fromY, toX, toY);
      if (targetPiece) {
        return obstacles === 1;
      } else {
        return obstacles === 0;
      }

    case PieceType.PAWN:
      if (!((absDx === 1 && absDy === 0) || (absDx === 0 && absDy === 1))) return false;
      if (piece.color === PieceColor.RED) {
        if (toY > fromY) return false;
      } else {
        if (toY < fromY) return false;
      }
      const crossedRiver = piece.color === PieceColor.RED ? fromY <= 4 : fromY >= 5;
      if (!crossedRiver) {
        if (absDx !== 0) return false;
      }
      return true;
  }
};

const isValidMove = (board: BoardState, fromX: number, fromY: number, toX: number, toY: number, turn: PieceColor): boolean => {
  const piece = board[`${fromX},${fromY}`];
  if (!piece) return false;
  if (piece.color !== turn) return false;

  if (!isGeometryValid(fromX, fromY, toX, toY, piece, board)) return false;

  const nextBoard = { ...board };
  delete nextBoard[`${fromX},${fromY}`];
  nextBoard[`${toX},${toY}`] = piece;

  if (areKingsFacing(nextBoard)) return false;

  return true;
};

const PieceIcon: React.FC<{ type: PieceType; color: PieceColor }> = ({ type, color }) => {
  const key = `${color}_${type}`;
  const imageUrl = PIECE_IMAGES[key];

  if (imageUrl) {
    return (
      <img 
        src={imageUrl} 
        alt={`${color} ${type}`} 
        className="w-full h-full object-cover rounded-full pointer-events-none select-none shadow-sm"
        draggable={false} // Prevent default drag of image to allow our custom drag
      />
    );
  }
  return <div className="w-full h-full rounded-full bg-gray-500" />;
};

export const XiangqiBoard: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(INITIAL_BOARD);
  const [turn, setTurn] = useState<PieceColor>(PieceColor.RED);
  const [winner, setWinner] = useState<PieceColor | null>(null);
  const [selectedPos, setSelectedPos] = useState<{ x: number, y: number } | null>(null);
  const [lastMove, setLastMove] = useState<{ from: string, to: string } | null>(null);
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ bestMove: any, explanation: string } | null>(null);
  
  const [autoAnalyze, setAutoAnalyze] = useState(false);
  const currentFenRef = useRef("");

  // Setup Mode State
  const [setupMode, setSetupMode] = useState(false);
  const [setupTool, setSetupTool] = useState<{type: PieceType, color: PieceColor} | 'delete' | null>(null);

  // Drag State
  const [draggedItem, setDraggedItem] = useState<{type: PieceType, color: PieceColor, from?: string} | null>(null);

  // Load Engine on Mount
  useEffect(() => {
    initEngine();
  }, []);

  const handleAnalyze = async () => {
    if (winner) return;

    const fenToAnalyze = boardToFen(board, turn);
    
    setIsAnalyzing(true);
    setAnalysisError(false);

    if (!autoAnalyze) {
      setAnalysisResult(null);
    }
    
    try {
        // Use local Engine service
        const result = await getBestMove(fenToAnalyze, 3); // Depth 3
        
        // Stale check
        if (fenToAnalyze !== currentFenRef.current) {
          setIsAnalyzing(false);
          return;
        }
        
        if (result && result.bestMove) {
            // Validate the move suggested by Engine against JS rules to be safe
            const [fx, fy] = result.bestMove.from;
            const [tx, ty] = result.bestMove.to;
            const isLegal = isValidMove(board, fx, fy, tx, ty, turn);

            if (isLegal) {
                setAnalysisResult(result);
                setAnalysisError(false);
            } else {
                console.warn("Engine suggested illegal move:", result.bestMove);
                setAnalysisError(true);
                if (!autoAnalyze) setAnalysisResult(null);
            }
        } else {
            setAnalysisError(true);
            if (!autoAnalyze) setAnalysisResult(null);
        }
    } catch (e) {
        console.error("Engine Error", e);
        setAnalysisError(true);
    }
    
    setIsAnalyzing(false);
  };

  // Auto-Analyze Effect (Triggers on Board/Turn Change)
  useEffect(() => {
    if (setupMode || winner) return;

    const newFen = boardToFen(board, turn);
    currentFenRef.current = newFen;

    if (autoAnalyze) {
      // ONLY analyze automatically if it is RED's turn.
      if (turn === PieceColor.RED) {
          handleAnalyze();
      } else {
          setAnalysisResult(null);
      }
    }
  }, [board, turn, autoAnalyze, setupMode, winner]);

  // Robust Retry: If Auto-Analyze is on but errored, retry periodically
  useEffect(() => {
    let retryTimer: ReturnType<typeof setTimeout>;
    // Only retry if it's Red's turn in auto mode and not currently analyzing and not game over
    if (autoAnalyze && analysisError && !setupMode && !isAnalyzing && turn === PieceColor.RED && !winner) {
        retryTimer = setTimeout(() => {
            handleAnalyze();
        }, 2000);
    }
    return () => clearTimeout(retryTimer);
  }, [analysisError, autoAnalyze, setupMode, isAnalyzing, turn, winner]);

  // --- Drag and Drop Handlers ---
  const handleDragStart = (e: React.DragEvent, item: {type: PieceType, color: PieceColor}, fromKey?: string) => {
      if (winner && !setupMode) return;
      setDraggedItem({ ...item, from: fromKey });
      e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, x: number, y: number) => {
      e.preventDefault();
      if (!setupMode || !draggedItem) return;

      const newBoard = { ...board };
      const targetKey = `${x},${y}`;

      // If moved from another square, delete original
      if (draggedItem.from) {
          delete newBoard[draggedItem.from];
      }

      // Place piece
      newBoard[targetKey] = {
          id: `${draggedItem.color}_${draggedItem.type}_${Date.now()}`,
          type: draggedItem.type,
          color: draggedItem.color
      };

      setBoard(newBoard);
      setDraggedItem(null);
      setAnalysisResult(null);
  };

  const handleSquareClick = (x: number, y: number) => {
    if (winner && !setupMode) return;

    const key = `${x},${y}`;

    // --- SETUP MODE LOGIC ---
    if (setupMode) {
      if (!setupTool) return;
      
      const newBoard = { ...board };
      if (setupTool === 'delete') {
        delete newBoard[key];
      } else {
        newBoard[key] = {
          id: `${setupTool.color}_${setupTool.type}_${Date.now()}`,
          type: setupTool.type,
          color: setupTool.color
        };
      }
      setBoard(newBoard);
      setAnalysisResult(null);
      return;
    }

    // --- PLAY MODE LOGIC ---
    const clickedPiece = board[key];
    const selectedPiece = selectedPos ? board[`${selectedPos.x},${selectedPos.y}`] : null;

    // 1. Clicked own piece? Select it (or change selection)
    if (clickedPiece && clickedPiece.color === turn) {
        setSelectedPos({ x, y });
        return;
    }

    // 2. Try to move selected piece to clicked square
    if (selectedPos && selectedPiece) {
        // Is move valid?
        if (isValidMove(board, selectedPos.x, selectedPos.y, x, y, turn)) {
            const newBoard = { ...board };
            
            // --- GAME OVER LOGIC ---
            // If capturing a King/General, the current player wins immediately
            let isGameOver = false;
            if (clickedPiece && clickedPiece.type === PieceType.KING) {
                setWinner(turn); // If Red captures, Red wins. If Black captures, Black wins.
                isGameOver = true;
            }

            // Execute move
            delete newBoard[`${selectedPos.x},${selectedPos.y}`];
            newBoard[key] = selectedPiece;
            
            setBoard(newBoard);
            setLastMove({ from: `${selectedPos.x},${selectedPos.y}`, to: key });
            setSelectedPos(null);
            setAnalysisResult(null);
            
            // Only switch turn if the game is NOT over
            if (!isGameOver) {
                setTurn(turn === PieceColor.RED ? PieceColor.BLACK : PieceColor.RED);
            }
        } else {
            // Invalid move, just deselect
            setSelectedPos(null);
        }
    }
  };

  const resetBoard = () => {
    setBoard(INITIAL_BOARD);
    setTurn(PieceColor.RED);
    setWinner(null);
    setSelectedPos(null);
    setLastMove(null);
    setAnalysisResult(null);
    setAnalysisError(false);
  };

  const clearBoard = () => {
    setBoard({});
    setTurn(PieceColor.RED);
    setWinner(null);
    setSelectedPos(null);
    setLastMove(null);
    setAnalysisResult(null);
    setAnalysisError(false);
  };

  // --- Rendering Helpers ---
  
  // Grid Lines
  const renderGridLines = () => {
    const lines = [];
    // Horizontal Lines (10)
    for (let i = 0; i < 10; i++) {
        const top = (i * 10) + 5;
        lines.push(
            <div key={`h-${i}`} className="absolute bg-stone-500/50 h-[1px] w-[90%]" style={{ top: `${top}%`, left: '5%' }} />
        );
    }
    // Vertical Lines (9)
    for (let i = 0; i < 9; i++) {
        const left = (i * 11.25) + 5;
        // Top Half
        lines.push(
            <div key={`v-t-${i}`} className="absolute bg-stone-500/50 w-[1px] h-[40%]" style={{ left: `${left}%`, top: '5%' }} />
        );
        // Bottom Half
        lines.push(
            <div key={`v-b-${i}`} className="absolute bg-stone-500/50 w-[1px] h-[40%]" style={{ left: `${left}%`, top: '55%' }} />
        );
        // Connect river for edges
        if (i === 0 || i === 8) {
            lines.push(
                <div key={`v-m-${i}`} className="absolute bg-stone-500/50 w-[1px] h-[10%]" style={{ left: `${left}%`, top: '45%' }} />
            );
        }
    }
    return lines;
  };

  const renderIntersections = () => {
    const intersections = [];
    for (let y = 0; y < 10; y++) {
      for (let x = 0; x < 9; x++) {
        const key = `${x},${y}`;
        const piece = board[key];
        const isSelected = selectedPos?.x === x && selectedPos?.y === y;
        const isLastMoveSrc = lastMove?.from === key;
        const isLastMoveDst = lastMove?.to === key;
        
        let isHint = false;
        if (selectedPos && !piece) {
             // Check if valid move for selected piece
             if (isValidMove(board, selectedPos.x, selectedPos.y, x, y, turn)) {
                isHint = true;
             }
        }
        // Also hint captures
        if (selectedPos && piece && piece.color !== turn) {
             if (isValidMove(board, selectedPos.x, selectedPos.y, x, y, turn)) {
                isHint = true;
             }
        }

        intersections.push(
          <div 
            key={key}
            onClick={() => handleSquareClick(x, y)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, x, y)}
            className={`absolute w-[13%] h-[11.5%] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer 
                ${isHint ? 'z-30' : 'z-20'}
            `}
            style={{ left: `${(x * 11.25) + 5}%`, top: `${(y * 10) + 5}%` }}
          >
             {/* Interaction Target */}
             <div className="w-full h-full opacity-0 hover:opacity-10 bg-amber-400 rounded-full transition-opacity absolute" />

             {/* Move Hint Dot */}
             {isHint && (
                <div className="w-4 h-4 bg-green-500/80 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.6)] animate-pulse pointer-events-none absolute z-40" />
             )}

             {/* Piece */}
             {piece && (
                <div 
                    className={`
                        w-[90%] h-[90%] rounded-full shadow-lg relative transition-transform duration-200
                        ${isSelected ? 'ring-2 ring-amber-400 scale-110 z-30' : ''}
                        ${isLastMoveSrc || isLastMoveDst ? 'ring-2 ring-blue-500/50' : ''}
                        ${draggedItem?.from === key ? 'opacity-50' : 'opacity-100'}
                    `}
                    draggable={setupMode}
                    onDragStart={(e) => handleDragStart(e, piece, key)}
                >
                     <PieceIcon type={piece.type} color={piece.color} />
                </div>
             )}
          </div>
        );
      }
    }
    return intersections;
  };

  // Calculate Arrow SVG Coords
  const getArrowCoords = () => {
    if (!analysisResult?.bestMove) return null;
    const { from, to } = analysisResult.bestMove;
    const [fx, fy] = from;
    const [tx, ty] = to;

    const startX = (fx * 11.25) + 5;
    const startY = (fy * 10) + 5;
    const endX = (tx * 11.25) + 5;
    const endY = (ty * 10) + 5;

    return { startX, startY, endX, endY };
  };

  const arrow = getArrowCoords();

  return (
    <div className="flex flex-col lg:flex-row h-full w-full bg-stone-900 overflow-y-auto lg:overflow-hidden relative">
      
      {/* Game Over Overlay */}
      {winner && (
        <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center z-50 animate-in fade-in zoom-in duration-300 backdrop-blur-sm">
            <Trophy size={80} className="text-yellow-500 mb-6 drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
            <h2 className="text-5xl font-black text-white mb-2 tracking-wider drop-shadow-lg uppercase">
                {winner === PieceColor.RED ? "Red Wins!" : "Black Wins!"}
            </h2>
            <p className="text-stone-400 mb-8 text-lg font-medium">The General has been captured.</p>
            <button 
                onClick={resetBoard}
                className="px-8 py-3 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-amber-900/50 hover:scale-105 flex items-center gap-2"
            >
                <RefreshCw size={22} /> Play Again
            </button>
        </div>
      )}

      {/* --- Main Board Area --- */}
      <div className="flex-1 relative flex items-center justify-center p-2 lg:p-8 overflow-y-auto min-h-[500px]">
        {/* Board Container */}
        <div className="relative aspect-[9/10] h-full max-h-[800px] w-full max-w-[720px] bg-[#eecfa1] rounded shadow-2xl select-none ring-8 ring-[#5d4037]">
            
            {/* Grid & Markings */}
            <div className="absolute inset-0 pointer-events-none">
                {renderGridLines()}
                
                {/* River */}
                <div className="absolute w-full top-[45%] h-[10%] flex items-center justify-center text-[#5d4037]/40 font-serif text-3xl font-bold tracking-[2em] uppercase select-none pointer-events-none">
                    River
                </div>

                {/* Palace Diagonals Top */}
                <svg className="absolute top-[5%] left-[38.75%] w-[22.5%] h-[20%] pointer-events-none stroke-stone-500/50" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100" y2="100" strokeWidth="1" />
                    <line x1="100" y1="0" x2="0" y2="100" strokeWidth="1" />
                </svg>
                {/* Palace Diagonals Bottom */}
                <svg className="absolute top-[75%] left-[38.75%] w-[22.5%] h-[20%] pointer-events-none stroke-stone-500/50" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="0" y1="0" x2="100" y2="100" strokeWidth="1" />
                    <line x1="100" y1="0" x2="0" y2="100" strokeWidth="1" />
                </svg>
            </div>

            {/* Analysis Arrow Overlay */}
            {arrow && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-40" style={{ filter: 'drop-shadow(0px 2px 2px rgba(0,0,0,0.3))' }}>
                    <defs>
                        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                            <polygon points="0 0, 6 2, 0 4" fill="#22c55e" />
                        </marker>
                    </defs>
                    <line 
                        x1={`${arrow.startX}%`} y1={`${arrow.startY}%`} 
                        x2={`${arrow.endX}%`} y2={`${arrow.endY}%`} 
                        stroke="#22c55e" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.8"
                        markerEnd="url(#arrowhead)"
                        className="animate-in fade-in duration-300"
                    />
                    <circle cx={`${arrow.startX}%`} cy={`${arrow.startY}%`} r="6" fill="#22c55e" fillOpacity="0.5" />
                </svg>
            )}

            {/* Pieces & Click Targets */}
            {renderIntersections()}

        </div>
      </div>

      {/* --- Sidebar / Controls --- */}
      <div className="lg:w-96 w-full bg-stone-950 border-l border-stone-800 flex flex-col shrink-0 lg:h-full z-20 shadow-2xl">
        
        {/* Header / Status */}
        <div className="p-4 border-b border-stone-800 bg-stone-900/50">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg lg:text-xl font-bold text-amber-500 flex items-center gap-2">
                    <Cpu size={20} /> Fairy Stockfish AI
                </h2>

                {/* Mobile Analyze Button */}
                {!setupMode && !winner && turn === PieceColor.RED && !autoAnalyze && (
                    <button 
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="lg:hidden p-2 bg-amber-600 text-white rounded-lg shadow-md flex items-center justify-center active:scale-95 transition-transform disabled:opacity-50"
                        aria-label="Analyze Position"
                    >
                        {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <Zap size={20} />}
                    </button>
                )}

                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                    winner ? 'bg-stone-700 text-stone-400' :
                    turn === PieceColor.RED ? 'bg-red-900/50 text-red-400 border border-red-800' : 'bg-stone-800 text-stone-300 border border-stone-700'
                }`}>
                    {winner ? "Game Over" : `${turn === PieceColor.RED ? "Red" : "Black"}'s Turn`}
                </div>
             </div>

             {/* Auto-Suggest Toggle */}
             {!setupMode && !winner && (
                 <div className="flex items-center justify-between bg-stone-900 p-3 rounded-lg border border-stone-800 mb-2">
                    <span className="text-sm text-stone-300 font-medium">Auto-Suggest</span>
                    <button 
                        onClick={() => {
                            const newState = !autoAnalyze;
                            setAutoAnalyze(newState);
                            if (newState && turn === PieceColor.RED) handleAnalyze();
                            else if (!newState) setAnalysisResult(null);
                        }}
                        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none shrink-0 ${autoAnalyze ? 'bg-green-600' : 'bg-stone-700'}`}
                    >
                        <span className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 ease-in-out ${autoAnalyze ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                 </div>
             )}
             
             {/* Analysis Status Text */}
             {autoAnalyze && !winner && !setupMode && (
                 <div className="text-xs text-center mt-2 font-mono">
                     {isAnalyzing ? (
                         <span className="text-amber-400 animate-pulse flex items-center justify-center gap-2"><Loader2 size={12} className="animate-spin"/> Engine Calculating...</span>
                     ) : analysisError ? (
                         <span className="text-red-400 flex items-center justify-center gap-2"><AlertCircle size={12}/> Analysis failed. Retrying...</span>
                     ) : turn === PieceColor.BLACK ? (
                         <span className="text-stone-500 flex items-center justify-center gap-2"><Hand size={12}/> Waiting for Black manual move...</span>
                     ) : (
                         <span className="text-green-400 flex items-center justify-center gap-2"><Zap size={12}/> Auto-Suggest Active</span>
                     )}
                 </div>
             )}
        </div>

        {/* Content Area (Analysis or Setup) */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            
            {setupMode ? (
                // --- SETUP PALETTE ---
                <div className="animate-in slide-in-from-right duration-300">
                    <div className="bg-amber-900/10 border border-amber-800/30 p-3 rounded-lg mb-4 text-xs text-amber-500 flex items-center gap-2">
                        <Wrench size={14} /> Drag pieces to board. Drag off to delete.
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 mb-6">
                        {SETUP_TOOLS.map((tool, i) => (
                            <div 
                                key={i}
                                draggable
                                onDragStart={(e) => handleDragStart(e, tool)}
                                onClick={() => setSetupTool(tool)}
                                className={`
                                    aspect-square rounded-full cursor-grab active:cursor-grabbing p-1 transition-transform hover:scale-105
                                    ${setupTool !== 'delete' && setupTool?.type === tool.type && setupTool?.color === tool.color ? 'ring-2 ring-amber-500 bg-amber-500/20' : 'bg-stone-900'}
                                `}
                            >
                                <PieceIcon type={tool.type} color={tool.color} />
                            </div>
                        ))}
                    </div>
                    
                    <button
                        onClick={() => setSetupTool('delete')}
                        onDragOver={handleDragOver}
                        onDrop={() => setSetupTool('delete')} // Logic handled in drag end conceptually, but trash zone is useful
                        className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                            setupTool === 'delete' ? 'bg-red-900/50 text-red-400 ring-1 ring-red-500' : 'bg-stone-900 text-stone-500 hover:bg-stone-800'
                        }`}
                    >
                        <Trash2 size={18} /> Delete Mode / Trash Zone
                    </button>
                    
                    <button 
                         onClick={clearBoard}
                         className="w-full mt-4 py-2 border border-stone-700 text-stone-400 rounded hover:bg-stone-800 transition-colors text-sm"
                    >
                        Clear Board
                    </button>
                </div>
            ) : (
                // --- ANALYSIS RESULTS ---
                <div className="space-y-4">
                    {isAnalyzing ? (
                        <div className="h-40 flex flex-col items-center justify-center text-stone-500 space-y-3">
                            <Loader2 className="animate-spin text-amber-600" size={32} />
                            <p className="text-sm font-medium">Stockfish is calculating...</p>
                        </div>
                    ) : analysisResult ? (
                        <div className="bg-stone-900/80 p-5 rounded-xl border border-stone-800 animate-in fade-in slide-in-from-bottom-2">
                            <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-800">
                                <span className="text-xs font-bold uppercase text-stone-500 tracking-wider">Best Move</span>
                                <span className="text-amber-500 font-mono font-bold text-lg">{analysisResult.bestMove.notation}</span>
                            </div>
                            
                            <div className="flex items-center gap-4 mb-4">
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 bg-stone-800 rounded-full flex items-center justify-center text-stone-400 font-mono text-xs">
                                        {analysisResult.bestMove.from.join(',')}
                                    </div>
                                    <span className="text-[10px] text-stone-600 uppercase">From</span>
                                </div>
                                <ArrowRight className="text-stone-600" />
                                <div className="flex flex-col items-center gap-1">
                                    <div className="w-10 h-10 bg-emerald-900/30 border border-emerald-800 text-emerald-400 rounded-full flex items-center justify-center font-mono text-xs shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                                        {analysisResult.bestMove.to.join(',')}
                                    </div>
                                    <span className="text-[10px] text-stone-600 uppercase">To</span>
                                </div>
                            </div>
                            
                            <div className="bg-stone-950 p-3 rounded-lg border-l-2 border-amber-600">
                                <p className="text-sm text-stone-300 leading-relaxed italic">
                                    "{analysisResult.explanation}"
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="h-40 flex flex-col items-center justify-center text-stone-600 text-center p-4">
                            <Sparkles size={32} className="mb-2 opacity-20" />
                            <p className="text-sm">
                                {turn === PieceColor.RED 
                                    ? "Ready to analyze Red's position." 
                                    : "Waiting for Black to move..."}
                            </p>
                        </div>
                    )}
                    
                    {/* Manual Analyze Button (Fallback or Primary) */}
                    {(!autoAnalyze || analysisError) && !winner && turn === PieceColor.RED && (
                        <button 
                            onClick={handleAnalyze}
                            disabled={isAnalyzing}
                            className="w-full py-4 bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-900/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                        >
                            {isAnalyzing ? <Loader2 className="animate-spin" /> : <Zap className="group-hover:text-yellow-200 transition-colors" />}
                            {analysisError ? "Retry Analysis" : "Analyze Position"}
                        </button>
                    )}
                </div>
            )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-stone-800 bg-stone-900/50 flex gap-2">
            <button 
                onClick={() => setSetupMode(!setupMode)}
                className={`flex-1 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm ${
                    setupMode ? 'bg-amber-600 text-white' : 'bg-stone-800 text-stone-400 hover:bg-stone-700'
                }`}
            >
                <Wrench size={16} /> {setupMode ? 'Done' : 'Setup Board'}
            </button>
            
            <button 
                onClick={resetBoard}
                className="px-4 py-3 bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 rounded-lg transition-colors"
                title="Reset Board"
            >
                <RefreshCw size={18} />
            </button>
        </div>
      </div>
      
    </div>
  );
};