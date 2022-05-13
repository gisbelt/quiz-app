$(document).ready(function(){
    $("#name").focus(function() {
        $(".name-label").css("display","block");
        $("#name").attr("placeholder", "");
    });
    $("#name").focusout(function() {        
        $(".name-label").css("display","none");
        $("#name").attr("placeholder", "Enter name");
    });
});


// *****************************************************************************************


const username = document.getElementById('name');
const saveScoreBtn = document.getElementById('saveScoreBtn');
//we want to get the most score 
const mostRecentScore = localStorage.getItem('mostRecentScore');
// we want to update the score text in our html final-score 
const finalScore = document.getElementById('finalScore');
finalScore.innerText = mostRecentScore;
// localStorage are stored as a string, convert them into a JSON string
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

const MAX_HIGH_SCORES = 5;

//gonna disabled it if there's no user name input o value
username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});

saveHighScore = (e) =>{
    e.preventDefault();
    // create a score object that has a score its gonna reference mostRecenteScore
    const score = {
        score: mostRecentScore,
        username: username.value,
    }
    highScores.push(score);
    // we gonna save the top 5 scores 
    // returning if b.score is higher than the a.score then put B before A
    highScores.sort((a, b) => b.score - a.score);
    // Index 5 start cutting off everything after that 
    highScores.splice(5);

    // update our localStorage and convert a string
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign('index.html'); //back home
};











