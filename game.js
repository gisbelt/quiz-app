// we're gonna query based on the class choice-text
// that'll give us a list of those choices, and then we'll update from there 
// "choice_text" is actually an HTML HTMLAllCollection, 
// we want to convert this to an array so that we can do some array functions on it
// and access to data-number
const question = document.getElementById('question');
const choice_text = Array.from(document.getElementsByClassName('choice-text'));
const loader = document.getElementById('loader');
const game = document.getElementById('game');

// object 
let currentQuestion = {};
// this is so we can create a delay after someone answers 
// we create like a second delay before we let them answer
let acceptingAnswers = false; //we can answer before have everything loaded
let score = 0;
let questionCounter = 0; //this is basically what number what question are you on
// a copy of our full question set. 
// Take questions out of the available questions array as we use them
// so that we can always find a unique question to give the user 
let availiableQuestions = [];

let questions = [
    {
      question: "Inside which HTML element do we put the JavaScript??",
      choice1: "<script>",
      choice2: "<javascript>",
      choice3: "<js>",
      choice4: "<scripting>",
      answer: 1
    },
    {
      question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
      choice1: "<script href='xxx.js'>",
      choice2: "<script name='xxx.js'>",
      choice3: "<script src='xxx.js'>",
      choice4: "<script file='xxx.js'>",
      answer: 3
    },
    {
      question: " How do you write 'Hello World' in an alert box?",
      choice1: "msgBox('Hello World');",
      choice2: "alertBox('Hello World');",
      choice3: "msg('Hello World');",
      choice4: "alert('Hello World');",
      answer: 4
    }
];

// ******************************************************************************************* 
// // we're going to use the fetch function and fetch questions.JSON 
// let questions = [];
// fetch('questions.json').then(res => {
//     return res.json(); //this return a promise and get an HTTP response, so we want is a JSON version of the data
// }).then(loadedQuestions => {
//     console.log(loadedQuestions); //this is the loaded questions and this should be the actual JSON that we want
//     questions = loadedQuestions;
//     startGame(); // start game until i've got the questions back
// }).catch( err => {
//     // If i was in the wrong path 
//     console.error(err);
// });  
// ******************************************************************************************* 

// these constans are gonna be a few things neccesary for the game ifself 
const CORRECT_BONUS = 10; //when you get a answer correct how much is it worth we say 10
const MAX_QUESTIONS = 3; //how many questions does a user get before they finish

startGame = () =>{
    questionCounter = 0; //reset
    score = 0; //reset
    availiableQuestions = [ ...questions] //spread operator, take this array and spread out each of its items and put them into a new array, like a full copy
    console.log(availiableQuestions);

    getNewQuestion(); //function
};

// if you dont need parameters you need to have parens 
// if you have parameters just type that param 
getNewQuestion = () =>{
    // if there's no question left in the array 
    // or if we've given the user all the questions that we want  (we let them answer 3 question)
    // if questionCounter is > that 3 then return to end page
    if(availiableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS){
        //go to the end page
        return window.location.assign('final-score.html');
    }

    // ***********************************
    questionCounter++; // when we start the game this will increment it to 1
    // Now we need a ramdom question 
    // get a random number between 0 & 3, Math.random() give you a decimal between 0&1
    // if you want to get an integer out you can multiply that times 3
    // if we start with 3 questions and we use 1 then we're only have one or two left in our available questions
    // so we want to base this on the length 
    const questionIndex = Math.floor(Math.random() * availiableQuestions.length); 
    // get a reference to the currentQuestion by getting it out of the availiableQuestions array 
    currentQuestion = availiableQuestions[questionIndex];
    // set the question the HTML innertext to be the current question 
    // so the question that we just loaded and its question property
    question.innerText = currentQuestion.question; //.question is in the json questions

    // ***********************************
    // Same kind of thing for each of our choices 
    // this is going to iterate through each of those choice_text 
    // and get a reference to each choice (choice1, choice2)
    choice_text.forEach(choice => {
        // we want to get that number from the data-number set property in HTML
        const number = choice.dataset['number']; //that's how you get access tho those custom attributes
        choice.innerText = currentQuestion['choice' + number]; //out of the currentQuestion we want to get choice and then we want to use that number to get the choice out of it

        // we need to take that availiableQuestions array and splice out the question that we just used (questionIndex)
        // then we want to splice out 1 
        // This is gonna take the availiableQuestions array and get rid of the question that we just used 
        // because again when we get our new question we don't want to be able to choose from that existing from questions that we've already used 
        availiableQuestions.splice(questionIndex, 1);

        // Go ahead and do this now accepting answeris gonna be true
        // so after we've loaded our question then we want to go ahead and say, yes allow user to answer 
        acceptingAnswers = true;
    })
}

// Get another foreach on our choice_text 
// Add an event listener, this is gonna be a click and that the event as an argument
choice_text.forEach(choice => {
    choice.addEventListener('click', e =>{  
        // get a reference to which choice they click 
        // take the data-number and check to see the real answer
        
        // First: if we not acceptingAnswers return, ignore the fact the click on it 
        if(!acceptingAnswers) return;

        // set acceptingAnswers to false because we're gonna end up having a little bit of delay
        // we dont want them to click immediately  
        acceptingAnswers = false;

        // get selected choice equals a target 
        const selectedChoice = e.target;
        // the way we get that is selected choice in the data number 
        const selectedAnswer = selectedChoice.dataset['number'];
        // call getNewQuestion because that's what we do after we've answered a question 
        getNewQuestion();
    });
})
startGame();
