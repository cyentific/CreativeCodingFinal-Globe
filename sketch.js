let r;
let bumpiness, thetaValue, phyValue;
let acceleration,v;
let rotation;
let color;
let backgroundMusic;
let soundEffect;
let onceSong;

//load sound files from folder
function preload() {
//  backgroundMusic = loadSound('background.mp3'); //https://pixabay.com/sound-effects/search/spaceship/
  soundEffect = loadSound('open.mp3');
}

function setup(){

  createCanvas(800, 800, WEBGL);
  angleMode(DEGREES); //Changing default angle mode to degrees
  colorMode(HSB); //Changing color mode to HSB
  color = 199; //initial color of globe
  strokeWeight(.1);
  noFill();

  //variables for changing sphere shape
  r = width/3; //radius
  bumpiness = 0; //variable that controls globe expansion/collapse illusion
  thetaValue = 10; //default sphere theta value
  phyValue = 10;  //default sphere phy value

  //variables to control speed and rotation
  aceleration = .001;
  rotation =0;
  v=0;

  //background music variables
  onceSong = false; //soundfx status boolean
//  backgroundMusic.play();//play backgorund

  pixelDensity(1);


}

function draw(){

  background(color, 50, 5);
  orbitControl(4, 4); //Orbit/camera position
  stroke(color, 55, 100);


 //The globe expands(collapse effect) when the mouse is pressed
 //The bumpiness variable controls/changes the position in space giving the illusion of expansion(or what looks like collapse)

  if (mouseIsPressed === true) { //globe will expand as mouse is pressed
    if (bumpiness >= 0 ){
      color = color-1; //color value will decrease by an increment of 1 (color in HSB)
      bumpiness = bumpiness + v; //bumpiness will increase by acceleration v
      v = v + acceleration; //acceleration accumulates every time it iterates

      //sound fx activates every time globe expands with every mouse press
      if(onceSong == false) { //since it defaults as false, it will only play sound fx while mouse pressed
        soundEffect.play();  //plays sound fx
        onceSong = true; //Changes soundfx boolean to true as the fx has played
      }
    }
  } else { //Globe will begin to contract when mouse is no longer pressed
    if (bumpiness >= 0){
      bumpiness = bumpiness - v; //bumpiness will decrease by acceleration v
      color = color+1; // color value will increase by an increment of 1(color in HSB)
      soundEffect.stop(); //stop sound effect once mouse is no longer pressed
      onceSong = false; //change sound fx boolean to false as the fx is no longer playing
    }else{ // continues until default values established in the beginning
      bumpiness = 0;
      v=0;
      color = 199;
    }
  }

rotation = rotation + .2; // rotates globe entire time by its current value + .2 indefinetly as its not in conditional

  rotateX(90);
  rotateY(-25);
  rotateZ(rotation);

// I referenced this video here https://youtu.be/SGHWZz5Mrsw?t=1074
// In the double for loop below theta and phy start at 0, but theta increments by 2 until 180, while phy increases by two until 360
// the variables x, y, z represent the different axis that create the globe
  beginShape(POINTS);
  for(let theta = 0; theta < 180; theta += 2){ //draws points of the sphere shape through vector
    for(let phy = 0; phy < 360; phy += 2){
      let x = r*(1+bumpiness*sin(thetaValue*theta)*sin(phyValue*phy)) * sin(1*theta) * cos(phy);
      let y = r*(1+bumpiness*sin(thetaValue*theta)*sin(phyValue*phy)) * sin(1*theta) * sin(phy);
      let z = r*(1+bumpiness*sin(thetaValue*theta)*sin(phyValue*phy)) * cos(1*theta);
      vertex(x, y, z);
    }
  }
  endShape();
}
