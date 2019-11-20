window.onkeydown = function (event) {
  if (event.keyCode === 32) {
      event.preventDefault();
  }
};

const map = document.querySelector('.tablecontainer');

class Player {
  constructor() {
    this.element = null;
  }

  move(where) {
    if (!where || where.classList.contains("map-wall")) {
      return;
    }

    this.element.classList.remove('player');
    where.classList.add("player");
    aplle();
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
  }
}

const player = new Player();
document.addEventListener('keydown', (e) => {
  player.handleMove(e.keyCode);
  console.log(player);
});


const monsters = [...document.querySelectorAll('.monster')].map(el => {
  return {
    domElement: el,
    domElementIndex: [...el.parentElement.children].indexOf(el),
    life: 5,
    intervalId: undefined
  }
})


monsters.forEach(monster => {
  const index = [...monster.domElement.parentElement.children].indexOf(monster.domElement)
  const monsterAttackDirection = () => {
    if (monster.domElement.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains('player') ||
      monster.domElement.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains('player') ||
      monster.domElement.previousElementSibling.classList.contains('player') ||
      monster.domElement.nextElementSibling.classList.contains('player')
    ) {

      life -= Math.floor(Math.random() * 10) +1;
      renderLife()

    } else {
      return;
    }

  }
  monster.intervalId = setInterval(monsterAttackDirection, 1000)

});


const playerAttack = () => {
  monsters.forEach(monster => {
    const player = document.querySelector(".player");
    const index = [...player.parentElement.children].indexOf(player);

    if (
      player.previousElementSibling === monster.domElement ||
      player.nextElementSibling === monster.domElement ||
      player.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`) === monster.domElement ||
      player.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`) === monster.domElement
    ) {

      monster.life -= 1;
      console.log(player.nextElementSibling)
      console.log(player.previousElementSibling)
      console.log(monster.life)
      console.log(monster)
      if (monster.life === 0) {
        monster.domElement.classList.remove("monster");
        monster.domElement.classList.remove("map-wall");
        clearInterval(monster.intervalId);
        monsters.filter(monster => monster.live > 0)
      }
    }
  })
}


const applePosition = document.querySelector(".apple");
const aplle = () => {
  if (applePosition.classList.contains("player")) {
    heal();
    applePosition.classList.remove("apple")
  } else {
    return;
  }
}

const heal = () => {
  life += 50;
  if (life > 100) life = 100;
  renderLife();
}

let life = 100;

//heart poza funkcję
//poprawić działanie funkcji (append, innerHTML)
//zmiana nazwy z renderLife na renderLifeBar
//funkcja changeLife zamiast heal i utraty życia w monsterze

function renderLife() {
  const heart = document.createElement('img');
  heart.src = "tiles/heart.png";
  heart.style.width = "1em";
  let lifeBar = document.getElementById('game--life--bar');
  lifeBar.style.width = `${life}%`;
  if (life > 0) {
    lifeBar.innerHTML = `${life}%`;
    lifeBar.appendChild(heart);
  } else {
    lifeBar.innerHTML = '0%';
    lifeBar.appendChild(heart);
    displayGameOverModal();
    // alert("Your smelly corpse is rotting in dungeon, better luck next time!");
  };
};

document.addEventListener('keydown', (e) => {
  const playerPosition = document.querySelector(".player");
  const index = [...playerPosition.parentElement.children].indexOf(playerPosition);
  switch (e.keyCode) {
    case 32:

      if (playerPosition.previousElementSibling.classList.contains("monster") ||
        playerPosition.nextElementSibling.classList.contains("monster") ||
        playerPosition.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains("monster") ||
        playerPosition.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains("monster")
      )
        playerAttack()


      break;
  }
});


// Modal

const modal = document.getElementById("myModal");
function displayModal() {
  modal.style.display = "block";
}

const gameOverModal = document.getElementById("myGameOverModal");
function displayGameOverModal() {
  gameOverModal.style.display = "block";
}


// Chest animation
// warto dodatkowo zatrzymac wszystkie zbedne skrypty?


const spriteSheet = document.getElementById("sprite-image");
const widthOfChestSpriteSheet = 100;
const widthOfEachChestSprite = 50;


function startAnimation() {
  let position = widthOfEachChestSprite; //start position for the image
  const diff = widthOfEachChestSprite; //difference between two sprites
  const speed = 1500;
  spriteSheet.style.backgroundPosition = `-${position}px 0px`;


  setTimeout(function () {
    if (position < widthOfChestSpriteSheet) {
      position = 0;
    } else {
      position = position + diff;
    }
  }, speed);

  setTimeout(displayModal, 1000);
}

// Open chest & show score in Modal
//bug: when you press space multiple times quickly before modal shows it will display multiplication of score i.e. "320003200032000"
// fix bug = zrob ze score tablice i wyswietlaj pierwszy element
// zaimplementuj strone ta - nowastrona.htlm i reszte tych plikow
//zrob obrazki jablka i potworow (wyczysc je z tla) a jablko ogarnij zeby byl sprite i zeby sie obracalo

const scoreParagraph = document.getElementById("score");

document.addEventListener('keydown', (e) => {
  const playerPosition = document.querySelector(".player");
  const index = [...playerPosition.parentElement.children].indexOf(playerPosition);
  let scanForThreats = document.getElementsByClassName("monster").length;
  let score = life * 1000;
  switch (e.keyCode) {
    case 32:

      if (scanForThreats === 0 && (playerPosition.previousElementSibling.classList.contains("chest") ||
        playerPosition.nextElementSibling.classList.contains("chest") ||
        playerPosition.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains("chest") ||
        playerPosition.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains("chest")
      )) {
        scoreParagraph.textContent += `${score}`;
        startAnimation();
      }
      break;
  }
});


// const newMap = [
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//   [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
// ];

// createTD = (newMap)=>{
//   arrayFrom.forEach((elem)=>{
//     document.createElement("tr")
//     return arrayFrom
//   });
// }


// ctr - corner top right
// ctl - corner top left
// cbr - corner bottom right
// cbl - corner bottom left
// mf - map floor
// mfd - map floor diff
// mfs - map floor sewer
// wi - wall image
// wil - wall image lamp
// wid - wall image door
// wh - wall horizontal
// wv - wall vertical
// ws - wall split into 2
// wc - wall cross 
// wet - wall end top
// wer - wall end right
// wel - wall end left
// web - wall end bottom
// wcan - wall canal
// wwet - wall wet 
// we - wall edge
// ww - water
// wwb - water bucket
// 
// 
// 
// 
// 





// document.addEventListener('keydown',(e)=>{
//   const player = document.querySelector(".player");
//   const index = [...player.parentElement.children].indexOf(player);
//   switch(e.keyCode){
//     case 37:
//       const prev = player.previousElementSibling;
//       if(!prev || prev.classList.contains("map-wall")){return
//       }
//       prev.classList.add("player");
//       player.classList.remove('player');

//       break;
//     case 39:
//      const next = player.nextElementSibling
//         if(!next || next.classList.contains("map-wall")){return}
//       next.classList.add("player"); 
//       player.classList.remove('player');

//       break;
//     case 38:
//       const upwardsElement = player.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`);
//       if(!upwardsElement || upwardsElement.classList.contains("map-wall")){return}
//       upwardsElement.classList.add('player');
//       player.classList.remove('player');
//           break;
//     case 40: 
//       const downwardElement = player.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`);
//       if(!downwardElement || downwardElement.classList.contains("map-wall")){return}
//       downwardElement.classList.add('player');
//       player.classList.remove('player');

//           break;
//   };
// });






// document.addEventListener('keydown', (e) => {
//   const player = document.querySelector('.player');

//   switch(e.keyCode) {
//       case 37:
//           //left
//           player.previousElementSibling.classList.add('player');
//           player.classList.remove('player');
//           break;

//       case 39:
//           //right
//           player.nextElementSibling.classList.add('player');
//           player.classList.remove('player');
//           break;

//       case 38:
//           //up
//           break;
//       case 40:
//           //down
//           const index = [...player.parentElement.children].indexOf(player);
//           player.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.add('player');
//           player.classList.remove('player');
//           break;
//   }
// })


// addEventListener('keydown', (e) => {
//   if (player.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains('monster')
//     || player.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains('monster')
//     || player.previousElementSibling.classList.contains("monster")
//     || player.nextElementSibling.classList.contains("monster")) {
//     for (e.keyCode === 32) {
//       playerAttack();
//     }
//   }
// })
