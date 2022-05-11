const loader = document.getElementById('loader');
const game = document.getElementById('game');

// ******************************************************************************************* 
//Using an API call "the open trivia database"
// this API let you make a remote API call to get a list of quiestions 
let questions = [];
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple').then(res => {
    return res.json(); 
}).then(loadedQuestions => {
    // transform each of this questions into the format basically that we work with in our app
    // convert this question that we get into a new form 
    // Using map: iterating through an array and then transform each item in that array into something else
    questions = loadedQuestions.results.map( loadedQuestion => {
        // object 
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        // every time we map through we're gonna get the original question, format that question
        // into the format we need and return 
        // Get the answer choices 
        const answerChoices = [ ... loadedQuestion.incorrect_answers]; // use the spread operator from loadedQuestion incorect
        formattedQuestion.answer = Math.floor(Math.random()*4) + 1; //set the format of question answer, get a random number between 0 and 3
        // Decide which choice is my answer and put that answer into my answer choices arrayin the right spot
        answerChoices.splite(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer); 
        //minus 1 because our answer choices are not zero based indexes, we need zero based
        // 0: we're not going to remove any elements
        // then we're gonna put in loaded question correct

        // Iterate through the "answerChoices" above, do a foreach and get a reference to each choice and the index
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice; 
        })
        return formattedQuestion;
    }) 
    // before start game show the game y hidden the loader 
    game.classList.remove('hidden');
    loader.classList.add('hidden');
    startGame(); 
}).catch( err => {
    console.error(err);
}); 
// *******************************************************************************************