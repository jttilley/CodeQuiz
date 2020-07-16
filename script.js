var startScreen = document.querySelector("#startScreen")
var startB = document.querySelector("#start");

var timer = document.querySelector(".time");

var questionsEl = document.querySelector(".questions");
var question = questionsEl.querySelector("h2");
var answerList = questionsEl.querySelector(".answerList");
var ul = questionsEl.querySelector("ul");
var footer = document.querySelector("footer");
var fP = footer.querySelector("p")

var endScreenEl = document.querySelector(".endScreen");
var eP = endScreenEl.querySelector("p");

var highscoresEl = document.querySelector(".highScores");


// turn off unneeded sections for start
// questionsEl.style.display = "none";
endScreenEl.style.display = "none";
highscoresEl.style.display = "none";

var quiz = [
    {
        "question":"How do you campare to see if something is exactly equal to something else?",
        "answers":["=","==","===","===="],
        "correct":2
    },
    {
        "question":"How do you find an element on a page?",
        "answers":["querySelector","getAttribute","getElement","findElement"],
        "correct":0
    },
    {
        "question":"How can you increment a count by 1?",
        "answers":["count++","count += 1","count = count + 1","All of the above"],
        "correct":3
    },
    {
        "question":"How can you search a string for some text?",
        "answers":["string.find('search')","string.matches('search')","string.instr('search')","string.getstr('search')"],
        "correct":1
    },
    {
        "question":"What element type can you use the 'submit' event on?",
        "answers":["div","section","form","All of the above"],
        "correct":2
    },
]


// var quiz = [q1,q2,q3];
var curQuestion = 0;
var countDown = 75;
var timerInterval;

console.log(quiz);

// start quiz
startB.addEventListener("click", function() {
    timeQuiz();
})


// need array of objects for quesitons and answers and correct answer id

// need funciton to deduct time if wrong answer

// need funciton to save initials and score

// need to set a timer when starting quiz and ending when time is up or quiz is finished
function timeQuiz() {
    // Create the countdown timer.
    countDown = 75;

    timerInterval = setInterval(function() {
        timer.textContent = "Time Left: " + countDown;
    
        if(countDown <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Time Left: 0";
            countDown = 0;
            endScreen();
        }
        
        countDown--;
        // console.log("timerInterval -> countDown", countDown)
    
    }, 1000);

    runQuiz();
}

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


function runQuiz() {
    // startScreen.classList.add("hide");
    startScreen.style.display = "none";
    questionsEl.style.display = "block";
    setQuestion(curQuestion);
}


function setQuestion(index) {
    var q = quiz[index].question;
    var a = quiz[index].answers;
    
    console.log("setQuestion -> q", q)
    console.log("setQuestion -> a", a)
    
    question.textContent = q;

    for (i = 0; i < quiz[index].answers.length; i++) {
        // make answer buttons if they don't exist
        
        var li = document.createElement("li");
        li.setAttribute("id", i);
        answerList.appendChild(li);
        var ansButton = document.createElement("button");
        li.appendChild(ansButton);
    
        // set answers
        ansButton.textContent = a[i];
    }
    
}

function clearQuestion() {
    console.log("clearQuestion -> ul.childNodes", ul.childNodes)
    console.log("clearQuestion -> ul.children", ul.children)
    for (i = ul.childNodes.length - 1; i >= 0 ; i--) {
        ul.removeChild(ul.childNodes[i]);
    }

}

//event listener for the answer selections
questionsEl.addEventListener("click", function(event) {
    event.preventDefault();
    
    
    console.log("event.target", event.target)

    if (event.target.matches("button")) {
        var correct = quiz[curQuestion].correct;
        // console.log("correct", correct);
        var chk = parseInt(event.target.parentElement.id);
        // console.log("chk", chk);
        
        if (chk === correct) {
            fP.textContent = "Correct!";
        }else {
            fP.textContent = "Wrong!";
            countDown -= 10;
        }
        showCorrect();
        curQuestion++;
        console.log("curQuestion", curQuestion)
        
        if (curQuestion < quiz.length) {
            clearQuestion();
            setQuestion(curQuestion);
        } else {
            clearInterval(timerInterval);
            endScreen();
        }
    }
})

function endScreen() {
    questionsEl.style.display = "none";
    endScreenEl.style.display = "block";
}
// need function to display high scores

// need function to clear high scores.
