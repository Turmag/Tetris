import { State, Piece } from '@/services/types';
import { mainStore } from '@/store';

export default class View {
    static blocks: Record<number, string> = {
        1: 'cyan',
        2: 'blue',
        3: 'orange',
        4: 'yellow',
        5: 'green',
        6: 'red',
        7: 'purple',
        8: 'gray',
    };

    element: HTMLElement;
    width = 0;
    height = 0;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;
    blockWidth = 0;
    blockHeight = 0;
    playfieldBorderWidth = 4;
    playfieldX = 0;
    playfieldY = 0;
    playfieldWidth = 0;
    playfieldHeight = 0;
    playfieldInnerWidth = 0;
    playfieldInnerHeight = 0;
    playfieldWallX = this.playfieldBorderWidth;
    playfieldWallY = this.playfieldBorderWidth;
    panelX = 0;
    panelY = 0;
    panelWidth = 0;
    images: HTMLImageElement[] = [];

    constructor(element: HTMLElement, width: number, height: number, rows: number, columns: number) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.playfieldWidth = 384;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        this.context = this.canvas.getContext('2d')!;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        this.playfieldX = this.playfieldBorderWidth + this.blockWidth;
        this.playfieldY = this.playfieldBorderWidth + this.blockHeight;

        this.panelX = this.playfieldWidth + 10;
        this.panelWidth = this.width / 3;

        this.element.appendChild(this.canvas);

        let blockInitCount = 0;
        for (const key in View.blocks) {
            const img = new Image();
            img.src = new URL(`../img/${View.blocks[key]}.png`, import.meta.url).href;
            this.images[key] = img;
            img.onload = () => {
                blockInitCount++;
                if(blockInitCount === Object.keys(View.blocks).length) {
                    const store = mainStore();
                    store.isLoadedData = true;
                }
            };
        }
    }

    renderMainScreen(state: State) {
        this.clearScreen();
        this.renderPlayfieldWall();
        this.renderPlayfield(state.playfield);
        this.renderPanel({
            score: state.score,
            level: state.level,
            lines: state.lines,
            nextPiece: state.nextPiece,
        });
    }

    clearScreen() {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderStartScreen() {
        const ctx = this.context;
        ctx.fillStyle = '#fff';
        ctx.font = '18px "PressStart2P"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Нажмите', this.width / 2, this.height / 2 - 48);
        ctx.fillText('ENTER', this.width / 2, this.height / 2);
        ctx.fillText('для запуска игры', this.width / 2, this.height / 2 + 48);
    }

    renderPauseScreen() {
        const ctx = this.context;
        ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
        ctx.fillRect(0, 0, this.width, this.height);

        ctx.fillStyle = '#fff';
        ctx.font = '18px "PressStart2P"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('Нажмите', this.width / 2, this.height / 2 - 48);
        ctx.fillText('ENTER или ESCAPE', this.width / 2, this.height / 2);
        ctx.fillText('для возврата к игре', this.width / 2, this.height / 2 + 48);
    }

    renderEndScreen({ level, score, lines }: { level: number; score: number; lines: number }) {
        this.clearScreen();

        const ctx = this.context;
        ctx.fillStyle = '#fff';
        ctx.font = '18px "PressStart2P"';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('ИГРА ОКОНЧЕНА', this.width / 2, this.height / 2 - 144);
        ctx.fillText(`Уровень: ${level}`, this.width / 2, this.height / 2 - 96);
        ctx.fillText(`Очки: ${score}`, this.width / 2, this.height / 2 - 48);
        ctx.fillText(`Кол-во линий: ${lines}`, this.width / 2, this.height / 2);
        ctx.fillText('Нажмите', this.width / 2, this.height / 2 + 48);
        ctx.fillText('ENTER', this.width / 2, this.height / 2 + 96);
        ctx.fillText('для запуска игры заново', this.width / 2, this.height / 2 + 144);
    }

    renderPlayfieldWall() {
        for (let y = 0, l1 = 22; y < l1; y++) {
            for (let x = 0, l2 = 12; x < l2; x++) {
                if (x === 0 || x === l2 - 1 || y === 0 || y === l1 - 1) {
                    this.renderBlock({
                        x: this.playfieldWallX + x * this.blockWidth,
                        y: this.playfieldWallX + y * this.blockHeight,
                        width: this.blockWidth,
                        height: this.blockHeight,
                        img: this.images[8],
                    });
                }
            }
        }
    }

    renderPlayfield(playfield: number[][]) {
        for (let y = 0, l1 = playfield.length; y < l1; y++) {
            const line = playfield[y];

            for (let x = 0, l2 = line.length; x < l2; x++) {
                const block = line[x];

                if (block) {
                    this.renderBlock({
                        x: this.playfieldX + x * this.blockWidth,
                        y: this.playfieldY + y * this.blockHeight,
                        width: this.blockWidth,
                        height: this.blockHeight,
                        img: this.images[block],
                    });
                }
            }
        }

        const ctx = this.context;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = this.playfieldBorderWidth;
        ctx.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);
    }

    renderPanel({
        level,
        score,
        lines,
        nextPiece,
    }: {
        level: number;
        score: number;
        lines: number;
        nextPiece: Piece;
    }) {
        const ctx = this.context;
        ctx.textAlign = 'start';
        ctx.textBaseline = 'top';
        ctx.fillStyle = '#fff';
        ctx.font = '14px PressStart2P';

        ctx.fillText(`Очки: ${score}`, this.panelX, this.panelY + 5);
        ctx.fillText(`Кол-во линий: ${lines}`, this.panelX, this.panelY + 5 + 24);
        ctx.fillText(`Уровень: ${level}`, this.panelX, this.panelY + 5 + 48);
        ctx.fillText('След. фигура', this.panelX, this.panelY + 5 + 96);

        for (let y = 0, l1 = nextPiece.block.length; y < l1; y++) {
            for (let x = 0, l2 = nextPiece.block[y].length; x < l2; x++) {
                const block = nextPiece.block[y][x];

                if (block) {
                    this.renderBlock({
                        x: this.panelX + x * this.blockWidth * 0.5,
                        y: this.panelY + 110 + y * this.blockHeight * 0.5,
                        width: this.blockWidth * 0.5,
                        height: this.blockHeight * 0.5,
                        img: this.images[block],
                    });
                }
            }
        }
    }

    renderBlock({
        x,
        y,
        width,
        height,
        img,
    }: {
        x: number;
        y: number;
        width: number;
        height: number;
        img: HTMLImageElement;
    }) {
        this.context.drawImage(img, x, y, width, height);
    }
}
