export interface State {
    score: number;
    level: number;
    lines: number;
    nextPiece: Piece;
    playfield: number[][];
    isGameOver: boolean;
}

export interface Piece {
    block: number[][];
    x: number;
    y: number;
}
