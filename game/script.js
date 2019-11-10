const map = document.querySelector('.tablecontainer');

class Player {
  constructor(){
    this.element = null;
  }
  
  move(where) {
    if (!where || where.classList.contains("map-wall")) {return;}

    this.element.classList.remove('player');
    where.classList.add("player"); 
  }

  handleMove(direction){
    this.element = document.querySelector(".player");
    const index = [...this.element.parentElement.children].indexOf(this.element);
    switch(direction){
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
document.addEventListener('keydown',(e)=>{
  player.handleMove(e.keyCode);
    console.log(player);
});

const monsters = Array.from(document.querySelectorAll('.monster'));
monsters.forEach(monster => {
  const index = [...monster.parentElement.children].indexOf(monster)
  const monsterAttackDirection = () =>{
    if(monster.parentElement.previousElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains('player')
    || monster.parentElement.nextElementSibling.querySelector(`td:nth-child(${index + 1})`).classList.contains('player')
    || monster.previousElementSibling.classList.contains("player")
    || monster.nextElementSibling.classList.contains("player")
    ){
      changeLife()
    }else{
      return;
    }
  }
  setInterval(monsterAttackDirection,1000);

});





let life = 100;
let lifePortion = Math.floor(Math.random()*5);

function changeLife () {
  const heart = document.createElement('img');
  heart.src = "tiles/heart.png";
  heart.style.width = "1em";
  let lifeBar = document.getElementById('game--life--bar');
  life -= lifePortion;
  lifeBar.style.width = `${life}%`;
  if (life > 0) {
    lifeBar.innerHTML = `${life}%`;
    lifeBar.appendChild(heart);
  } else {
      lifeBar.innerHTML = '0%';
      lifeBar.appendChild(heart);
      // alert("Your smelly corpse is rotting in dungeon, better luck next time!");
  };
};





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