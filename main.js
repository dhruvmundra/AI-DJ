song="";
function preload(){
    song=loadSound("music.mp3")
}
scoreRightwrist=0;
scoreLeftwrist=0;

RightwristX=0;
LeftwristX=0;
RightwristY=0;
LeftwristY=0;

function setup(){
    canvas=createCanvas(600,500);
    canvas.position(450,250);

    video=createCapture(VIDEO);
    video.hide();
    
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function gotPoses(results){
if(results.length>0){
    LeftwristX=results[0].pose.leftWrist.x;
    RightwristY=results[0].pose.rightWrist.y;
    LeftwristX=results[0].pose.leftWrist.x;
    RightwristY=results[0].pose.rightWrist.y;
    console.log("LeftwristX="+LeftwristX+ " RightwristX="+RightwristX);
    console.log("LeftwristY="+LeftwristY+ " RightwristY="+RightwristY);
}
}

function modelLoaded(){
    console.log('posenet in initialized')
}
function draw(){
    image(video,0,0,600,500);
    //if(scoreRightwrist>0.002){
        circle(RightwristX,RightwristY,20);
        if(RightwristY>0&&RightwristY<=100){
            document.getElementById("speed").innerHTML="speed=0.5x"
            song.rate(0.5);
        }
        else if(RightwristY>100 && RightwristY<=200){
            document.getElementById("speed").innerHTML="speed=1x"
            song.rate(1);
        }
        else if(RightwristY>200 && RightwristY<=300){
            document.getElementById("speed").innerHTML="speed=1.5x"
            song.rate(1.5);
        }
        else if(RightwristY>300 && RightwristY<=400){
            document.getElementById("speed").innerHTML="speed=2x"
            song.rate(2);
        }
        else if(RightwristY>400){
            document.getElementById("speed").innerHTML="speed=2.5x"
            song.rate(2.5);
        }
    //}
   //if(scoreLeftwrist>0.002){
        circle(LeftwristX,LeftwristY,20);
        InNumerleftWristY=Number(LeftwristY);
        new_leftWristY=floor(InNumberleftWristY*2);
        leftWristY_divide_1000=new_leftWristY/1000;
        document.getElementById("volume").innerHTML="Volume = "+leftWristY_divide_1000;
        song.setVolume(leftWristY_divide_1000)
    //}
}

function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}