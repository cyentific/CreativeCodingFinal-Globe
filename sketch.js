let r;
let volatility, thetaValue, phyValue;
let acceleration, v;
let rotation;
let color;
let backgroundMusic;
let soundEffect;
let onceSong;
let toggleClick;

//load sound files from folder
function preload() {
  backgroundMusic = loadSound('background.mp3'); //https://pixabay.com/sound-effects/search/spaceship/
  soundEffect = loadSound('open.mp3');
}

function setup() {
  createCanvas(800, 800, WEBGL);
  angleMode(DEGREES); //Changing default angle mode to degrees
  colorMode(HSB); //Changing color mode to HSB
  color = 199; //initial color of globe
  strokeWeight(2);
  noFill();

  //boolean variable to establish if trackpad has been clicked
  toggleClick = false; //established as false so animation doesn't start until user presses trackpad

  //variables for changing globe shape
  r = width / 9; //radius
  volatility = 0; //variable that controls globe expansion/collapse illusion
  thetaValue = 10; //default sphere theta value
  phyValue = 10; //default sphere phy value

  //variables to control speed and rotation
  acceleration = .001;
  rotation = 0;
  v = 0;

  //background music variables
  onceSong = false; //soundfx status boolean
  backgroundMusic.play();

  pixelDensity(1);

}

function draw() {
  background(color, 50, 5);
  orbitControl(4, 4); //Orbit/camera position
  stroke(color, 55, 100);


  //The globe expands(collapse effect) when the mouse is pressed
  //The volatility variable controls/changes the position in space giving the illusion of expansion(or what looks like collapse)
  if (toggleClick === true) { //globe will expand as trackpad is clicked
    if (volatility >= 0) {
      color = color - 1; //color value will decrease by an increment of 1 (color in HSB)
      volatility = volatility + v; //volatility will increase by acceleration v
      v = v + acceleration; //acceleration accumulates every time it iterates
      //sound fx activates every time globe expands as mouse is preseed once
      if (onceSong == false) //since it defaults as false, it will only play sound fx after mouse has presesed
      {
        soundEffect.play(); //plays sound fx
        onceSong = true; //Changes soundfx boolean to true as the fx has played
      }
    }
  } else if (toggleClick === false) { //Globe will begin to contract when trackpad is clicked again
    if (volatility >= 0) {
      volatility = volatility - v; //volatility will decrease by acceleration v
      color = color + 1; // color value will increase by an increment of 1(color in HSB)
      soundEffect.stop(); //stop sound effect once mouse is pressed again
      onceSong = false; //change sound fx boolean to false as the fx is no longer playing
    } else { // continues until default values established in the beginning
      volatility = 0;
      v = 0;
      color = 199;
    }
  }

  // Rotation parameters
  rotation = rotation + 0.2; // rotates globe entire time by its current value + .2 indefinetly as its not in conditional
  translate(-510, -510); //establishing the origin point to the top left corner of canvas
  // for loop to draw the globes in a 3x3 grid
  for (let i = 0; i < 3; ++i){ //for loop iterates 3 times, translating the anchor point down 250 pixels, increments by 1 each time
    translate(0, 250); //translates the anchor point down to create each column
    for (let j = 0; j < 3; ++j){ // for loop iterates 3 times, translating anchor point right 250 pixels, increments by 1 each time
      if (j == 0) {
        push(); //pushes first time through
      }
      translate(250,0); // then translates to the right to call globe function and draws the second and third globes for each row
      drawGlobes();//
      if (j == 2) {
        pop(); //pops the third time through since, 0,1,2 (when it reaches 2 itll be the last iteration)
      }
    }
  }

  rotateX(90);
  /*rotateY(-25);
  rotateZ(rotation);*/
}
  // I referenced this video here https://youtu.be/SGHWZz5Mrsw?t=1074
  // I created a function to draw the globes
  //In the double for loop below theta and phy start at 0, while theta increments by 5 until 180, phy increases by 5 until 360
  // the variables x, y, z represent the different axis that create the globe
  // Because the volatility variable starts at 0, the globes start as whole because each axis below
  // includes volatility, but once the mouse is clicked and volatility increases, the lines expand with the increasing volatility making the lines expand in their axis
  function drawGlobes() {
    rotateX(rotation); //rotate globes at rest through x-axis with the rotation
    beginShape(POINTS); //drawing vector through drawing points that make lines which form a globe shape on the x,y, and z axis
    for (let theta = 0; theta < 180; theta += 5) {
      for (let phy = 0; phy < 360; phy += 5) {
        let x = r * (1 + volatility * sin(thetaValue * theta) * sin(phyValue * phy)) * sin(1 * theta) * cos(phy); //draws a curve across x axis in sphereical shape
        let y = r * (1 + volatility * sin(thetaValue * theta) * sin(phyValue * phy)) * sin(1 * theta) * sin(phy); // draws a curve across y axis in sphereical shape
        let z = r * (1 + volatility * sin(thetaValue * theta) * sin(phyValue * phy)) * cos(1 * theta); // draws a curve across z axis in sphereical shape
        vertex(x, y, z);
      }
    }
    endShape();//end of declaring points
  }

function mousePressed() {
  if (toggleClick == false) { // because this variable starts as false at rest, pressing the mouse pad once will turn it true, which will start the visual
    toggleClick = true;
  } else if (toggleClick == true) { // then because I only want the animation to start once clicked and end when clicked again
    toggleClick = false; //this variable will be turned false after it is clicked the second time
  }
}
