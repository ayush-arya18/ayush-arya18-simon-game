var buttonColors=["red","green","blue","yellow"];
var randomChosenColor;
var randomNumber;
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;
$(".btn").click( function (){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(started==false){

        $("h1").text("level "+level);
        nextSequence();
        started=true;
    }

});

function nextSequence(){
    userClickedPattern=[];
    level++;
    $("h1").text("level "+level);
    randomNumber=Math.random();
    randomNumber=(randomNumber*4);
    randomNumber=Math.floor(randomNumber);

    randomChosenColor=buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name){
    var soound=new Audio("sounds/"+name+".mp3");
    soound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("game-over press any key to restart");
        setTimeout( function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }

}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}