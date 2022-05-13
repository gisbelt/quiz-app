const question = document.getElementById('question');
// we want to convert this to an array so that we can do some array functions on it
const choice_text = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounterText');
const progressText = document.getElementById('progressText');
const progressBarFull = document.getElementById('progressBarFull');
const scoreText = document.getElementById('scoreText');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

// object 
let currentQuestion = {};
// we create like a second delay before we let them answer
let acceptingAnswers = false; 
let score = 0;
let questionCounter = 0; 
let availiableQuestions = [];

// ******************************************************************************************* 
// this API let you make a remote API call to get a list of quiestions 
let questions = [];
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple').then(res => {
    return res.json(); 
}).then(loadedQuestions => {
    // Using map: iterating through an array and then transform each item in that array into something else
    questions = loadedQuestions.results.map( loadedQuestion => {
        // object 
        const formattedQuestion = {
            question: loadedQuestion.question
        };
        // Get the answer choices 
        const answerChoices = [ ... loadedQuestion.incorrect_answers]; // use the spread operator from loadedQuestion incorect
        formattedQuestion.answer = Math.floor(Math.random()*4) + 1; //set the format of question answer, get a random number between 0 and 3
        // Decide which choice is my answer and put that answer into my answer choices arrayin the right spot
        answerChoices.splite(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer); 

        // Iterate through the "answerChoices" above, do a foreach and get a reference to each choice and the index
        answerChoices.forEach((choice, index) => {
            formattedQuestion["choice" + (index + 1)] = choice; 
        })
        return formattedQuestion;
    }) 
    startGame(); 
}).catch( err => {
    console.error(err);
}); 
// *******************************************************************************************

const CORRECT_BONUS = 10; //when you get a answer correct how much is it worth we say 10
const MAX_QUESTIONS = 3; //how many questions does a user get before they finish

startGame = () =>{
    questionCounter = 0; //reset
    score = 0; //reset
    availiableQuestions = [ ...questions] //spread operator, take this array and spread out each of its items and put them into a new array, like a full copy
    getNewQuestion(); //function
    // before start game show the game y hidden the loader 
    game.classList.remove('hidden');
    loader.classList.add('hidden');
};

getNewQuestion = () =>{

    if(availiableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign('final-score.html');
    }

    // when we start the game this will increment it to 1
    questionCounter++; 
    // after update our questionCounter, let's go and update the questionCounterText to display that
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;
    // Update progress Bar 
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    // get a random number between 0 & 3, Math.random(): give you a decimal between 0&1
    const questionLeft = Math.floor(Math.random() * availiableQuestions.length); 
    // get a reference to the currentQuestion by getting it out of the availiableQuestions array 
    currentQuestion = availiableQuestions[questionLeft];
    question.innerText = currentQuestion.question; //.question is in the json questions

    // this is going to iterate through each of those choice_text 
    choice_text.forEach(choice => {
        // we want to get that number from the data-number set property in HTML
        const number = choice.dataset['number']; 
        choice.innerText = currentQuestion['choice' + number]; 
        // This is gonna take the availiableQuestions array and get rid of the question that we just used 
        availiableQuestions.splice(questionLeft, 1);
        // so after we've loaded our question then we want to go ahead and say, yes allow user to answer 
        acceptingAnswers = true;
    })
}

// Add an event listener, this is gonna be a click and that the event as an argument
choice_text.forEach(choice => {
    choice.addEventListener('click', e =>{  
        // First: if we not acceptingAnswers return, ignore the fact the click on it 
        if(!acceptingAnswers) return;
        // set acceptingAnswers to false because we're gonna end up having a little bit of delay
        acceptingAnswers = false;

        // get selected choice equals a target 
        const selectedChoice = e.target;
        // the way we get that is selected choice in the data number 
        const selectedAnswer = selectedChoice.dataset['number'];
        // Ternary operator where we could say answer equals currentQuestion.answer 
        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        // increment score 
        if(classToApply === 'correct'){
            incrementScore(CORRECT_BONUS);
        }

        //the selectedChoice is the piece of text that we're clicking, wen want the whole element
        selectedChoice.parentElement.classList.add(classToApply);
        // use a setTimeout to give a little of delay before remove class 
        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            // call getNewQuestion because that's what we do after we've answered a question 
            getNewQuestion();
        }, 800);
    });
})

// Functions which takes in a number and it increment the score 
incrementScore = num =>{
    // increment as you might expect 
    score+=num;
    // update the scoreText
    scoreText.innerText = score;
}