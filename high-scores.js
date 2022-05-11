const highScoresList = document.getElementById('highScoresList');
// we want to get the high scores out of localStorage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];


// set inner HTML to this joined string 
// highScoresList.innerHTML = highScores
// we want to through and iterate through each one of those scores
// and we want to add an li to our unordered list 
// what map does is it takes an incoming array which is highscores and allows you can 
// convert each of those items to something new in a new array, so we're taking 
// in the score object and returning back a string version of a li that has stuff in it that we need 
highScores.map(score => {
    // return the string for each one of those items 
    return `<li class="high-score">${score.username} - ${score.score}</li>`;
})
.join(""); // you can join all of those elements in the array, join it an empty string