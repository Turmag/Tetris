export default class Game {
    static points = {
        1: 40,
        2: 100,
        3: 300,
        4: 1200,
    } as { [key: number]: any };

    score = 0;
    lines = 0;
    topOut = false;
    playfield: number[][];
    activePiece: any;
    nextPiece: any;

    constructor() {
        this.reset();
    }

    getState() {
        return {
            score: this.score,
            level: this.level,
            lines: this.lines,
            nextPiece: this.nextPiece,
            playfield: this.playfieldState,
            isGameOver: this.topOut,
        };
    }
    get playfieldState() {
        const playfield: number[][] = [];
        for (let y = 0, l1 = this.playfield.length; y < l1; y++) {
            playfield[y] = [];
            for (let x = 0, l2 = this.playfield[y].length; x < l2; x++) {
                playfield[y][x] = this.playfield[y][x];
            }
        }
        this.lockPiece(playfield);
        return playfield;
    }

    get level() {
        return Math.floor(this.lines * 0.1);
    }

    reset() {
        this.score = 0;
        this.lines = 0;
        this.topOut = false;
        this.playfield = this.createPlayfield();
        this.activePiece = this.createPiece();
        this.nextPiece = this.createPiece();
    }

    createPlayfield() {
        const playfield: number[][] = [];

        for (let y = 0; y < 20; y++) {
            playfield[y] = [];

            for (let x = 0; x < 10; x++) {
                playfield[y][x] = 0;
            }
        }

        return playfield;
    }

    createPiece() {
        const index = Math.floor(Math.random() * 7);
        const type = 'IJLOSTZ'[index] as string;
        const piece = { x: 0, y: 0, block: [] as number[][] };
        const figure = {
            I: [
                [0, 0, 0, 0],
                [1, 1, 1, 1],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
            ],
            J: [
                [0, 0, 0],
                [2, 2, 2],
                [0, 0, 2],
            ],
            L: [
                [0, 0, 0],
                [3, 3, 3],
                [3, 0, 0],
            ],
            O: [
                [0, 0, 0, 0],
                [0, 4, 4, 0],
                [0, 4, 4, 0],
                [0, 0, 0, 0],
            ],
            S: [
                [0, 0, 0],
                [0, 5, 5],
                [5, 5, 0],
            ],
            T: [
                [0, 0, 0],
                [6, 6, 6],
                [0, 6, 0],
            ],
            Z: [
                [0, 0, 0],
                [7, 7, 0],
                [0, 7, 7],
            ],
        } as { [key: string]: any };

        piece.block = figure[type];
        piece.x = Math.floor((this.playfield[0].length - piece.block[0].length) / 2);
        piece.y = -1;

        return piece;
    }

    movePieceLeft() {
        this.activePiece.x -= 1;

        if (this.hasCollision()) {
            this.activePiece.x += 1;
        }
    }

    movePieceRight() {
        this.activePiece.x += 1;

        if (this.hasCollision()) {
            this.activePiece.x -= 1;
        }
    }

    movePieceDown() {
        if (this.topOut) {
            return;
        }

        this.activePiece.y += 1;

        if (this.hasCollision()) {
            this.activePiece.y -= 1;
            this.lockPiece();
            const clearedLines = this.clearLines();
            this.updateScore(clearedLines);
            this.updatePieces();
        }

        if (this.hasCollision()) {
            this.topOut = true;
        }
    }

    rotatePiece() {
        this.rotateBlock();
        if (this.hasCollision()) {
            this.rotateBlock(false);
        }
    }

    rotateBlock(isRightTurn = true) {
        const block = this.activePiece.block;
        const l = block.length;
        const x = Math.floor(l / 2);
        const y = l - 1;

        for (let i = 0; i < x; i++) {
            for (let j = i; j < y - i; j++) {
                const tempBlock = block[i][j];

                if (isRightTurn) {
                    block[i][j] = block[y - j][i];
                    block[y - j][i] = block[y - i][y - j];
                    block[y - i][y - j] = block[j][y - i];
                    block[j][y - i] = tempBlock;
                } else {
                    block[i][j] = block[j][y - i];
                    block[j][y - i] = block[y - i][y - j];
                    block[y - i][y - j] = block[y - j][i];
                    block[y - j][i] = tempBlock;
                }
            }
        }

        return this.activePiece;
    }

    hasCollision() {
        const playfield = this.playfield;
        const { x: pieceX, y: pieceY, block } = this.activePiece;

        for (let y = 0, l1 = block.length; y < l1; y++) {
            for (let x = 0, l2 = block[y].length; x < l2; x++) {
                if (
                    block[y][x] &&
                    (!this.isExistValue(playfield[pieceY + y]) ||
                        !this.isExistValue(playfield[pieceY + y][pieceX + x]) ||
                        this.playfield[pieceY + y][pieceX + x])
                ) {
                    return true;
                }
            }
        }

        return false;
    }

    isExistValue(value: any) {
        return typeof value !== 'undefined';
    }

    lockPiece(playfield = this.playfield) {
        const { x: pieceX, y: pieceY, block } = this.activePiece;
        for (let y = 0, l1 = block.length; y < l1; y++) {
            for (let x = 0, l2 = block[y].length; x < l2; x++) {
                if (block[y][x]) {
                    playfield[pieceY + y][pieceX + x] = block[y][x];
                }
            }
        }
    }

    clearLines() {
        const rows = this.playfield.length;
        const columns = this.playfield[0].length;
        let lines = [];

        for (let y = rows - 1; y >= 0; y--) {
            let numberOfBlocks = 0;

            for (let x = 0; x < columns; x++) {
                if (this.playfield[y][x]) {
                    numberOfBlocks++;
                }
            }

            if (numberOfBlocks === 0) {
                break;
            } else if (numberOfBlocks < columns) {
                continue;
            } else if (numberOfBlocks === columns) {
                lines.unshift(y);
            }
        }

        for (let index of lines) {
            this.playfield.splice(index, 1);
            this.playfield.unshift(new Array(columns).fill(0));
        }

        return lines.length;
    }

    updateScore(clearedLines: number) {
        if (clearedLines > 0) {
            this.score += Game.points[clearedLines] * (this.level + 1);
            this.lines += clearedLines;
        }
    }

    updatePieces() {
        this.activePiece = this.nextPiece;
        this.nextPiece = this.createPiece();
    }
}
