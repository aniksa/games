const game = {
	canvas : document.getElementById('clicker'),
	ctx : null,
	figures : [],
	init() {	
		this.figures = this.figures.concat(Ball.createList());
		this.setPixelRatio();	
	},
	run(){
		for (let item of this.figures){
			item.draw(this.ctx);
		}
	},
	onclick(e){
		for (let item of this.figures){
			item.onclick(e);
		}
	},
	setPixelRatio(){
		let dpr = window.devicePixelRatio || 1;
		let rect = this.canvas.getBoundingClientRect();
		this.canvas.width = rect.width * dpr;
		this.canvas.height = rect.height * dpr;
		this.ctx = this.canvas.getContext('2d');
		this.ctx.scale(dpr, dpr);
	}
};
class Figure {
	constructor(min, max){
		this.x = Math.round(Math.random() * (max-min) + min);
		this.y = Math.round(Math.random() * (max-min) + min);
		this.color = `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
	}
}
//класс Ball наследуется от класса Figure
class Ball extends Figure {
	constructor (min = 0, max = 300) {
		super(min, max);
		this.radius = Math.round(Math.random() * Math.min(this.x, this.y));
	}
	draw(ctx){
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	onclick(e){
		if ((e.x - this.x)*(e.x - this.x)+(e.y - this.y)*(e.y - this.y)<=this.radius*this.radius){
			console.log('clicked');
		}
	}
	static createList(){
		let list = [];
		list.push(new Ball(), new Ball(100, 600));
		return list;
	}
}
game.init();
setInterval(()=>game.run(),10);
document.addEventListener("click", (e)=>game.onclick(e), false);
