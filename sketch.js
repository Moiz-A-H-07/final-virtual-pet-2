//Create variables here
var dogi1,dogi2
var dog,foodS
var foodStock,database,fedTime,lastFed,feed,addFood,foodi,feedDog

function preload()
{
  //load images here
  dogi1=loadImage("images/dog1.png")
  dogi2=loadImage("images/dog2.png")
}

function setup() {
  createCanvas(1000, 400);
  database=firebase.database()
  dog=createSprite(800,200,150,150)
  foodi=new Food()
  dog.addImage(dogi1)
  dog.scale=0.15;
  foodStock=database.ref('food')
  foodStock.on("value",readStock)
  textSize(20)
  feed=createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)
  addFood=createButton("food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  
background(rgb(255, 240, 40))
foodi.display();
fedTime=database.ref('fedTime')
fedTime.on("value",function(data){lastFed=data.val()})


  
  fill("red")
  if(lastFed>=12){

  
  text("lastFed ",+lastFed%12+"pm",350,30)
} else if(lastFed==0){
  text("lastFed 12am",350,30)

} else {
  text("lastFed"+lastFed+"am",350,30)
}
drawSprites();

  //text("Press up Arrow key to feed tommy milk",130,10,300,20)
  //add styles here

}

function readStock(data){
  foodS=data.val()
  foodi. updateFoodStock(foodS)
}

function feedDog(){
  dog.addImage(dogi2)
   foodi. updateFoodStock(foodi.getFoodStock()-1)
  database.ref('/').update({food:foodi.getFoodStock(),fedTime:hour()})

}

function addFoods(){
  foodS++
  database.ref('/').update({food:foodS})
}


