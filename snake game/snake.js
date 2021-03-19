
function init(){
    canvas = document.getElementById("myCanvas");
    W=H=canvas.width=canvas.height=1000;
    pen = canvas.getContext('2d');
    cs=67;
    score = 0;    
    food = getRandomFruit();
    food_Image = new Image();
    food_Image.src = "E:/Real DSA/snake game/img/apple.png";
    trophy_Image = new Image();
    trophy_Image.src = "E:/Real DSA/snake game/img/trophy.png";
    game_over=false;
    snake={
        init_length:5,
        color:"blue",
        cells:[],
        direction:"right",
        createSnake:function(){
            for(var i=this.init_length;i>0;i--){
                this.cells.push({x:i,y:0});
            }
        },
        drawSnake:function(){
             for(var i=0;i<this.cells.length;i++){
                 pen.fillStyle=this.color;
                 pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
             }   
        },
        updateSnake:function(){            
            var headx=this.cells[0].x;
            var heady=this.cells[0].y;
            if(headx==food.x && heady==food.y){
                food=getRandomFruit();
                score++;
            }else{
                this.cells.pop();
            }
            var X,Y;
            if(this.direction=="right"){
                 X=headx+1;
                 Y=heady;
            }else if(this.direction=="left"){
                 X=headx-1;
                 Y=heady;
            }else if(this.direction=="down"){
                 X=headx;
                 Y=heady+1;
            }else{
                 X=headx;
                 Y=heady-1;
            }
            var lX=Math.round(W/cs);
            var lY=Math.round(H/cs);
            if(this.cells[0].x<0 || this.cells[0].x>lX || this.cells[0].y<0 || this.cells[0].y>lY){
                game_over=true;
            }
            this.cells.unshift({x:X,y:Y});
            
            
        }
    }
    snake.createSnake();
    function keyPressed(e){
        if(e.key=="ArrowRight"){
            snake.direction="right";
        }else if(e.key=="ArrowLeft"){
            snake.direction="left";
        }else if(e.key=="ArrowDown"){
            snake.direction="down";
        }else{
            snake.direction="top";
        }
        console.log(e.key);
    }
    document.addEventListener('keydown',keyPressed);
    
}
function draw(){
    pen.clearRect(0,0,W,H);
    snake.drawSnake();
    pen.fillStyle=food.color;
    pen.drawImage(food_Image,food.x*cs,food.y*cs,cs,cs);
    pen.drawImage(trophy_Image,18,20,cs,cs);
    pen.fillStyle="blue";
    pen.font ="20px Roboto";
    pen.fillText(score,50,50);
}
function getRandomFruit(){
    var foodX = Math.round(Math.random()*(W-cs)/cs);
    var foodY = Math.round(Math.random()*(W-cs)/cs);
    var food={
        x:foodX,
        y:foodY,
        color:"red",
    }
    return food;
}
function update(){
    
    snake.updateSnake();
}
function gameLoop(){
    if(game_over==true){
        clearInterval(f);
        alert("game over");
    }
    draw();
    update();
}
init();
var f = setInterval(gameLoop,200);