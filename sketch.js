//variables pour créer les sprites
var nebula,vaisseau,points1,points2,points3,restart;
//variables pour les images
var nebulaImg, vaisseauImg,thrustImg,rocherImg,laserImg,explosionImg,coeurImg,coeurbImg,startImg;
var asteroideg,laserg;
//dimension zone de jeu
var LARGEUR = 800;
var HAUTEUR = 800;

// variables états de jeu
var vie, score, best,etat;
vie = 3;
score = 0;
best = 0;
etat="debut"
function preload(){
  //télécharger les images ici
  nebulaImg = loadImage("nebula.png");
  vaisseauImg = loadImage("spaceship.png");
  thrustImg = loadImage("thrust.png");
  rocherImg = loadImage("rock.png")
  laserImg = loadImage("laser.png")
  coeurImg =loadImage("coeur.gif")
  coeurbImg  = loadImage("coeurb.gif")
  startImg = loadImage("play.png")
explosionImg = loadAnimation("explosion300.png","explosion301.png","explosion302.png","explosion303.png","explosion304.png","explosion305.png","explosion306.png","explosion307.png","explosion308.png","explosion309.png","explosion310.png","explosion311.png","explosion312.png","explosion313.png","explosion314.png","explosion315.png");


}

function setup(){
  createCanvas(LARGEUR,HAUTEUR)

  
  nebula = createSprite(LARGEUR/2,HAUTEUR/2,LARGEUR/2,HAUTEUR/2);
  nebula.addImage(nebulaImg);
  nebula.scale = 2;
  points1 = createSprite(LARGEUR/2-80,HAUTEUR-40,20,20)
  points2 = createSprite(LARGEUR/2,HAUTEUR-40,20,20)
  points3 = createSprite(LARGEUR/2+80,HAUTEUR-40,20,20)
  points1.addAnimation("coeur1",coeurImg)
  points1.addAnimation("coeurb1",coeurbImg)
  points2.addAnimation("coeur2",coeurImg)
  points2.addAnimation("coeurb2",coeurbImg)
  points3.addAnimation("coeur3",coeurImg)
  points3.addAnimation("coeurb3",coeurbImg)
  points3.scale = 0.2
  points2.scale = 0.2
  points1.scale = 0.2
  vaisseau = createSprite(LARGEUR/2,HAUTEUR/2,20,20);
  vaisseau.addAnimation("spaceship",vaisseauImg);
  vaisseau.addAnimation("thrust",thrustImg);
  vaisseau.scale = 0.2;
  vaisseau.setCollider("rectangle",0,0,450,350);
    restart = createSprite (LARGEUR/2,HAUTEUR/2+100,20,20)
  restart.addAnimation("restart",startImg)
  restart.scale = 0.1
  asteroideg=createGroup()
  
laserg=createGroup()
}

function draw(){
  drawSprites();
 fill("yellow");
  textSize(30);
  text("score: "+score, 15, 35);
  fill ("red")
  textSize(30)
  text ("best: "+best,LARGEUR-170,35)  
  if (etat==="debut"){
   restart.visible=true;
   vie=3
   score=0
   vaisseau.x=LARGEUR/2
   vaisseau.y=HAUTEUR/2
  if (mousePressedOver(restart)){
     restart.visible=false
     etat="jeu"
    }
  }
  if (etat==="jeu"){
   if (vie===0) {
    etat="gameOver" 
   }

  if (vie===3) {
points1.changeAnimation("coeur1")  
points2.changeAnimation("coeur2") 
points3.changeAnimation("coeur3") 
  }
if (vie===2) {
points1.changeAnimation("coeur1")  
points2.changeAnimation("coeur2") 
points3.changeAnimation("coeurb3") 
  }    
if (vie===1) {
points1.changeAnimation("coeur1")  
points2.changeAnimation("coeurb2") 
points3.changeAnimation("coeurb3") 
  }  
if (vie===0) {
points1.changeAnimation("coeurb1")  
points2.changeAnimation("coeurb2") 
points3.changeAnimation("coeurb3")
}
   if (keyDown("right")) {
    vaisseau.rotation=vaisseau.rotation+5
            
  }
  if (keyDown("left")) {
    vaisseau.rotation=vaisseau.rotation-5
            
  }      
  if (keyDown("up")||keyDown("down")) {
    vaisseau.velocityX=vaisseau.velocityX+Math.cos(radians(vaisseau.rotation))
    vaisseau.velocityY=vaisseau.velocityY+Math.sin(radians(vaisseau.rotation))   
vaisseau.changeAnimation("thrust");    
}
  if(keyWentUp("up")||(keyWentUp("down"))){
   vaisseau.changeAnimation("spaceship") 
  }
   vaisseau.velocityX=vaisseau.velocityX*0.9
  vaisseau.velocityY=vaisseau.velocityY*0.9
 
  traverser(vaisseau)
  asteroidespawner()
  laserspawner()
    for (var i = 0; i < asteroideg.length; i++) {
    traverser(asteroideg.get(i))
    if (asteroideg.get(i).isTouching(vaisseau)) {
      var explosion1=createSprite (asteroideg.get(i).x,asteroideg.get (i).y)         
explosion1.addAnimation("explosion",explosionImg)
explosion1.scale=3
explosion1.lifetime=15
      asteroideg.get(i).destroy();
      vie =vie-1
    }
  for (var j = 0; j < laserg.length; j++) {
      for (var k = 0; k < asteroideg.length; k++){        

      if (laserg.get(j).isTouching(asteroideg.get(k))) {
var explosion=createSprite (asteroideg.get(k).x,asteroideg.get (k).y)         
explosion.addAnimation("explosion",explosionImg)
explosion.scale=3
explosion.lifetime=15
score+=100
         asteroideg.get(k).destroy()
          laserg.get(j).destroy()
       }
      }
  } 
}
  }
  if (etat==="gameOver"){
   asteroideg.destroyEach() 
    laserg.destroyEach()
    if (score>best) {
      best=score
    }
etat="debut"}
}
function traverser(sprite) {
  if (sprite.x>LARGEUR) {
  sprite.x=0
      
  }
  if (sprite.x<0) {
  sprite.x=LARGEUR
      
  }
  if (sprite.y>HAUTEUR) {
  sprite.y=0
      
  }
  if (sprite.y<0) {
  sprite.y=HAUTEUR
  }  
}
function asteroidespawner() {
if (World.frameCount%30===0) {
  var aléatoire1 = LARGEUR*Math.random()
  var aléatoire2 = HAUTEUR*Math.random()
  while (Math.abs(aléatoire1-vaisseau.x)<100&& Math.abs(aléatoire2-vaisseau.y)<100) {
  aléatoire1 = LARGEUR*Math.random()
  aléatoire2 = HAUTEUR*Math.random() 
  }
  
  var asteroide =createSprite(aléatoire1,aléatoire2);
  asteroideg.add(asteroide);
  asteroide.velocityX=Math.random()*10-5
  asteroide.velocityY=Math.random()*10-5
  asteroide.lifetime=300
  asteroide.addImage(rocherImg)
asteroide.scale=0.2
asteroide.setCollider("circle",0,0,200)
asteroideg.add(asteroide)
}
}
function laserspawner() {
if (keyWentDown("space")&& laserg.length<2 ) {
var laser = createSprite(vaisseau.x,vaisseau.y);
  laserg.add(laser)
  laser.addImage(laserImg)
  laser.scale=0.5;
  laser.rotation=vaisseau.rotation;
  laser.lifetime=100;
  laser.velocityX=5*Math.cos(radians(laser.rotation));
  laser.velocityY=5*Math.sin(radians(laser.rotation));
  laser.setCollider("rectangle",-10,0,120,60)
}}
