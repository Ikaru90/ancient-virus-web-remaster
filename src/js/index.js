import Phaser from 'phaser';
import { LoadScene } from './scenes/loadScene';
import { MenuScene } from './scenes/menuScene';
import '../css/reset.css';

const config = {
  type: Phaser.AUTO,
  scale: {
    // mode: Phaser.DOM.FIT,
    // autoCenter: Phaser.DOM.CENTER_BOTH,
    width: 1024,
    height: 768,
  },  
  scene: [ LoadScene, MenuScene ]
};

const game = new Phaser.Game(config);
