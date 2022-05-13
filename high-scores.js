const highScoresList = document.getElementById('highScoresList');
// we want to get the high scores out of localStorage
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
// set inner HTML to this joined string 
highScoresList.innerHTML = highScores.map(score => {
    // return the string for each one of those items 
    return `<li class="high-score">${score.username} - ${score.score}</li>`;
})
.join(""); // you can join all of those elements in the array, join it an empty string