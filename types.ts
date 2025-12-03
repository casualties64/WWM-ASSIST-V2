
export enum Tab {
  MAP = 'MAP',
  CHESS = 'CHESS',
  GUIDE = 'GUIDE',
  LEGAL = 'LEGAL'
}

export enum PieceColor {
  RED = 'w', // FEN standard: w for Red (conventionally white in western chess, but red moves first in Xiangqi)
  BLACK = 'b'
}

export enum PieceType {
  KING = 'k',
  ADVISOR = 'a',
  ELEPHANT = 'b', // Bishop in FEN
  HORSE = 'n', // Knight
  ROOK = 'r',
  CANNON = 'c',
  PAWN = 'p'
}

export interface Piece {
  id: string;
  type: PieceType;
  color: PieceColor;
}

export interface BoardPosition {
  x: number; // 0-8
  y: number; // 0-9
}

// 9x10 grid. Key is "x,y", value is Piece
export type BoardState = Record<string, Piece>;

export interface AnalysisResult {
  bestMove: string;
  explanation: string;
}

export interface DiscordAuth {
  user: {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string | null;
    global_name?: string | null;
  };
}
