import Game from '@/assets/js/Game';
import View from '@/assets/js/View';
import { mainStore } from '@/store';

export default class Controller {
    game: Game;
    view: View;
    isPlaying = false;
    firstRenderInterval: null | ReturnType<typeof setInterval> = null;
    interval: null | ReturnType<typeof setTimeout> = null;

    constructor(game: Game, view: View) {
        this.game = game;
        this.view = view;

        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));

        const store = mainStore();

        this.firstRenderInterval = setInterval(() => {
            if(store.isLoadedData) {
                clearInterval(this.firstRenderInterval!);
                this.view.renderStartScreen();
            }
        }, 100);
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
            this.view.renderPauseScreen();
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

    handleKeyDown(e: KeyboardEvent) {
        const state = this.game.getState();

        switch (e.key) {
            case 'Enter':
                if (state.isGameOver) {
                    this.reset();
                } else if (this.isPlaying) {
                    this.pause();
                } else {
                    this.play();
                }
                break;
            case 'Esc': 
            case 'Escape': 
                if (!state.isGameOver) {
                    if (this.isPlaying) {
                        this.pause();
                    } else {
                        this.play();
                    }
                }
                break;
            case 'ArrowLeft':
                if (this.isPlaying) {
                    this.game.movePieceLeft();
                    this.updateView();
                }
                break;
            case 'ArrowUp':
                if (this.isPlaying) {
                    this.game.rotatePiece();
                    this.updateView();
                }
                break;
            case 'ArrowRight':
                if (this.isPlaying) {
                    this.game.movePieceRight();
                    this.updateView();
                }
                break;
            case 'ArrowDown':
                if (this.isPlaying) {
                    this.stopTimer();
                    this.game.movePieceDown();
                    this.updateView();
                }
                break;
        }
    }

    handleKeyUp(e: KeyboardEvent) {
        switch (e.key) {
            case 'ArrowDown':
                if (this.isPlaying) {
                    this.startTimer();
                }
                break;
        }
    }
}
