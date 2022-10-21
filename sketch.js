const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var rope,fruit,ground;
var fruit_con;
var bgimg;
var fruitimg;
var rabbit;
var bunny;
var button;
var blink;
var eat;
var sad;
var bgsound;
var cut;
var eating;
var cry;
var air;
var balao;
var mutebtn;
var btn2;
var btn3;
var rope2;
var rope3;
var fruit_con_2;
var fruit_con_3;
var canH;
var canW;
var star,star2;
var starimg;

function preload(){
bgimg=loadImage("background.png");
fruitimg=loadImage("melon.png");
rabbit=loadImage("Rabbit-01.png");
blink=loadAnimation("blink_1.png","blink_2.png","blink_3.png");
eat=loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png");
sad=loadAnimation("sad_1.png","sad_2.png","sad_3.png");
bgsound=loadSound("sound1.mp3")
cut=loadSound("rope_cut.mp3")
eating=loadSound("eating_sound.mp3")
cry=loadSound("sad.wav")
air=loadSound("air.wav")
starimg=loadImage("star.png")
emptystar=loadAnimation("empty.png")
onestar=loadAnimation("one_star.png")
twostar=loadAnimation("stars.png")

blink.playing=true
eat.playing=true
sad.playing=true

eat.looping=false
sad.looping=false
}



function setup() 
{
  // var isMobile=/iPhone | iPad | iPod | Android/i.test(navigator.userAgent)

  // if (isMobile) {
  //   canW=displayWidth
  //   canH=displayHeight
  //   createCanvas(displayWidth+80,displayHeight)
  // } else {
  //   canW=windowWidth
  //   canH=windowHeight
  //   createCanvas(windowWidth,windowHeight) 
  // }
  createCanvas(750,700)
  frameRate(80);

  bgsound.play()
  bgsound.setVolume(0.05)
  engine = Engine.create();
  world = engine.world;

  button=createImg("cut_btn.png")
  button.position(100,110)
  button.size(70,70)
  button.mouseClicked(drop)
  
  btn2=createImg("cut_btn.png")
  btn2.position(600,110)
  btn2.size(70,70)
  btn2.mouseClicked(drop2)

  // btn3=createImg("cut_btn.png")
  // btn3.position(400,240)
  // btn3.size(70,70)
  // btn3.mouseClicked(drop3)

  balao=createImg("baloon2.png")
  balao.position(350,380)
  balao.size(120,120)
  balao.mouseClicked(airblow)

  mutebtn=createImg("mute.png")
  mutebtn.position(690,20)
  mutebtn.size(50,50)
  mutebtn.mouseClicked(mute)

  star_display=createSprite(50,20,30,30)
  star_display.scale=0.2
  star_display.addAnimation("empty",emptystar)
  star_display.addAnimation("one",onestar)
  star_display.addAnimation("two",twostar)

  star_display.changeAnimation("empty")
  star=createSprite(380,50,20,20)
  star.addImage(starimg)
  star.scale=0.02

  star2=createSprite(50,350,20,20)
  star2.addImage(starimg)
  star2.scale=0.02

  rope = new Rope(9,{x:120,y:110});
  rope2 = new Rope(9,{x:650,y:110});
  // rope3 = new Rope(5,{x:420,y:240})
  ground = new Ground(300,height,width+15,1);
  
  blink.frameDelay=20
  eat.frameDelay=20
  sad.frameDelay=20

  bunny= createSprite(200,height-100,100,100)
  bunny.addImage(rabbit)
  bunny.scale=0.3
  bunny.debug=false
  bunny.setCollider("rectangle",0,0,50,50,0)
  
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("sadding",sad)
  bunny.changeAnimation("blinking")

  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope2,fruit);
  // fruit_con_3 = new Link(rope3,fruit)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER)
}

function draw() 
{
  background("darkblue");
  image(bgimg,0,0,width+750,height+700)
  Engine.update(engine);
 
  if(fruit!=null){
  image(fruitimg,fruit.position.x,fruit.position.y,80,80);
  }
 
  rope.show();
  rope2.show();
  // rope3.show();
  ground.show();

  if (collide(fruit,bunny,80)==true) {
    World.remove(engine.world,fruit)
    fruit=null
    bunny.changeAnimation("eating") 
    eating.play() 
  }

  if (fruit!=null&&fruit.position.y>=650) {
    bunny.changeAnimation("sadding") 
    cry.play()
    fruit=null
    }

  if (collide(fruit,star,50)==true){
    star.visible=false
    star_display.changeAnimation("one")
  }

  if (collide(fruit,star2,40)==true){
    star2.visible=false
    star_display.changeAnimation("two")
  }

  drawSprites()
}

function drop(){
  cut.play()
  rope.break()
  fruit_con.dettach()
  fruit_con=null
}

function drop2(){
  cut.play()
  rope2.break()
  fruit_con_2.dettach()
  fruit_con_2=null
}

function drop3(){
  cut.play()
  rope3.break()
  fruit_con_3.dettach()
  fruit_con_2=null
}

function collide(body,sprite,x){
  if (body!=null) {
    var d=dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
  if (d<=x) {
    return true
  } else {
    return false
  }
  }
}

function airblow(){
  Matter.Body.applyForce(fruit,{x:0,y:0},{x:0,y:-0.03})
  air.play()
  air.setVolume(0.5)
}

function mute(){
  if (bgsound.isPlaying()) {
    bgsound.stop()
  } else {
    bgsound.play()
  }
}