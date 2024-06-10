let label = "waiting...";
let confidence = 0.0;
let classifier;
let modelURL = 'https://teachablemachine.withgoogle.com/models/-lnFiy4oE/';
let noodleImg; 
let grazeImg; 
let redbullImg; 
let video;
let currentImage;

function preload() {
  classifier = ml5.imageClassifier(modelURL + 'model.json');
  noodleImg = loadImage('noodle.jpg');
  grazeImg = loadImage('graze.jpg');
  redbullImg = loadImage ('redbull.jpg');
}

function setup() {
  createCanvas(350, 400);
  video = createCapture(VIDEO, () => {
    console.log('Camera initialization successful.');
  }, (err) => {
    console.error('Camera initialization failed:', err);
  });
  video.hide();
  classifyVideo();
}

function get_current_video(){
  switch(label){
    case "pot noodle":
      return noodleImg
    case "graze":
      return grazeImg
    case "red bull ":
      return redbullImg
    default:
      return null
  }

}

function draw() {

  background(0);
  if(confidence > 0.8){
    currentImage = get_current_video();
    if(currentImage){
      image(currentImage, 0, 0, width, height);
    }
  }else{
    image(video, 0, 0, width, height);
  }

  //if (label == "pot noodle" && confidence > 0.8) {
    //image(noodleImg, 0, 0, width, height);
  //} else if (label == "graze" && confidence > 0.8) {
    //image(grazeImg, 0, 0, width, height);
  //} else if (label == "redbull" && confidence > 0.8) {
    //image(redbullImg, 0, 0, width, height);
//}


  //display labels
  textSize(32);
  textAlign(CENTER, CENTER);
  fill(255);
  text(label + " " + confidence, width / 2, height - 16);
}

// STEP 2: Do the classifying
function classifyVideo() {
  classifier.classify(video, gotResults);
}

// STEP 3: Get the classification
function gotResults(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // Store the label and classify again
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2);
  classifyVideo();
}
