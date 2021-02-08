var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//Переменные для подгрузки изображения
var bg = new Image();
var witch = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();


//Координаты х,у,гравитации,расстояние между колонками
var xPos = 10;
var yPos = 150;
var grav = 1.2;
var GapBetweenColumns = 120;

var score = 0;

// Звук

var audioHelloween = new Audio();
audioHelloween.src = "audio/311b522e308b0ed.mp3";



// Пути к изображениям
bg.src = "img/horror-pumpkins-halloween_1574941038-768x432.jpg";
witch.src = "img/iconfinder_039_006_witch_broom_halloween_flying_3792053 (1).png ";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";

//Создание блоков
var pipe = [];
pipe[0] = {
     x:cvs.width,
     y:0
}



function draw(){
     ctx.drawImage(bg,0,0); 
     audioHelloween.play();
    // перебор массива pipe и добавления новых блоков в рандомном порядке
     for(var i = 0 ; i < pipe.length;i++){
          ctx.drawImage(pipeUp,pipe[i].x,pipe[i].y);
		ctx.drawImage(pipeBottom,pipe[i].x,pipe[i].y + pipeUp.height + GapBetweenColumns);
          pipe[i].x--;
          
          if(pipe[i].x == 100){
               pipe.push({
                    x:cvs.width,
                    y:Math.floor(Math.random() * pipeUp.height)-pipeUp.height
               })
          }
          // Прикосновения
          if(xPos + witch.width >= pipe[i].x
             && xPos <= pipe[i].x + pipeUp.width
             && (yPos <= pipe[i].y + pipeUp.height
                || yPos + witch.height >= pipe[i].y + pipeUp.height + GapBetweenColumns              
               
               )       
               
          ){
                    alert("Game over");
                    location.reload();
          }
          // Счёт игры
          if(pipe[i].x == 5)
              score++; 
     }
    
     ctx.drawImage(witch,xPos ,yPos);
    
    ctx.fillStyle = "#000";
    ctx.font = "20px verdana";
    ctx.fillText("Счёт:" + score,10,20 );
     yPos += grav;
	requestAnimationFrame(draw);
     
     
   
}

function moveUp(){
     yPos -= 25;
}

document.addEventListener("keydown",moveUp);

bg.onload = draw;