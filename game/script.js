const map = document.querySelector('.tablecontainer');

class Player {
  constructor(){
    this.element = null;
  }
  
  move(where) {
    if (!where || where.classList.contains("map-wall")) {return;}

    this.element.classList.remove('player');
    where.classList.add("player");
    changeLife();
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

let life = 100;
let lifePortion = 1;

function changeLife () {
  const heart = document.createElement('img');
  heart.src = "./img/heart.png";
  heart.style.width = "1em";
  
  let lifeBar = document.getElementById('game--life--bar');
  life -= lifePortion;
  lifeBar.style.width = `${life}%`;
  lifeBar.innerHTML = '';
  lifeBar.appendChild(heart);

  if (life > 0) {
    lifeBar.appendChild(document.createTextNode(`${life}%`));
  } else {
      lifeBar.style.width = '0%';
      lifeBar.appendChild(document.createTextNode(`0%`));
      setTimeout(() => alert("Your smelly corpse is rotting in dungeon, better luck next time!"), 0);
  };
};