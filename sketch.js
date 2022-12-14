/* 
      CSCI 201: ps5js      11/ 29/2022
*/
/* Notes from Class
1.Variables (objects)
2.Functions
** function preload() is executed before anything else, typically loading media files. The function is not required.
** function setup() is required. We typically create a “canvas” where we can place all objects. The function runs before any other functions, except preload() if existing.
** function draw() mimics the action of drawing, it is where the actions of the program are.
3. A p5js program actually consists of a number of files, index.html, various js files, media files, basically a collection of files for a complete website.*/


/*
 * This program sketch is copied from Xiannong Meng's example at
 * https://editor.p5js.org/xmeng/sketches/2d1U_D7rw 
 * which was copied from Evan Peck's example at  
 * https://editor.p5js.org/evanpeck/sketches/O7MjzPFxb
 * This is from my own learning.
 * Sarah Maldonado
 * 2022-11-29
 *
 * Xiannong Meng's Revisions
 * 1. 2022-06-28: added sound file loading and playing
 *    a. The Apollo launch audio file is downloaded from
 *    https://www.nasa.gov/62282main_countdown_launch.wav
 *    which is then converted into mp3 format to be used here.
 * 2. 2022-06-28: added a textbox; check if any ball is colliding with the textbox.
 *    If so, the ball reverses the move direction.
 
* Sarah Maldonado's Revision:
* 1. 11-29-2022: Added a background image of the moon.
*    a. The image was downladed from            https://www.theguardian.com/artanddesign/2018/dec/22/behold-blue-plant-photograph-earthrise
* 2.11-29-2022: Adjusted the opacity of the ball colors.
*     a.to make them more opaque by changed the this.alpha 
*     value to 250
* 3.12-13-2022 Rounded the edges of the text box.
*     a. The text box is defined as a rectangle and rectangles have the parameters of rect(x-coordinate, y-coordinate, width, heights,radius)  so I added a radius of 45.
* 4. 12-13-2022 Added border to objects.
*    a. I changed the strokeWeight to 2 for a thinner border and added stroke('white') for the color. The border surrounds the text, the text box, and the balls.
*/

const BOX_WIDTH  = 200;  // textbox dimensions
const BOX_HEIGHT = 100;

var balls = [];
var sound;
var testBall;
var img;

function preload() {

  sound = loadSound("apollo11.mp3");  // preload the sound file
  
 
}

function setup() {
  // load background image
  img = loadImage('moon.jpg');

  //createCanvas(windowWidth, windowHeight);
  
  // resize to fit picture nicely
  createCanvas(700,393)

  
  noStroke();
  
  //sound.play();    // play the audio file once
  sound.loop();  // play the sound file repeatedly
  
  for (var ballNum = 0; ballNum < 10; ballNum++) {
  	balls[ballNum] = new Ball();  
  }

  let y = height;
  testBall = new Ball();
  testBall.size = 50;
  testBall.ballX = 220;  // if ballX == 225, the ball just slides over the right edge
  testBall.ballY = 300;
  testBall.red = 0;
  testBall.blue = 0;
  testBall.green = 0;
  testBall.speedX = 0;
  testBall.speedY = 1.2;
}

function createBox() {
  // prepare a box first
  strokeWeight(2);
  stroke('white');
  rect(0, 0, BOX_WIDTH, BOX_HEIGHT,45);
  
  textSize(30);           // size of the text (pixels)
  fill(0, 102, 153)      // fill() takes R,G,B values as the color
  // draw the text in the box (x,y,width,height) with the color in fill()
  textAlign(CENTER);
  text('Hello World!', BOX_WIDTH/2, BOX_HEIGHT/2);   
 
}

function draw() {
  // set the background to the image
  background(img);

//background(255);
  createBox();
  
  testBallMove();  // a special ball to test corner collision
  
  for (var ballNum = 0; ballNum < balls.length; ballNum++) {
    balls[ballNum].display();
    balls[ballNum].checkForHitWall();
    balls[ballNum].checkForHitBox();
    balls[ballNum].moveBall();
    
    if (mouseIsPressed) {
      balls[ballNum].randomize()
    }
  }
}

function testBallMove() {
  
  testBall.display();
  testBall.checkForHitWall();
  testBall.checkForHitBox();
  testBall.moveBall();
}

class Ball { // Constructor
  
  constructor() {
    // initial position
    this.ballX = random(100, width)
    this.ballY = random(100, height)
    
    // Dictates velocity + direction
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
    
    this.size = random(100);
    
    // How transparent the ball is
    // adjusted to more opaque for image
    this.alpha = 250;
    
    
    // RGB values for color
    this.red   = random(255);
    this.green = random(255);
    this.blue  = random(255)
  }
  
  display() {
    fill(this.red, this.green, this.blue, this.alpha);
    ellipse(this.ballX, this.ballY, this.size);
  }
  
  randomize() {
    this.speedY = random(-5, 5);
    this.speedX = random(-5, 5);
  }
  
  checkForHitWall() {
  
    let radius = this.size / 2;
    if ((this.ballY+radius) > height || (this.ballY-radius) < 0) {
  	  this.speedY = -this.speedY;  
  	}
    if ((this.ballX+radius) > width  || (this.ballX-radius) < 0) {
      this.speedX = -this.speedX;  
    }
  }
  
  checkForHitBox() {
    
    let radius = this.size / 2;

//    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT) || d < radius) {
    if (((this.ballX-radius) < BOX_WIDTH && (this.ballY-radius) < BOX_HEIGHT)) {
      // bump into the textbox, need to reverse direction
      this.reverseBall();
    }
  }
  
  reverseBall() {
    
      this.speedX = -this.speedX;
      this.speedY = -this.speedY;    
  }
  
  moveBall() {

    this.ballX += this.speedX;
  	this.ballY += this.speedY;
  }
  
}