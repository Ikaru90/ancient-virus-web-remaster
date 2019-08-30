import Phaser from 'phaser';
import { PreloadScene } from './scenes/preloadScene';
import { LoadingScene } from './scenes/loadingScene';
import { MenuScene } from './scenes/menuScene';
import { CreatorsScene } from './scenes/creatorsScene';
import { LevelIntro } from './scenes/levelIntro';
import '../css/reset.css';

const config = {
  type: Phaser.AUTO,
  scale: {
    // mode: Phaser.DOM.FIT,
    // autoCenter: Phaser.DOM.CENTER_BOTH,
    width: 1024,
    height: 768,
  },  
  scene: [
    PreloadScene,
    LoadingScene,
    MenuScene,
    CreatorsScene,
    LevelIntro
  ]
};

new Phaser.Game(config);
