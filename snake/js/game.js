const BOX = 32;
const game = {
	canvas : document.getElementById('game'),
	ctx : null,
	items : [],
    ground: new Image(),
	init() {	
    		this.ground.src = "img/ground.png";
		this.items.push(new Item());
    		this.ctx = this.canvas.getContext("2d");
	},
	run(){
		this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
    		this.ctx.drawImage(this.ground, 0, 0);
    		snake.draw(this.ctx);
		for (let item of this.items){
			item.draw(this.ctx);
		}
	},
	update(){
    		snake.update();
		for (let item of this.items){
			item.update();
		}
	},
};

const snake = {
  tail: [{x:9*BOX,y:10*BOX}],
  color: 'green',
  draw(ctx){
    for (const cell of this.tail ){
      ctx.fillStyle = this.color;
      ctx.fillRect(cell.x,cell.y,BOX,BOX);  
    }
  },
  update(){
    if(this.dir === "left") this.tail[0].x -= BOX;
    if(this.dir === "up") this.tail[0].y -= BOX;
  }
}

class Item{
	constructor(){
	}
	draw(ctx){
	}
	update(){
	}
}
//Event
document.addEventListener("keydown", direction);

function direction(event){
	console.log(event);
 if(event.key === 'ArrowLeft' && snake.dir !== "right")
   snake.dir = "left";
 if(event.key === 'ArrowUp' && snake.dir !== "down")
   snake.dir = "up";
}

game.init();
setInterval(()=>{game.run();game.update()},100);
