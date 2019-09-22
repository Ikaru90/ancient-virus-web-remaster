import { SCENES } from './const';
import { Monster } from '../objects/monster';

const clearLevel = (scene) => {
  scene.bullets.clear(true);
  scene.enemys.clear(true);
  scene.effects.clear(true);
  scene.drop.clear(true);
  scene.interface.resetCamera();
}

export const getlevelTwo = (scene) => {
  setTimeout(() => {
    scene.level = 2;
    clearLevel(scene);
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
      }
    }   
    scene.scene.switch(SCENES.LEVEL_TWO_INTRO);
  }, 5000)
}

export const getlevelThree = (scene) => {
  setTimeout(() => {
    scene.level = 3;
    clearLevel(scene);
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 4; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 1; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'zombieMove');
      }
    }
    for(let i = 0; i < 1; i ++) {
      for(let j = 0; j < 1; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'spiderMove');
      }
    }
    scene.scene.switch(SCENES.LEVEL_THREE_INTRO);
  }, 5000)
}

export const getlevelFour = (scene) => {
  setTimeout(() => {
    scene.level = 4;
    clearLevel(scene);
    scene.textures.clear(true);
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 3; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 2; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'zombieMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 1; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'spiderMove');
      }
    }
    for(let i = 0; i < 1; i ++) {
      for(let j = 0; j < 1; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'lizardMove');
      }
    }
    for (let i = 0; i < 5; i ++ ) {
      for (let j = 0; j < 4; j ++ ) {
        scene.textures.add(scene.add.image(i * 512, j * 512, 'sand').setOrigin(0,0).setDepth(-1));
      }
    }
    scene.scene.switch(SCENES.LEVEL_FOUR_INTRO);
  }, 5000)
}

export const getlevelFive = (scene) => {
  setTimeout(() => {
    scene.level = 5;
    clearLevel(scene);
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 2; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'zombieMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 2; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'spiderMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 1; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'lizardMove');
      }
    }
    scene.scene.switch(SCENES.LEVEL_FIVE_INTRO);
  }, 5000)
}

export const getlevelSix = (scene) => {
  setTimeout(() => {
    scene.level = 6;
    clearLevel(scene);
    scene.textures.clear(true);
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 1; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 4; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'zombieMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 2; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'spiderMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 3; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'lizardMove');
      }
    }
    for (let i = 0; i < 10; i ++ ) {
      for (let j = 0; j < 8; j ++ ) {
        scene.textures.add(scene.add.image(i * 256, j * 256, 'stone').setOrigin(0,0).setDepth(-1));
      }
    }
    scene.scene.switch(SCENES.LEVEL_SIX_INTRO);
  }, 5000)
}

export const getlevelSeven = (scene) => {
  setTimeout(() => {
    scene.level = 7;
    clearLevel(scene);
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 4; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'zombieMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 4; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'spiderMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 3; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'lizardMove');
      }
    }
    scene.scene.switch(SCENES.LEVEL_SEVEN_INTRO);
  }, 5000)
}

export const getlevelEight = (scene) => {
  setTimeout(() => {
    scene.level = 8;
    clearLevel(scene);
    scene.textures.clear(true);
    for(let i = 0; i < 8; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
      }
    }
    for(let i = 0; i < 9; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'zombieMove');
      }
    }
    for(let i = 0; i < 4; i ++) {
      for(let j = 0; j < 4; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'spiderMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 4; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'lizardMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 3; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'iceMove');
      }
    }
    for (let i = 0; i < 10; i ++ ) {
      for (let j = 0; j < 8; j ++ ) {
        scene.textures.add(scene.add.image(i * 256, j * 256, 'ice').setOrigin(0,0).setDepth(-1));
      }
    }
    scene.scene.switch(SCENES.LEVEL_EIGHT_INTRO);
  }, 5000)
}

export const getlevelNine = (scene) => {
  setTimeout(() => {
    scene.level = 9;
    clearLevel(scene);
    for(let i = 0; i < 10; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'alienMove');
      }
    }
    for(let i = 0; i < 10; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'zombieMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'spiderMove');
      }
    }
    for(let i = 0; i < 5; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'lizardMove');
      }
    }
    for(let i = 0; i < 4; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'iceMove');
      }
    }
    scene.scene.switch(SCENES.LEVEL_NINE_INTRO);
  }, 5000)
}

export const getlevelTen = (scene) => {
  setTimeout(() => {
    scene.level = 10;
    clearLevel(scene);
    for(let i = 0; i < 10; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'zombieMove');
      }
    }
    for(let i = 0; i < 10; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'spiderMove');
      }
    }
    for(let i = 0; i < 10; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'lizardMove');
      }
    }
    for(let i = 0; i < 10; i ++) {
      for(let j = 0; j < 5; j ++) {
        new Monster(scene, 1024 + 100 * i + Math.random() * 100, 768 + 100 * j + Math.random() * 100, 'iceMove');
      }
    }
    scene.scene.switch(SCENES.LEVEL_TEN_INTRO);
  }, 5000)
}

export const getEndGame = (scene) => {
  setTimeout(() => {
    scene.level = 11;
    clearLevel(scene);
    scene.scene.restart();
    scene.scene.switch(SCENES.END_GAME);
  }, 3000)
}
