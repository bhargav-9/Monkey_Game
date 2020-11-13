
var monkey , monkey_running;
var bananaImage, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0;
var ground;
var PLAY=5;
var stop=7;
var gamestate=5;
var survivaltime=0;
var points=0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
   
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,450);
monkey=createSprite(50,300,40,40);
  monkey.addAnimation("running",monkey_running)
  monkey.scale=0.1;
  ground=createSprite(200,330,1000,10);
   FoodGroup=createGroup();
  obstacleGroup=createGroup();
}


function draw() {
background("yellow");
 background.velocityX=-7;
  
  if(gamestate==5){
  ground.velocityX=-(6 +survivaltime/100)
  ground.visible=true;
    monkey.visible=true;
 if (ground.x < 0){
      ground.x = ground.width/2;
    }
 
 
  
if(keyDown("space") && monkey.y>=250) {
        monkey.velocityY = -12;
        
}  
  monkey.velocityY =monkey.velocityY + 0.8
  
    
  
  if (frameCount%100==0){
 obstac ();
    
  }

  
   if (frameCount%80==0){
  food();
   }
 
  if (FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+60;
  
  

  }
  stroke("black");
  textSize(20);
  fill("black");
  //survivaltime=Math.ceil(frameCount/frameRate())
  survivaltime = survivaltime + Math.round(getFrameRate()/60);
  points=+(score+survivaltime);
  
  text("Points:"+points,100,50);
  if(obstacleGroup.isTouching(monkey)){
    gamestate=7;
    
  }
  monkey.collide(ground);  
  
  console.log(survivaltime);
  }
  if(gamestate==7){
    
    gameOver();
  }
  if (gamestate==7 && keyDown("R")){
    gamestate=5;
    score=0;
    survivaltime=0;
    points=0;
    
  }
  
  
  
  drawSprites()
}


function obstac (){
  var obstacles=createSprite(500,310,10,10)
  obstacles.addImage("crash",obstacleImage)
  obstacles.scale=0.1;
  obstacles.lifetime=550;
  obstacles.velocityX=-(6 +survivaltime/99)
  obstacleGroup.add(obstacles);
  
}

function food (){
  
  var sd=(Math.round(random(200,300)));
  console.log(sd);
  var banana=createSprite(500,sd,10,10)
  banana.addImage("crash",bananaImage)
  banana.velocityX=-(6 +survivaltime/100)
  banana.scale=0.1;
  banana.lifetime=550;
  FoodGroup.add(banana);
}

function gameOver(){
  
  monkey.visible=false;
  FoodGroup.destroyEach();
  obstacleGroup.destroyEach()
  ground.visible=false;
 fill("black");
  text("Game Over",200,100);
   fill("black")
  text("Please press R to restart",200,300)
    
}







