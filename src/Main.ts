import '/assets/scss/style.scss';
import '/assets/scss/loader.scss';
import '/assets/fonts/fonts.css';
import Game from './Game';
import View from './View';
import Controller from './Controller';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <h1 class="title"><span>Т</span><span>Е</span><span>Т</span><span>Р</span><span>И</span><span>С</span></h1>
  <div id="root"></div>
  <div class="loader-wrapper" id="loader-wrapper">
  <div class="loader">
  <div class="dot-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>  
</div>
<div class="dot-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>  
</div>
<div class="dot-container">
  <div class="dot"></div>
  <div class="dot"></div>
  <div class="dot"></div>  
</div>
  </div>
  </div>
  <div class="management">
    <div class="management__block">
    Управление:
    <p>Стрелки вниз, влево, вправо - движение фигуры</p>
    <p>Стрелка вверх - поворот фигуры</p>
    <p>Enter или Escape - пауза / продолжить</p>
    </div>
  </div>
  <div class="sound-wrapper">
    <div class="sound" title="Включить фоновую музыку" id="music-switch-on">
    <svg viewBox="0 0 32 32" width="20" height="20" color="#999" data-v-67a7a2aa=""><path fill="currentColor" d="M31 12.41L29.59 11L26 14.59L22.41 11L21 12.41L24.59 16L21 19.59L22.41 21L26 17.41L29.59 21L31 19.59L27.41 16L31 12.41zM18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0a1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1z"></path></svg>
    </div>
    <div class="sound sound--hidden" title="Выключить фоновую музыку" id="music-switch-off">
    <svg viewBox="0 0 32 32" width="20" height="20" color="#999" data-v-67a7a2aa=""><path fill="currentColor" d="m27.16 8.08l-1.53 1.29a10 10 0 0 1-.29 13.23l1.47 1.4a12 12 0 0 0 .35-15.88Z"></path><path fill="currentColor" d="M21.58 12a6 6 0 0 1-.18 7.94l1.47 1.36a8 8 0 0 0 .23-10.59zM18 30a1 1 0 0 1-.71-.3L9.67 22H3a1 1 0 0 1-1-1V11a1 1 0 0 1 1-1h6.67l7.62-7.7a1 1 0 0 1 1.41 0a1 1 0 0 1 .3.7v26a1 1 0 0 1-1 1zM4 20h6.08a1 1 0 0 1 .71.3L17 26.57V5.43l-6.21 6.27a1 1 0 0 1-.71.3H4z"></path></svg>
    </div>
  </div>
`;

const root = document.querySelector<HTMLDivElement>('#root');
const loaderWrapper = document.querySelector<HTMLDivElement>('#loader-wrapper');

setTimeout(() => {
    root.style.display = 'block';
    loaderWrapper.style.display = 'none';
}, 2000);

const audio = new Audio(new URL('/assets/music/Arcadia - Tetris.mp3', import.meta.url).href);
audio.volume = 0.5;
audio.loop = true;
const musicOn = document.querySelector<HTMLDivElement>('#music-switch-on');
const musicOff = document.querySelector<HTMLDivElement>('#music-switch-off');

const game = new Game();
const view = new View(root, 640, 640, 22, 12);
new Controller(game, view);

musicOn.onclick = () => {
    musicOn.classList.add('sound--hidden');
    musicOff.classList.remove('sound--hidden');
    audio.play();
};

musicOff.onclick = () => {
    musicOff.classList.add('sound--hidden');
    musicOn.classList.remove('sound--hidden');
    audio.pause();
};
