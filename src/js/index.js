import Phaser from 'phaser';
import { PreloadScene } from './scenes/preloadScene';
import { LoadingScene } from './scenes/loadingScene';
import { MenuScene } from './scenes/menuScene';
import { CreatorsScene } from './scenes/creatorsScene';
import { LevelOneIntroScene } from './scenes/levelOneIntroScene';
import { LevelTwoIntroScene } from './scenes/levelTwoIntroScene';
import { LevelThreeIntroScene } from './scenes/levelThreeIntroScene';
import { LevelFourIntroScene } from './scenes/levelFourIntroScene';
import { LevelFiveIntroScene } from './scenes/levelFiveIntroScene';
import { LevelSixIntroScene } from './scenes/levelSixIntroScene';
import { LevelSevenIntroScene } from './scenes/levelSevenIntroScene';
import { LevelEightIntroScene } from './scenes/levelEightIntroScene';
import { LevelNineIntroScene } from './scenes/levelNineIntroScene';
import { LevelTenIntroScene } from './scenes/LevelTenIntroScene';
import { EndGameScene } from './scenes/endGameScene';
import { LoseScene } from './scenes/loseScene';
import { GameScene } from './scenes/gameScene';
import '../css/reset.css';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.DOM.FIT,
    autoCenter: Phaser.DOM.CENTER_BOTH,
    width: 1024,
    height: 768,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  },
  scene: [
    PreloadScene,
    LoadingScene,
    MenuScene,
    CreatorsScene,
    LevelOneIntroScene,
    LevelTwoIntroScene,
    LevelThreeIntroScene,
    LevelFourIntroScene,
    LevelFiveIntroScene,
    LevelSixIntroScene,
    LevelSevenIntroScene,
    LevelEightIntroScene,
    LevelNineIntroScene,
    LevelTenIntroScene,
    EndGameScene,
    LoseScene,
    GameScene,
  ]
};

new Phaser.Game(config);
