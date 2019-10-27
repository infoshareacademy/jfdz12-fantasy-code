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

const newMap = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];


// newMap.forEach(el,index)

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