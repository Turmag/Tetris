export default class Controller {
    game: any;
    view: any;
    isPlaying = false;
    interval: any = null;

    constructor(game: any, view: any) {
        this.game = game;
        this.view = view;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        setTimeout(() => this.view.renderStartScreen(), 1000);
    }

    update() {
        this.game.movePieceDown();
        this.updateView();
    }

    play() {
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause() {
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    reset() {
        this.game.reset();
        this.play();
    }

    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            this.view.renderEndScreen(state);
        } else if (!this.isPlaying) {
            this.view.renderPauseScreen(state);
        } else {
            this.view.renderMainScreen(state);
        }
    }

    startTimer() {
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.interval) {
            this.interval = setInterval(() => this.update(), speed > 0 ? speed : 100);
        }
    }

    stopTimer() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    handleKeyDown(e: any) {
        const state = this.game.getState();

        switch (e.keyCode) {
            case 13: // ENTER
                if (state.isGameOver) {
                    this.reset();
                } else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 27: // ENTER
                if (!state.isGameOver) {
                    if (this.isPlaying) {
                        this.pause();
                    } else {
                        this.play();
                    }
                }
                break;
            case 37: // LEFT ARROW
                if (this.isPlaying) {
                    this.game.movePieceLeft();
                    this.updateView();
                }
                break;
            case 38: // UP ARROW
                if (this.isPlaying) {
                    this.game.rotatePiece();
                    this.updateView();
                }
                break;
            case 39: // RIGHT ARROW
                if (this.isPlaying) {
                    this.game.movePieceRight();
                    this.updateView();
                }
                break;
            case 40: // DOWN ARROW
                if (this.isPlaying) {
                    this.stopTimer();
                    this.game.movePieceDown();
                    this.updateView();
                }
                break;
        }
    }

    handleKeyUp(e: any) {
        switch (e.keyCode) {
            case 40: // DOWN ARROW
                if (this.isPlaying) {
                    this.startTimer();
                }
                break;
        }
    }
}
