$(document).ready(function(){

$("#name").focus(function() {
    $(".name-label").css("display","block");
    $("#name").attr("placeholder", "");
    
    // $(".name-label").css("bottom","5rem");
});
$("#name").focusout(function() {        
    $(".name-label").css("display","none");
    $("#name").attr("placeholder", "Enter name");
});

});


// *****************************************************************************************


const username = document.getElementById('name');
const saveScoreBtn = document.getElementById('saveScoreBtn');
//we want to save off the player score, so we can access it in the end screen so 
//we want to get the most score (game.html)
const mostRecentScore = localStorage.getItem('mostRecentScore');
// we want to update the score text in our html final-score 
const finalScore = document.getElementById('finalScore');
// finalScore.innerText = mostRecentScore;
finalScore.innerText = "0";

// we gonna kind of split this topic. We're able to get the high score from the game 
// we're able to display it and we're able to 
// handle when a user click on the save button
// Saving the highScore en localStorage
// localStorage are stored as a string 
// we can still work with arrays
// we just need to convert them into a JSON string before we do
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

//every time we key up let's do user name input, 
//gonna disabled it if there's no user name input o value
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHightScore = (e) =>{
    e.preventSfault();

    // create a score object that has a score its gonna reference mostRecenteScore
    const score = {
        // score: Math.floor(Math.random() * 100),
        score: mostRecentScore,
        name: username.value,
    }
    highScores.push(score);
    
    // we gonna save the top 5 scores 
    // we're goint to add our score to the list then we're gonna sort our list 
    // then we're going to cut off anything greater than 5 
    // if we have 5 items and we add on another onemptied, we will sort it an then cut off the last one 
    // this is a function built in javascript for arrays where you can define your own sortation algorithm
    // returning if b.score is higher than the a.score then put B before A
    highScores.sort((a, b) => b.score - a.score);
    // Index 5 start cutting off everything after that 
    highScores.splice(5);

    // update our localStorage and convert a string
    localStorage.setItem("highScores");
    window.location.assign('/'); //back home
};











