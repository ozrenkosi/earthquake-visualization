var mapImage;
var earthquakeDataFile;
var centerLatitude = 0;
var centerLongitude = 0;
var mapWidth = 1024;
var mapHeight = 512;
var zoomFactor = 1;
var centerX, centerY;
var i;
var earthquakeData;
var latitude, longitude;
var circleX, circleY;
var magnitude;
var magnitudeMax = 100000;
var diameter;
var color_red, color_green, color_blue;

function preload() {
  mapImage = loadImage('https://api.mapbox.com/styles/v1/mapbox/dark-v9/static/' + centerLatitude + ',' + centerLongitude + ',' + zoomFactor + '/' + mapWidth + 'x' + mapHeight + '?access_token=pk.eyJ1IjoibWlraTEyMzEyMyIsImEiOiJjajBkdDQ1ODQwMDE0MndwZHR3amQwMm01In0.L5_kwh-OP2nRYuJyEo9TUQ');
  earthquakeDataFile = loadStrings('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.csv');
}

function setup() {
  createCanvas(mapWidth, mapHeight);
  translate(width / 2, height / 2);
  imageMode(CENTER);
  image(mapImage, 0, 0);

  centerX = convertCoordinatesToX(centerLongitude);
  centerY = convertCoordinatesToY(centerLatitude);

  for (i = 1; i < earthquakeDataFile.length; i++) {
    earthquakeData = earthquakeDataFile[i].split(/,/);
    latitude = earthquakeData[1];
    longitude = earthquakeData[2];
    magnitude = earthquakeData[4];

    circleX = convertCoordinatesToX(longitude) - centerX;
    circleY = convertCoordinatesToY(latitude) - centerY;

    color_red = map(earthquakeData[4], 0, 7, 0, 255);
    color_green = map(earthquakeData[4], 0, 7, 255, 0);
    color_blue = map(earthquakeData[4], 5, 10, 255, 0);

    magnitude = pow(10, magnitude/2);

    diameter = map(magnitude, 0, magnitudeMax, 0, 300);

    stroke(color_red, color_green, color_blue);
    fill(color_red , color_green, color_blue, 200);
    ellipse(circleX, circleY, diameter);
  }
}

// COORDINATES TO PIXELS CONVERSION
function convertCoordinatesToX(longitude) {
  return (256 / PI) * pow(2, zoomFactor) * (radians(longitude) + PI);
}

function convertCoordinatesToY(latitude) {
  return (256 / PI) * pow(2, zoomFactor) * (PI - log(tan(PI / 4 + radians(latitude) / 2)));
}
