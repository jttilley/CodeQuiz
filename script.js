var scores = document.querySelector(".scores")
var timer = document.querySelector(".time");

var startScreen = document.querySelector("#startScreen")
var startB = document.querySelector("#start");

var questionsEl = document.querySelector(".questions");
var question = questionsEl.querySelector("h2");
var answerList = questionsEl.querySelector(".answerList");
var ul = questionsEl.querySelector("ul");
var footer = document.querySelector("footer");
var fP = footer.querySelector("p")

var endScreenEl = document.querySelector(".endScreen");
var eP = endScreenEl.querySelector("p");
var inits = endScreenEl.querySelector(".initials");
var initsForm = endScreenEl.querySelector(".initialsForm");

var highscoresEl = document.querySelector(".highScores");
var hsList = highscoresEl.querySelector(".hsList"); //it's a ul
var clearB = highscoresEl.querySelector("#clear");
var backB = highscoresEl.querySelector("#goBack")


// turn off unneeded sections for start




var allScores = JSON.parse(localStorage.getItem("highscores"));
// console.log("allScores", allScores)
if (!allScores) {
    allScores = [];
}

// console.log("allScores", allScores)

// array of objects for quesitons and answers and correct answer id
var quiz = [
    {
        "question":"How do you campare to see if something is exactly equal to something else?",
        "answers":["=","==","===","====","equals"],
        "correct":2
    },
    {
        "question":"How do you find an element on a page?",
        "answers":["querySelector","getAttribute","getElement","findElement"],
        "correct":0
    },
    {
        "question":"How can you increment a count by 1?",
        "answers":["count++","count += 1","count = count + 1","All of the above","It's not possible","None of the above","I'd like to call a life line"],
        "correct":3
    },
    {
        "question":"How can you search a string for some text?",
        "answers":["string.find('search')","string.matches('search')","string.instr('search')","string.getstr('search')"],
        "correct":1
    },
    {
        "question":"What is needed to create a variable?",
        "answers":["var","log","const","All of the above","None of the above"],
        "correct":3
    },
    {
        "question":"What element type can you use the 'submit' event on?",
        "answers":["div","section","form","All of the above"],
        "correct":2
    },
]


// var quiz = [q1,q2,q3];
var curQuestion = 0;
var countDown = 60;
var timerInterval;

console.log(quiz);

function setScreen(screenElement) {
    //turn off all
    startScreen.style.display = "none"; // hide questions section
    questionsEl.style.display = "none"; // hide questions section
    endScreenEl.style.display = "none"; // show end section
    highscoresEl.style.display = "none";
    // turn on passed in section
    screenElement.style.display = "block"    
}

function stopQuiz(){
    // stop timer
    clearInterval(timerInterval);
    // clear previous question
    clearQuestion();
}

// when High Scores List is clicked
scores.addEventListener("click", function() {
    //stop the quiz in case it was pressed in the middle of the quiz
    stopQuiz();

    //show highscore
    showHighscores();
})

// event listener to start quiz
startB.addEventListener("click", function() {
    timeQuiz();
})

function updateTimer() {
    timer.textContent = "Time Left: " + countDown;
}

// to set a timer when starting quiz and ending when time is up or quiz is finished
function timeQuiz() {
    // reset countdown and questions
    countDown = 60;
    curQuestion = 0;
    
    // Create the countdown timer.
    // start timer
    timerInterval = setInterval(function() {
        countDown--;
        updateTimer();
        
        if(countDown <= 0) {
            stopQuiz();
            timer.textContent = "Time Left: 0";
            countDown = 0;
            endScreen();
        }
        
    }, 1000);
    
    runQuiz();
}

//show quiz and setup initial question
function runQuiz() {
    // startScreen.classList.add("hide");
    setScreen(questionsEl);
    setQuestion(curQuestion);
}


// set up a question and it's answers
function setQuestion(index) {
    var q = quiz[index].question;
    var a = quiz[index].answers;
    
    // console.log("setQuestion -> q", q)
    // console.log("setQuestion -> a", a)
    
    question.textContent = q;
    
    for (i = 0; i < quiz[index].answers.length; i++) {
        // make answer buttons if they don't exist
        
        var li = document.createElement("li");
        li.setAttribute("id", i);
        answerList.appendChild(li);
        var ansButton = document.createElement("button");
        ansButton.className = "answers"
        li.appendChild(ansButton);
        
        // set answers
        ansButton.textContent = a[i];
    }
    
}

function clearQuestion() {
    // Clear finished question
    for (i = ul.childNodes.length - 1; i >= 0 ; i--) {
        ul.removeChild(ul.childNodes[i]);
    }
    
}

// show if correct or wrong for 5 seconds
function showCorrect() {
    var cnt = 5;
    footer.style.display = "block";
    
    var correctInterval = setInterval(function () {
        
        if (cnt > 0) {
            clearInterval(correctInterval);
            footer.style.display = "none";
        }    
        cnt--;
    }, 1000);    
    
}    

//event listener for the answer selections
questionsEl.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    console.log("event.target", event.target)
    
    if (event.target.matches("button")) {

        var correct = quiz[curQuestion].correct;
        // console.log("correct", correct);
        var chk = parseInt(event.target.parentElement.id);
        // console.log("chk", chk);
        
        // to deduct time if wrong answer
        if (chk === correct) {
            fP.style.backgroundColor = "green";
            fP.textContent = "Correct!";
        }else {
            fP.style.backgroundColor = "red";
            fP.textContent = "Wrong!";
            countDown -= 10;
            if (countDown < 0) {
                countDown = 0;
            }
            updateTimer(); 
        }
        
        showCorrect();
        curQuestion++;
        // console.log("curQuestion", curQuestion)
        
        clearQuestion();
        if (curQuestion < quiz.length) {
            setQuestion(curQuestion);
        } else {
            
            stopQuiz();
            endScreen();
        }
    }
})


// funciton to save initials and score
function endScreen() {
    setScreen(endScreenEl);
    if (countDown < 0) {
        countDown = 0;
        updateTimer();
    }
}

// listen for submit click or enter
initsForm.addEventListener("submit", function(event) {
    event.preventDefault();
    event.stopPropagation();


    var curScore = {score: countDown, initials: inits.value.trim().toUpperCase()};
    // console.log("submit.addEventListener -> curScore", curScore);

    console.log("endScreen -> allScores before", allScores)
    allScores.push(curScore);
    console.log("endScreen -> allScores after push", allScores)
    
    //sort scores from highest to lowest
    allScores.sort(function(a,b) {return b.score - a.score});

    localStorage.setItem("highscores",JSON.stringify(allScores));

    // console.log("submit.addEventListener -> inits.value", inits.value);
    
    //clear input box
    inits.value = ""; 
    
    //go to highscores section
    showHighscores();
})

// function to display high scores
function showHighscores() {
    setScreen(highscoresEl);

    // create list of initals and scores
    allScores.forEach(function(person) {
        var li = document.createElement("li");
        // var br = document.createElement("br");
        // var pEl = document.createElement("p");
        li.textContent = person.initials.toUpperCase() + " - " + person.score;
        // li.appendChild(pEl);
        hsList.appendChild(li);
        // hsList.appendChild(br);
    });
}

// function to clear high scores.
clearB.addEventListener("click", function() {
    localStorage.removeItem("highscores");
    allScores = [];
    // console.log("allScores", allScores)
    clearHSList();
})

function clearHSList() {
    var fullList = hsList.querySelectorAll('li');
    console.log("clearHSList -> fullList", fullList)
    for (i=0; i < fullList.length; i++) {
        hsList.removeChild(hsList.querySelector('li'));
    }
}

// function to go back
backB.addEventListener("click", function() {
    // turn off unneeded sections for start
    setScreen(startScreen);
    clearHSList();
})