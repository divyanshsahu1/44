var limit = 0
var limited=0
var replace
var playerdata
var title,button,input
var db,pc,gs,greet,rbutton
var car1,car2,cars=[]
var carim1,carim2
var track,trackim
var rank =0
function preload(){
  carim1=loadImage("car1.png")
  carim2=loadImage("car2.png")
  trackim=loadImage("track.jpg")
}

function setup() {
createCanvas(window.innerWidth,window.innerHeight);
  title = createElement("H1")
title.html("Car-Racing")
title.position(window.innerWidth/2-180,50)

input=createInput()
input.position(window.innerWidth/2-100,300)
input.attribute("placeholder","Enter Your Name")
input.style("textAlign","center")
input.style("height","30px")
button =createButton("submit")
button.position(window.innerWidth/2-50,350)
button.style("backgroundColor","green")
button.style("height","60px")
button.style("width","60px")
button.style("borderRadius","30px")
car1=createSprite(639,200,50,50)
car1.addImage("c1",carim1)
car1.scale=0.1

car2 = createSprite(850,200,50,50)
car2.addImage("c1",carim2)
car2.scale=0.1
cars=[car1,car2]
car1.shapeColor="yellow"
rbutton= createButton("Reset")
rbutton.position(100,100)
rbutton.mousePressed(function(){
  db.ref("/").update(({playerCount : 0,gameState:0}))
  db.ref("players").remove()
})
db=firebase.database()
db.ref("playerCount").on("value",function (data){
pc=data.val()

})
db.ref("gameState").on("value",function(data){
  gs=data.val()
})
button.mousePressed(playerentry)
}

function draw() {
  background(232,25,245);  

if ( gs === 1 && limit===0){
db.ref("players").on("value",function(data){
playerdata=data.val()

})
limit=1
}

  if (pc===2){
gs=1
db.ref("/").update({gameState:gs})

}
if(gs===1){
  greet.hide()
title.hide()


image(trackim,0,-window.innerHeight*4,window.innerWidth,window.innerHeight*-4)
 var index=0
 for( var i in playerdata){
   cars[index].y=playerdata[i].y
   if (index===replace-1){ 
    fill("red")
     ellipse(cars[replace-1].x,cars[replace-1].y,90)
     
     camera.position.y=cars[index].y

   }
 index=index+1
 }
 if(keyDown("UP_ARROW")){
   cars[replace-1].y=cars[replace-1].y-14
   db.ref("players/player"+replace).update({
     y:cars[replace-1].y
   })
 }
 if (cars[replace-1].y < -5916 && limited === 0){
   rank=rank+1
  alert("your rank is "+rank)
  limited=1
 }
  drawSprites()
}
}
function playerentry(){
  pc=pc+1
  replace=pc
  db.ref("/").update({
    playerCount:pc
  })
  button.hide()
  input.hide()
  greet= createElement("H2")
  greet.html(" Welcome "+ input.value() +"  Watting for other player  ")
  greet.position(window.innerWidth/2-200,300)
db.ref("players/player"+pc).set(({y:-3000}))
}