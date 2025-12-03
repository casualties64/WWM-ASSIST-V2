import { BoardState, PieceColor, PieceType } from '../types';

let ffishInstance: any = null;
let engineReady = false;

// Initialize the WASM module
export const initEngine = async () => {
    if (ffishInstance) return;
    try {
        // Dynamic import to prevent bundle crash if module format is incompatible
        // We use a try-catch block specifically around the import for robustness
        let Module;
        try {
            // @ts-ignore
            const moduleImport = await import('ffish-es6');
            Module = moduleImport.default || moduleImport;
        } catch (importError) {
            console.warn("Could not import ffish-es6 locally. This is expected in some preview environments.", importError);
            return;
        }

        if (Module) {
            ffishInstance = await Module({
                locateFile: (path: string) => {
                    if (path.endsWith('.wasm')) {
                        // Use unpkg as a reliable CDN for the WASM file
                        return 'https://unpkg.com/ffish-es6@0.7.8/ffish.wasm';
                    }
                    return path;
                }
            });
            engineReady = true;
            console.log("Xiangqi Engine Initialized");
        }
    } catch (e) {
        console.error("Failed to load Xiangqi Engine:", e);
    }
};

// --- Evaluation Constants ---
const PIECE_VALUES: Record<string, number> = {
    'k': 10000, 'K': 10000,
    'r': 900,   'R': 900,
    'n': 400,   'N': 400,
    'c': 450,   'C': 450,
    'a': 200,   'A': 200,
    'b': 200,   'B': 200,
    'p': 100,   'P': 100
};

const evaluateBoard = (board: any, fen: string): number => {
    const pieces = fen.split(" ")[0];
    let score = 0;
    
    for (let i = 0; i < pieces.length; i++) {
        const char = pieces[i];
        if (PIECE_VALUES[char]) {
            const val = PIECE_VALUES[char];
            score += (char === char.toUpperCase()) ? val : -val;
        }
    }
    
    return score;
};

// --- Alpha-Beta Search ---
// Returns [score, bestMoveString]
const alphaBeta = (board: any, depth: number, alpha: number, beta: number, isMaximizing: boolean): [number, string | null] => {
    if (depth === 0 || board.isGameOver()) {
        const fen = board.fen();
        return [evaluateBoard(board, fen), null];
    }

    const movesStr = board.legalMoves();
    if (!movesStr) {
         return [evaluateBoard(board, board.fen()), null]; 
    }
    
    const moves = movesStr.split(" ");
    let bestMove = null;

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const move of moves) {
            board.push(move);
            const [evalScore] = alphaBeta(board, depth - 1, alpha, beta, false);
            board.pop();

            if (evalScore > maxEval) {
                maxEval = evalScore;
                bestMove = move;
            }
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break; 
        }
        return [maxEval, bestMove];
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            board.push(move);
            const [evalScore] = alphaBeta(board, depth - 1, alpha, beta, true);
            board.pop();

            if (evalScore < minEval) {
                minEval = evalScore;
                bestMove = move;
            }
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break; 
        }
        return [minEval, bestMove];
    }
};

const uciToCoords = (uci: string) => {
    const files = "abcdefghi";
    // Regex to capture from/to file and rank, handles 1 or 2 digit ranks
    const moveRegex = /([a-i])(\d{1,2})([a-i])(\d{1,2})/;
    const match = uci.match(moveRegex);

    if (!match) {
        console.error("Could not parse UCI move:", uci);
        return null; // Handle error appropriately
    }
    
    const fromFile = match[1];
    const fromRank = parseInt(match[2], 10);
    const toFile = match[3];
    const toRank = parseInt(match[4], 10);
    
    // Assuming ranks are 1-10, where 1 is Red's side (y=9) and 10 is Black's (y=0)
    // Our board coordinates are y=0 (top, black) to y=9 (bottom, red)
    const x1 = files.indexOf(fromFile);
    const y1 = 10 - fromRank;
    const x2 = files.indexOf(toFile);
    const y2 = 10 - toRank;
    
    if (x1 === -1 || x2 === -1 || y1 < 0 || y1 > 9 || y2 < 0 || y2 > 9) {
        console.error("Parsed coordinates are out of bounds:", { uci, x1, y1, x2, y2 });
        return null;
    }

    return {
        from: [x1, y1],
        to: [x2, y2]
    };
};

export const getBestMove = async (fen: string, depth: number = 3): Promise<{ bestMove: any, explanation: string } | null> => {
    if (!engineReady || !ffishInstance) {
        await initEngine();
        if (!ffishInstance) return null;
    }

    let board;
    try {
        board = new ffishInstance.Board("xiangqi", fen);
    } catch (e) {
        console.error("Invalid FEN for engine", e);
        return null;
    }

    const parts = fen.split(" ");
    const turn = parts[1]; // 'w' (Red) or 'b' (Black)
    const isRed = turn === 'w';

    const [score, bestMoveUci] = alphaBeta(board, depth, -Infinity, Infinity, isRed);
    
    board.delete(); 

    if (!bestMoveUci) return null;
    
    const coords = uciToCoords(bestMoveUci);
    if (!coords) {
        console.error("Failed to convert UCI to Coords", bestMoveUci);
        return null;
    }
    
    return {
        bestMove: {
            from: coords.from,
            to: coords.to,
            notation: bestMoveUci
        },
        explanation: `Calculated Score: ${(score/100).toFixed(2)} (Depth ${depth})`
    };
};

export const boardToFen = (board: BoardState, turn: PieceColor): string => {
  let fen = "";
  for (let y = 0; y < 10; y++) {
    let emptyCount = 0;
    for (let x = 0; x < 9; x++) {
      const piece = board[`${x},${y}`];
      if (!piece) {
        emptyCount++;
      } else {
        if (emptyCount > 0) {
          fen += emptyCount;
          emptyCount = 0;
        }
        let char = '';
        switch (piece.type) {
          case PieceType.KING: char = 'k'; break;
          case PieceType.ADVISOR: char = 'a'; break;
          case PieceType.ELEPHANT: char = 'b'; break;
          case PieceType.HORSE: char = 'n'; break;
          case PieceType.ROOK: char = 'r'; break;
          case PieceType.CANNON: char = 'c'; break;
          case PieceType.PAWN: char = 'p'; break;
        }
        
        if (piece.color === PieceColor.RED) {
          char = char.toUpperCase();
        }
        fen += char;
      }
    }
    if (emptyCount > 0) {
      fen += emptyCount;
    }
    if (y < 9) {
      fen += "/";
    }
  }
  
  fen += ` ${turn}`; 
  fen += " - - 0 1";
  
  return fen;
};