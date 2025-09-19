const MAX_SIZE = 50;
const MIN_SIZE = 10;
const DIR = 4;
const NUM_BALLS = 20;

const game = {
	canvas : document.getElementById('canvas'),
	ctx : null,
	figures : [],
	time: Date.now(),
	init() {	
		this.figures.push(new Ball(), ...Box.createList(3));//[Box,Box,Box] -> Box, Box, Box
                console.log(this.figures[0]._r + this.figures[0]._c );
                
		this.setPixelRatio();
	},
	run(){//draw, render
		this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height);
		for (let item of this.figures){
			item.draw(this.ctx);
			//item.update();
		}
               console.log(this.figures[0]._c);
	},
	update(){
		for (let item of this.figures){
			item.update();
		}
		let difTime = Date.now() - this.time;
		if (this.figures.length < NUM_BALLS && difTime > 600){
			this.time = Date.now();
			this.figures.push(new Ball(),new Box());
		}
	},
	setPixelRatio(){ //нужно для нормальной плотности точек на канвасе, комментировать не нужно
		let dpr = window.devicePixelRatio || 1;
		let rect = this.canvas.getBoundingClientRect();
		this.canvas.width = rect.width * dpr;
		this.canvas.height = rect.height * dpr;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.scale(dpr, dpr);
	}
};
//abstract
class Figure {
        static count = 0;
        constructor(minR = MIN_SIZE, maxR = MAX_SIZE){
                Figure.count++;
                this.coords = {x:MAX_SIZE,y:MAX_SIZE};
                this.dir = {dx: Math.random()*DIR+0.01,dy: Math.random()*DIR+0.01};
                this.color = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
        }
        draw(ctx){
                ctx.fillStyle = this.color;
                ctx.fill();
        }
        update(){
                this.coords.x += this.dir.dx;
                this.coords.y += this.dir.dy;
        }
}

class Ball extends Figure { //Ball : Figure
      //  _r = Math.random() * (MAX_SIZE - MIN_SIZE) + MIN_SIZE;//договірна приватна
     //   #c = {x:0,y:0};//приватна
	constructor(minR = MIN_SIZE, maxR = MAX_SIZE){
                super();
		this.radius = Math.floor(Math.random()*(maxR-minR)+minR);
                this._c = "green";
	}
        #move(){
                console.log("move");
        }
	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.coords.x, this.coords.y, this.radius, 0, Math.PI/2, false);
		super.draw(ctx);
		ctx.closePath();
	}
	update(){
              //  this.#move();
		super.update();
		if (this.coords.x - this.radius < 0 || this.coords.x + this.radius > game.canvas.width) this.dir.dx *= -1;
		if (this.coords.y - this.radius < 0 || this.coords.y + this.radius > game.canvas.height) this.dir.dy *= -1;
	}
}
class Box extends Figure {
        constructor(minR = MIN_SIZE, maxR = MAX_SIZE){
                super();
                this.width = Math.floor(Math.random()*(maxR-minR)+minR);
                this.height = Math.floor(Math.random()*(maxR-minR)+minR);
                this._c = "red";
        }
        draw(ctx){
               
                ctx.fillRect(this.coords.x, this.coords.y, this.width, this.height);
                super.draw(ctx);
        }
        update(){
                super.update();
                if (this.coords.x < 0 || this.coords.x + this.width > game.canvas.width) this.dir.dx *= -1;
                if (this.coords.y < 0 || this.coords.y + this.height > game.canvas.height) this.dir.dy *= -1;
        }
        static createList(num){
                const list = [];
                for (let i = 0; i < num; i++){
                        list.push(new Box());
                }

                return list;
        }
        static compare(a,b){
                
                return a.width*a.height - b.width*b.height;
        }
}

//ctx.fillRect(x,y,w,h); - для отрисовки прямоугольника
//де слухати? document
//що слухати? що робити, якщо почули?
function keyPressed(event) {//handler обробник
        console.log(event.key);
}
document.addEventListener("keypress", keyPressed );
document.addEventListener("click", function(event){
       console.log(event.clientX, event.clientY); 
} );

game.init();
setInterval(()=>{ 
        game.run(); 
        game.update();},10);
//Figure: x,y,dir,color | draw(),update()

//Ball:  radius 
//Box: width, height 