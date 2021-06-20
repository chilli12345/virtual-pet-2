//Create variables here
var dog,happyDog , foodS, foodStock;
var dogImage;
var database;
var fedTime, lastFed;
var feed,addFood;
var foodObj;

function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000, 400);
  
  foodObj = new Food();
  
  foodStock=database.ref("Food");
  foodStock.on("value",readStock);

  dog=createSprite(800,200,150,1500);
  dog.addImage(dogImage);
  dog.scale=0.15;
 
  feed=createButton("Feed Milk");
  feed.position(700,95);
  feed.mousePresses(feedDog);

  addFood=createButton("Stock milk");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}


function draw() {  
  background(green);
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val(); 
  });

  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed: "+lastFed%12 +" pm",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12am",350,30);
  }else{
    text("Ladt Feed : "+ lastFed + "am", 350,30);
  }
  
     drawSprites();
 }


function readStock(data){
   foodS=data.val();
   foodObj.updateFoodStock(foodS);
}
  

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

function addFoods(){
  foodS++;
  database.erf('/').update({
    Food:foodS
  })
}
  


