window.onkeydown = function (event) {
  if (event.keyCode === 32) {
      event.preventDefault();
  }
};

const LIFE_PORTION = Math.floor(Math.random() * 25);

class Player {
  constructor() {
    this.element = null;
  };

  move(where) {
    if (!where || where.classList.contains("map__tile--wall")) {
      return;
    };

    this.element.classList.remove('player');
    where.classList.add("player");
    apple();
  }

  handleMove(direction) {
    this.element = document.querySelector(".player");
    const index = [...this.element.parentElement.children].indexOf(this.element);
    switch (direction) {
      case 37:
        const prev = this.element.previousElementSibling;
        this.move(prev);
        break;

      case 39:
        const next = this.element.nextElementSibling;
        this.move(next);
        break;
      
      case 38:
        const upwardsElement = this.element.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`);
        this.move(upwardsElement);
        break;

      case 40:
        const downwardElement = this.element.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`);
        this.move(downwardElement);
        break;
    };
  };
};

const player = new Player();
document.addEventListener('keydown', e => {
  player.handleMove(e.keyCode);
});

const monsters = [...document.querySelectorAll('.monster')].map(el => {
  return {
    domElement: el,
    domElementIndex: [...el.parentElement.children].indexOf(el),
    life: 5,
    intervalId: undefined,
  };
});

monsters.forEach(monster => {
  const index = [...monster.domElement.parentElement.children].indexOf(monster.domElement);
  const monsterAttackDirection = () => {
    if (monster.domElement.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains('player') ||
      monster.domElement.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains('player') ||
      monster.domElement.previousElementSibling.classList.contains('player') ||
      monster.domElement.nextElementSibling.classList.contains('player')
    ) {
      if (life > 0) {
        life -= Math.floor(Math.random() * 10) + 1;
        renderLifeBar();
      };
      } else {
        return;
      };
    };
  monster.intervalId = setInterval(monsterAttackDirection, 1000);
});

const playerAttack = () => {
  monsters.forEach(monster => {
    const player = document.querySelector(".player");
    const index = [...player.parentElement.children].indexOf(player);

    if (player.previousElementSibling === monster.domElement ||
      player.nextElementSibling === monster.domElement ||
      player.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`) === monster.domElement ||
      player.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`) === monster.domElement
    ) {
      monster.life -= 1;
      if (monster.life === 0) {
        monster.domElement.classList.remove("monster");
        monster.domElement.classList.remove("map__tile--wall");
        clearInterval(monster.intervalId);
        monsters.filter(monster => monster.life > 0)
      };
    };
  });
};

const applePosition = document.querySelector(".map__item--apple");
const apple = () => {
  if (applePosition.classList.contains("player")) {
    heal();
    applePosition.classList.remove("map__item--apple");
  } else {
    return;
  };
};

const heal = () => {
  life += 50;
  if (life > 100) {
    life = 100;
  };
  renderLifeBar();
};

let life = 100;

const lifeBar = document.getElementById('life__display--bar');
const lifeCurrentLevel = document.getElementById('life__display--currentLevel');

//IDEA - let lifePortion = 1;
//IDEA - changeLife function instead of heal and loose life in monster

function renderLifeBar() {
  lifeBar.style.width = `${life}%`;
  lifeCurrentLevel.innerHTML = '';
  if (life > 0) {
    lifeCurrentLevel.appendChild(document.createTextNode(` ${life}%`));
  } else {
    lifeCurrentLevel.appendChild(document.createTextNode(` 0%`));
    displayGameOverModal();
    return;
  };
};

document.addEventListener('keydown', e => {
  const playerPosition = document.querySelector(".player");
  const index = [...playerPosition.parentElement.children].indexOf(playerPosition);
  switch (e.keyCode) {
    case 32:
      if (playerPosition.previousElementSibling.classList.contains("monster") ||
        playerPosition.nextElementSibling.classList.contains("monster") ||
        playerPosition.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains("monster") ||
        playerPosition.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains("monster")
      ) {
        playerAttack();
      };
      break;
  };
});

// Modal

const victoryModal = document.getElementById("myVictoryModal");
function displayVictoryModal() {
  victoryModal.style.display = "block";
};

const gameOverModal = document.getElementById("myGameOverModal");
function displayGameOverModal() {
  gameOverModal.style.display = "block";
};

// Chest animation

const spriteSheet = document.getElementById("map__item--sprite--img");
let widthOfChestSpriteSheet = 90;
let widthOfEachChestSprite = 45;
if (window.innerHeight <= 800) {
  widthOfChestSpriteSheet = 50;
  widthOfEachChestSprite = 25;
}

function startAnimation() {
  let position = widthOfEachChestSprite; //start position for the image
  const diff = widthOfEachChestSprite; //difference between two sprites
  const speed = 1500;
  spriteSheet.style.backgroundPosition = `-${position}px 0px`;

  setTimeout(function () {
    //console.log(`jednostka miary ${position}`);
    if (position < widthOfChestSpriteSheet) {
      position = 0;
    } else {
      position = position + diff;
    };
  }, speed);

  setTimeout(displayVictoryModal, 1000);
};

// Open chest & show score in Modal

const scoreParagraph = document.getElementById("victoryModal__score");

document.addEventListener('keydown', e => {
  const playerPosition = document.querySelector(".player");
  const index = [...playerPosition.parentElement.children].indexOf(playerPosition);
  let scanForThreats = document.getElementsByClassName("monster").length;
  let score = life * 1000;
  switch (e.keyCode) {
    case 32:
      if (scanForThreats === 0 && (playerPosition.previousElementSibling.classList.contains("map__item--chest") ||
        playerPosition.nextElementSibling.classList.contains("map__item--chest") ||
        playerPosition.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains("map__item--chest") ||
        playerPosition.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains("map__item--chest")
      )) {
        scoreParagraph.textContent += `${score}`;
        startAnimation();
      };
      break;
  };
});
