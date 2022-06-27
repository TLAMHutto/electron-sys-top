//get robotjs
var robot = require("robotjs");


function mouseMove(){
    robot.moveMouse(Math.floor(Math.random() * screenWidth), Math.floor(Math.random() * screenHeight));
    
}
