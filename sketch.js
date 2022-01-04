//estabalashing all predefined library functions
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

//allocating variables
let engine;
let world;
var ground;
var fruit,rope;
var fruit_con;

//allocating object variables
var bg_img;
var food;
var rabbit;
var bunny;
var button

//loading images
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');
}

//setting up functions
function setup() 
{
  //create template for background
  createCanvas(500,700);
  frameRate(80);

  //engine & world
  engine = Engine.create();
  world = engine.world;

  //setting up button object
  button = createImg("cut_button.png");
  button.position(230,30);
  button.size(30,30);
  button.mouseClicked(drop);

  //setting up ground object
  ground = new Ground(200,680,600,20);

  //setting up bunny sprite
  bunny = createSprite(200,620,100,100);
  bunny.addImage(rabbit);
  bunny.scale = 0.2;

  //setting up rope & fruit
  rope = new Rope(7,{x:245,y:30});
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  //attaching rope & fruit
  fruit_con = new Link(rope,fruit);

  //displaying shapes and objects
  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  imageMode(CENTER);
}

//displaying everything
function draw() 
{
  //displaying background
  background(51);

  //conditional function
  image(bg_img,width/2,height/2,490,690);
  if ( fruit!= null) {
    image(food,fruit.position.x,fruit.position.y,70,70);
  }

  //displaying and updating engine
  rope.show();
  Engine.update(engine);
  ground.show();
  drawSprites();
}

//cuttting rope function
function drop() {
  rope.break();
  fruit_con.detach();
  fruit_con = null;
}