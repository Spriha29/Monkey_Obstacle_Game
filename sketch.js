var monkey , monkey_running;
var ground;
var bananaImage, obstacleImage;
var bananaGroup, obstacleGroup;
var score;
var obstacle, banana;
var survivalTime;

function preload(){
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
bananaImage = loadImage("banana.png");
obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  score=0;
  survivalTime=0;
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
}


function draw() {
  background("white");
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")) {
    monkey.velocityY = -12;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(ground);
  
  
  
  spawnBananas();
  spawnObstacles();
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score:"+ score,500,50);
  
  
  
  if(obstacleGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  }
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time:"+ survivalTime,100,50);
}

function spawnObstacles() {
   if (frameCount % 300 === 0) {
   obstacle = createSprite(800,320,10,40);
   obstacle.velocityX = -6;
   obstacle.addImage(obstacleImage);
   obstacle.scale=0.15;
   obstacle.lifetime=300;
   obstacleGroup.add(obstacle);
   }
}

function spawnBananas() {
  if (frameCount % 80 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(120,200);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -5;
    banana.lifetime = 300;
    monkey.depth = banana.depth+1;
    bananaGroup.add(banana);
  }
}