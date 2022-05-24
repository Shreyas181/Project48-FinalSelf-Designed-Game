 var steveImg, steve ;
 var wallImg, wall ;
 var dragonImg, dragon;
 var zombieImg, zombie;
 var creeperImg, creeper
 var spiderImg, spider;
 var gameOverImg, gameOver;
 var steveArmourImg;
 var wallGroup, zombieGroup, spiderGroup, creeperGroup,arrowGroup,dragonGroup;
var bgImg, bg;
var floorImg;
var life = 3;
var heartImg3
var heartImg2
var heartImg1, heart1, heart2, heart3,resetImg,reset 
var bowImg, bow;
var arrowImg, arrow;
var score = 0;
var gameState = "play";
var invisibleGround;
var incrementSound,gameOverSound,damageSound,arrowSound;

 function preload(){

 steveImg = loadImage("steve.png");
 gameOverImg = loadImage("gameOver.jpg");
 wallImg = loadImage("wall.png");
 dragonImg = loadImage("ender dragon.png")
 spiderImg = loadImage("spider.png");
 creeperImg = loadImage("creeper.png");
 zombieImg = loadImage("zombie.png");
 bgImg = loadImage("background.jpg");
 floorImg = loadImage("floor.png");
 heartImg3 = loadImage("heart_3.png");
 heartImg2 = loadImage("heart_2.png");
 heartImg1 = loadImage("heart_1.png");
 resetImg = loadImage("reset.png");
 arrowImg = loadImage("arrow.png");
 bowImg = loadImage("bow.png");
 incrementSound = loadSound("win.wav");
 arrowSound = loadSound("SwordHit.mp3");
 damageSound = loadSound("hit.mp3");
 gameOverSound = loadSound("gameOver.wav");

 }

 



function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width/2,height/2,20,20);
  bg.velocityX = -5;
  bg.addImage(bgImg);
  bg.scale = 1.5;
  invisibleGround = createSprite(100, height-10, 100, 10);
  invisibleGround.visible = false;

  steve = createSprite(100, height-90, 50, 50);
  steve.addImage(steveImg);
  steve.scale = 0.3;

  bow = createSprite(steve.x+70, steve.y+100, 50, 50);
  bow.addImage(bowImg);
  bow.scale = 0.6
  bow.visible = false;

  wallGroup = new Group();
  spiderGroup = new Group();
  zombieGroup = new Group();
  creeperGroup = new Group();
  arrowGroup = new Group();
  dragonGroup = new Group();

  

  heart1 = createSprite(displayWidth-150,40,20,20)
  heart1.visible = false
   heart1.addImage("heart1",heartImg1)
   heart1.scale = 0.4

   heart2 = createSprite(displayWidth-100,40,20,20)
   heart2.visible = false
   heart2.addImage("heart2",heartImg2)
   heart2.scale = 0.4

   heart3 = createSprite(displayWidth-150,40,20,20)
   heart3.addImage("heart3",heartImg3)
   heart3.scale = 0.4
  
   gameOver = createSprite(width/2, height/2, 50, 50);
   gameOver.addImage(gameOverImg);
   gameOver.scale = 0.5;
   gameOver.visible = false ; 

   reset = createSprite(width/2, height/2+00, 50, 50);
   reset.addImage(resetImg);
   reset.scale = 0.1;
   reset.visible = false;
  

}

function draw() {
  background(bgImg);  
  if(gameState=="play"){
  bg.velocityX = -(5+Math.round(score/100));
  steve.collide(invisibleGround);

  if(bg.x<210){
    bg.x = width/2;
  }

  if(keyDown("UP_ARROW")||touches.length>0){
    bow.visible = false;
    steve.y = steve.y-30;
    bow.y = steve.y+100;
  }
  if(keyDown("DOWN_ARROW")||touches.length>0){ 
   steve.y = steve.y+30;
   bow.y = steve.y+100;
   bow.visible = false;
  }
 
 
  if(keyWentDown("space")){
    bow.visible = false;
    arrow = createSprite(steve.x+70, steve.y-35, 50, 50);
    arrow.velocityX = 5; 
    arrow.addImage(arrowImg);
    arrowSound.play();
    arrow.scale = 0.2;
    arrowGroup.add(arrow);
  }
  
  //player goes back to original standing image once we stop pressing the space bar
  else if(keyWentUp("space")){
    bow.visible = true;
    bow.x = steve.x+70;
    bow.y = steve.y-30;
  }
 

  /*if(frameCount%140==0){
    var randomNumber = Math.floor(random(1, 5));
    if(randomNumber==1){
      zombieCreation()     
    }
    else if (randomNumber==2){
      creeperCreation()
      
    }
    else if (randomNumber==3){
      spiderCreation()
    }
    else if(randomNumber==4){
      dragonCreation();
    }
    else{
      wallCreation();
    }
  } */

  zombieCreation();
  wallCreation();
  dragonCreation();
  spiderCreation();
  creeperCreation()

  if(zombieGroup.isTouching(arrowGroup)){
  
    for(var i=0;i<zombieGroup.length;i++){     
       
     if(zombieGroup[i].isTouching(arrowGroup)){
       zombieGroup[i].destroy()
       arrowGroup[i].destroy();
        score= score+1;
       incrementSound.play();
        } 
    }
  }

  if(creeperGroup.isTouching(arrowGroup)){
  
    for(var i=0;i<creeperGroup.length;i++){     
       
     if(creeperGroup[i].isTouching(arrowGroup)){
       creeperGroup[i].destroy()
       arrowGroup[i].destroy();
         score = score +2 
         incrementSound.play();
        } 
    }
  }

  if(spiderGroup.isTouching(arrowGroup)){
  
    for(var i=0;i<spiderGroup.length;i++){     
       
     if(spiderGroup[i].isTouching(arrowGroup)){
       spiderGroup[i].destroy()
       arrowGroup[i].destroy();
         score= score+1 
         incrementSound.play();
        } 
    }
  }

  if(wallGroup.isTouching(arrowGroup)){
  
    for(var i=0;i<wallGroup.length;i++){     
       
     if(wallGroup[i].isTouching(arrowGroup)){
       wallGroup[i].destroy()
       arrowGroup[i].destroy();
         score= score+3 
         incrementSound.play();
        } 
    }
  }

  if(dragonGroup.isTouching(arrowGroup)){
  
    for(var i=0;i<dragonGroup.length;i++){     
       
     if(dragonGroup[i].isTouching(arrowGroup)){
       dragonGroup[i].destroy()
       arrowGroup[i].destroy();
         score= score+10 
         incrementSound.play();
        } 
    }
  }

  if(zombieGroup.isTouching(steve)){
 

    for(var i=0;i<zombieGroup.length;i++){     
         
     if(zombieGroup[i].isTouching(steve)){
          zombieGroup[i].destroy()
         life = life-1;
        damageSound.play();
          } 
    }
   }

   if(creeperGroup.isTouching(steve)){
 

    for(var i=0;i<creeperGroup.length;i++){     
         
     if(creeperGroup[i].isTouching(steve)){
          creeperGroup[i].destroy()
         life = life-1;
         damageSound.play();
          } 
    }
   }

   if(spiderGroup.isTouching(steve)){
 

    for(var i=0;i<spiderGroup.length;i++){     
         
     if(spiderGroup[i].isTouching(steve)){
          spiderGroup[i].destroy()
         life = life-1;
         damageSound.play();
          } 
    }
   }

   if(dragonGroup.isTouching(steve)){
 
    for(var i=0;i<dragonGroup.length;i++){     
         
     if(dragonGroup[i].isTouching(steve)){
         dragonGroup[i].destroy()
         life = life-1;
         damageSound.play();
          } 
    }
   }


   if(wallGroup.isTouching(steve)){
 

    for(var i=0;i<wallGroup.length;i++){     
         
     if(wallGroup[i].isTouching(steve)){
          wallGroup[i].destroy()
         life = life-1;
         damageSound.play();
          } 
    }
   }
   if(life==3){
    heart3.visible = true;
    heart2.visible = false;
    heart1.visible = false;
  }
  if(life == 2){
   heart3.visible = false;
   heart2.visible = true;
   heart1.visible = false;
  }
  if(life==1){
   heart3.visible = false;
   heart2.visible = false;
   heart1.visible = true;
  }
  if(life==0){
  heart3.visible = false;
  heart2.visible = false;
  heart1.visible = false;
  
  gameState="end";
  gameOverSound.play();
  }
  }
  else{
    
    zombieGroup.destroyEach();
    creeperGroup.destroyEach();
    spiderGroup.destroyEach();
    wallGroup.destroyEach();
    dragonGroup.destroyEach();
    arrowGroup.destroyEach();
    gameOver.visible = true;
    bg.velocityX=0;   
    reset.visible = true;
    if(mousePressedOver(reset)) {
      gameState = "play";
      stop
      life = 3;
      heart1.visible = true;
      heart2.visible = true;
      heart3.visible = true;
      score = 0;
      reset.visible = false;
      gameOver.visible = false;
      steve.y = height-90;
  }
  }
  
  drawSprites();

  
  textSize(30);
  fill("red");
  text("Score:"+score,width/2,100);
}



function zombieCreation(){
  if(frameCount%100===0){
  
    //giving random x and y positions for zombie to appear
    zombie = createSprite(width,500,40,40)

    zombie.y = Math.round(random(height-50, height/2-100));
    zombie.addImage(zombieImg)
    zombie.scale =  0.43;
    zombie.velocityX = -(6+Math.round(score/50));
    //zombie.debug= true
    zombie.setCollider("rectangle",0,0,200,200)
    zombie.lifetime = 600
   zombieGroup.add(zombie)
  }
  
  
}

function creeperCreation(){
  if(frameCount%80===0){
    
    

    //giving random x and y positions for zombie to appear
    creeper = createSprite(width,500,40,40)

    creeper.y = Math.round(random(height-50, height/2-100));
    creeper.addImage(creeperImg)
    creeper.scale = 0.45
    creeper.velocityX = -(3+Math.round(score/50));
    //creeper.debug= true
    creeper.setCollider("rectangle",0,0,200,200)
   
    creeper.lifetime = 600
   creeperGroup.add(creeper)
  }
  
  
}



function spiderCreation(){
  if(frameCount%120===0){
    
    

    //giving random x and y positions for zombie to appear
    spider = createSprite(width,500,40,40)

    spider.y = Math.round(random(height-50, height/2-100));
    spider.addImage(spiderImg)
    spider.scale = 0.40
    spider.velocityX = -(7+Math.round(score/50));
    //spider.debug= true
    spider.setCollider("rectangle",0,0,200,200);
   
    spider.lifetime = 600
   spiderGroup.add(spider)
  }
  
  
}

function wallCreation(){
  if(frameCount%140===0){
    
    //giving random x and y positions for zombie to appear
    wall = createSprite(width,500,40,40)

    wall.y = Math.round(random(height/3, height-100));
    wall.addImage(wallImg)
    wall.scale = 0.40
    wall.velocityX = -(3+Math.round(score/50));
   // wall.debug= true
    wall.setCollider("rectangle",0,0,200,200)
    wall.lifetime = 600
   wallGroup.add(wall)
  }    
}

 function dragonCreation(){
  if(frameCount%150==0){
    dragon = createSprite(Math.round(random(width-50, width/2-100)), Math.round(random(height-50, height/2-100)), 100, 100);
    dragon.velocityX = -(10+Math.round(score/100));
    dragon.addImage(dragonImg);
    dragon.scale = 0.3;
    dragonGroup.add(dragon);
    dragon.lifetime = 600;
  }
 }