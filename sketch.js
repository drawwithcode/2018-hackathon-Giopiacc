var mySong;
var analyzer;

var myBg;
var myBg1;
var myImg;
var myImg1;
var myImg2;

var button;
var b = 0;
var t = 0;

var hats = [];

function preload() {
  // put preload code here
  mySong = loadSound("./assets/peakyblinders.mp3");
  myBg = loadImage("./assets/grad.jpg");
  myBg1 = loadImage("./assets/peaky.jpg");
  myImg = loadImage("./assets/logo.png");
  myImg1 = loadImage("./assets/hats.png");
  myImg2 = loadImage("./assets/gun.png");
}

function setup() {
  // put setup code here
  createCanvas(windowWidth, windowHeight);

  // mySong.play();
  analyzer = new p5.Amplitude();
  fft = new p5.FFT();
  analyzer.setInput(mySong);

  mySong.loop();

  button = createButton('play');
  button.style('padding', '23px');
  button.position(width/2-30, height/2+220);
  button.mousePressed(songReplay);

  button = createButton('pause');
  button.style('padding', '23px');
  button.position(width/2-40, height/2+300);
  button.mousePressed(songOnOff);

  // frameRate(20);
  // strokeWeight(0.2);
  var hatsNumber = random(5,10);

  for (var i = 0; i < hatsNumber; i++) {
    var myHat = new Hat(myImg1,random(0, width), random(0, height), 50,50);

    myHat.speed = random(1, 12)
    hats.push(myHat);
  }
  for (var k = 0; k < hatsNumber; k++) {
    var myHat = new Hat(myImg2 ,random(0, width), random(0, height), 80,50);

    myHat.speed = random(1, 12)
    hats.push(myHat);
  }



}

function draw() {
  // put drawing code here

  background(myBg1);


  // volume = map(volume, 0, 1, 0, height)

  if(mySong.isPlaying()){
    t = 1;
    background(myBg);
    var volume = analyzer.getLevel();
    volume = map(volume, 0, 1, 50, width);

   noFill();
   stroke('#F9C633');
   ellipse(width/2, height/2, volume/2);
   stroke('#E1B01C');
   ellipse(width/2, height/2, volume);
   stroke('#B6770B')
   ellipse(width/2, height/2, volume*2);
   stroke('#916616')
   ellipse(width/2, height/2, volume*3);
   stroke('#664201')
   ellipse(width/2, height/2, volume*4);
   var a = fft.analyze();
   var b = map(a[256], 50, 500, 1, 40);
  push();
  imageMode(CENTER);
  image(myImg, width / 2, height / 2, 80 * 0.4 * b, 40 * 0.4 * b);
  pop();

  for (var j = 0; j < hats.length; j++) {
    hats[j].move();
    hats[j].display();
  }
}

}


function songOnOff() {
  if(mySong.isPlaying()) {
   mySong.pause();
   t= 0;
   b=3;}
}


function songReplay() {
  if (mySong.isPaused()){
   t = 1;
   mySong.loop();
   mySong.rate(1);
   }
   else {mySong.rate(1)

     b=4;}
 }

 function Hat(_img,_x, _y,_w,_h) {
   this.img = _img
   this.x = _x
   this.y = _y
   this.w = _w
   this.h = _h
   this.speed = 20;


   var yDir = 1;
   var xDir = 1;

   this.display = function() {
     image(this.img, this.x, this.y,this.w,this.h)
   }

   this.move = function() {
     this.x += this.speed * xDir;
     this.y += this.speed * yDir;

     if (this.y > height || this.y < 0) {
       yDir = yDir * -1;
     }
     if (this.x > width || this.x < 0) {
       xDir = xDir * -1;
     }
   }

 }


 function windowResized() {
   resizeCanvas(windowWidth, windowHeight)
 }
