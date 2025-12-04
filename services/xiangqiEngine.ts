
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

// Simplified Piece Square Tables (Red Perspective, y=9 is bottom)
// Arrays are 10 rows x 9 cols, flattened or accessed via PST[y][x]
// High numbers = good for Red.
// For Black, we mirror the board: x becomes 8-x, y becomes 9-y.
const PST: Record<string, number[][]> = {
    // Pawn: Encourages moving forward, crossing river (y<=4)
    'P': [
        [ 9,  9,  9, 11, 13, 11,  9,  9,  9], // y=0 (Black Base)
        [19, 24, 34, 42, 44, 42, 34, 24, 19], // y=1
        [19, 24, 32, 37, 37, 37, 32, 24, 19], // y=2
        [19, 23, 27, 29, 30, 29, 27, 23, 19], // y=3
        [14, 18, 20, 27, 29, 27, 20, 18, 14], // y=4 (River Top)
        [ 7,  0, 13,  0, 16,  0, 13,  0,  7], // y=5 (River Bottom)
        [ 7,  0,  7,  0, 15,  0,  7,  0,  7], // y=6
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0], // y=7
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0], // y=8
        [ 0,  0,  0,  0,  0,  0,  0,  0,  0], // y=9
    ],
    // Cannon: Good in center, good on river bank
    'C': [
        [ 6,  4,  0, -10, -12, -10,  0,  4,  6],
        [ 2,  2,  0, -4, -14, -4,  0,  2,  2],
        [ 2,  2,  0, -10, -8, -10,  0,  2,  2],
        [ 0,  0, -2,  4,  10,  4, -2,  0,  0],
        [ 0,  0,  0,  2,  4,  2,  0,  0,  0],
        [-2,  0,  4,  2,  6,  2,  4,  0, -2],
        [ 0,  0,  0,  2,  4,  2,  0,  0,  0],
        [ 4,  0,  8,  6, 10,  6,  8,  0,  4], // Setup row
        [ 0,  2,  4,  6,  6,  6,  4,  2,  0],
        [ 0,  0,  2,  6,  6,  6,  2,  0,  0],
    ],
    // Horse: Penalty for edge, bonus for center
    'N': [
        [ 2,  8, 15, 20, 20, 20, 15,  8,  2],
        [ 2,  8, 22, 30, 30, 30, 22,  8,  2],
        [ 4,  9, 18, 30, 40, 30, 18,  9,  4],
        [ 4,  8, 16, 30, 35, 30, 16,  8,  4],
        [ 2, 10, 15, 25, 30, 25, 15, 10,  2],
        [ 2, 10, 15, 25, 30, 25, 15, 10,  2],
        [ 4,  6, 12, 18, 20, 18, 12,  6,  4],
        [ 2,  4, 10, 20, 20, 20, 10,  4,  2],
        [ 2,  4,  8, 15, 15, 15,  8,  4,  2],
        [-2,  2,  4,  8,  8,  8,  4,  2, -2],
    ],
    // Rook: Mobility and open lines (simplified as central control)
    'R': [
        [14, 14, 12, 18, 16, 18, 12, 14, 14],
        [16, 20, 18, 24, 26, 24, 18, 20, 16],
        [12, 12, 12, 18, 18, 18, 12, 12, 12],
        [12, 18, 16, 22, 22, 22, 16, 18, 12],
        [12, 14, 12, 18, 18, 18, 12, 14, 12],
        [12, 16, 14, 20, 20, 20, 14, 16, 12],
        [ 6, 10,  8, 14, 14, 14,  8, 10,  6],
        [ 4,  8,  6, 14, 12, 14,  6,  8,  4],
        [ 8,  4,  8, 16,  8, 16,  8,  4,  8],
        [-2, 10,  6, 14, 12, 14,  6, 10, -2],
    ],
    // King, Advisor, Elephant: Just safety, keep them home usually
    // Simplified: 0 for all
};

const getPstValue = (char: string, x: number, y: number): number => {
    // Red (Uppercase)
    if (char === char.toUpperCase()) {
        const table = PST[char];
        if (!table) return 0;
        return table[y][x];
    } 
    // Black (Lowercase)
    else {
        const type = char.toUpperCase();
        const table = PST[type];
        if (!table) return 0;
        // Mirror position for Black
        return -table[9 - y][x];
    }
};

const evaluateBoard = (board: any, fen: string): number => {
    const piecesStr = fen.split(" ")[0];
    let score = 0;
    
    let x = 0;
    let y = 0;

    for (let i = 0; i < piecesStr.length; i++) {
        const char = piecesStr[i];
        if (char === '/') {
            y++;
            x = 0;
        } else if (/\d/.test(char)) {
            x += parseInt(char, 10);
        } else {
            // Material
            let val = PIECE_VALUES[char] || 0;
            // Position
            val += getPstValue(char, x, y);
            
            score += (char === char.toUpperCase()) ? val : -val;
            x++;
        }
    }
    
    return score;
};

// --- Alpha-Beta Search ---
// Returns [score, bestMoveString]
const alphaBeta = (board: any, depth: number, alpha: number, beta: number, isMaximizing: boolean): number => {
    if (depth === 0 || board.isGameOver()) {
        const fen = board.fen();
        return evaluateBoard(board, fen);
    }

    const movesStr = board.legalMoves();
    if (!movesStr) {
         return evaluateBoard(board, board.fen()); 
    }
    
    const moves = movesStr.split(" ");
    
    // Improved Logic: Sort moves? (Complex in JS without object alloc, skip for speed)

    if (isMaximizing) {
        let maxEval = -Infinity;
        for (const move of moves) {
            board.push(move);
            const evalScore = alphaBeta(board, depth - 1, alpha, beta, false);
            board.pop();

            if (evalScore > maxEval) {
                maxEval = evalScore;
            }
            alpha = Math.max(alpha, evalScore);
            if (beta <= alpha) break; 
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (const move of moves) {
            board.push(move);
            const evalScore = alphaBeta(board, depth - 1, alpha, beta, true);
            board.pop();

            if (evalScore < minEval) {
                minEval = evalScore;
            }
            beta = Math.min(beta, evalScore);
            if (beta <= alpha) break; 
        }
        return minEval;
    }
};

const uciToCoords = (uci: string) => {
    const files = "abcdefghi";
    const moveRegex = /([a-i])(\d{1,2})([a-i])(\d{1,2})/;
    const match = uci.match(moveRegex);

    if (!match) {
        return null;
    }
    
    const fromFile = match[1];
    const fromRank = parseInt(match[2], 10);
    const toFile = match[3];
    const toRank = parseInt(match[4], 10);
    
    const x1 = files.indexOf(fromFile);
    const y1 = 10 - fromRank;
    const x2 = files.indexOf(toFile);
    const y2 = 10 - toRank;
    
    return {
        from: [x1, y1],
        to: [x2, y2]
    };
};

export interface MoveCandidate {
    move: {
        from: number[],
        to: number[],
        notation: string
    };
    score: number;
}

export const getBestMove = async (fen: string, depth: number = 3): Promise<{ bestMove: any, candidates: MoveCandidate[], explanation: string } | null> => {
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

    const movesStr = board.legalMoves();
    if (!movesStr) {
        board.delete();
        return null;
    }

    const moves = movesStr.split(" ");
    const candidates: MoveCandidate[] = [];

    // Root Search: Iterate all moves and get their score
    for (const move of moves) {
        board.push(move);
        // Call alphaBeta for next depth. 
        // If isRed=true (Maximizing), next node is minimizing, so we want the result of min-search.
        // alphaBeta returns the score relative to the board eval.
        const score = alphaBeta(board, depth - 1, -Infinity, Infinity, !isRed);
        board.pop();

        const coords = uciToCoords(move);
        if (coords) {
            candidates.push({
                move: {
                    from: coords.from,
                    to: coords.to,
                    notation: move
                },
                score: score
            });
        }
    }
    
    board.delete(); 

    if (candidates.length === 0) return null;

    // Sort Candidates
    // Red wants Highest score. Black wants Lowest score.
    candidates.sort((a, b) => isRed ? b.score - a.score : a.score - b.score);

    const best = candidates[0];

    return {
        bestMove: best.move,
        candidates: candidates,
        explanation: `Score: ${(best.score/100).toFixed(2)} (Depth ${depth}, Evaluated ${candidates.length} branches)`
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
