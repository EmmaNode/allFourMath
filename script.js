let correctAnswer;
let y;
let solution;
let currentOperator;
let currentQuestion = 1;
let gameOver = false;
let wrongAnswers = [];
let score = {
    win: 0,
    loss: 0
}
const operators = ["+", "-", "*"];
//returns random values with given min and max
var generateValue = function(min, max) {
	let n = Math.floor((Math.random() * max) + min);
	return n;
}
    //generating solution with random operator
var generateSolution = function(val1, val2) {
    let n = eval(val1 + currentOperator + val2);
    return n;
}
var decideRange = function(o) {
	if(o === "*"){
		return [1,13];
	}else if(o === "-" || o === "+"){
		return [1,100];
	}
}
    //generate the equation in our question
function generateEquation() {
    gameOver = false;
    currentOperator = operators[generateValue(0, operators.length)];
    let minNumber = decideRange(currentOperator)[0];
    let maxNumber = decideRange(currentOperator)[1];
    correctAnswer = generateValue(minNumber, maxNumber);
    y = generateValue(minNumber, maxNumber);
    solution = generateSolution(correctAnswer, y);
    generateWrongAnswers(minNumber, maxNumber);
}
//generate array for wrong choices
function generateWrongAnswers(min, max) {
    for (let i = 0; i < 3; i++) {
        let randomNum = generateValue(min, max);
        if (randomNum === correctAnswer) {
            randomNum = generateValue(min, max);
            wrongAnswers.push(randomNum);
        }else if(i>0){
        	//checking if random value is equal to any existing value in wrong num array
        	for(let z =0;z<i;z++){
        		if(randomNum === wrongAnswers[z] || wrongAnswers[z] === correctAnswer){
        			randomNum = generateValue(min, max);
        		}
        	}
        	//adds new random num once we have checked the array for matching values
        	wrongAnswers.push(randomNum);
        }else{
            wrongAnswers.push(randomNum);
        }
    }
    addAnswersToPage();
}
//adding answers to the choices div
function addAnswersToPage() {
    let x = document.getElementsByClassName("choice");
    let solutionDiv = x[generateValue(0, x.length)];
    solutionDiv.setAttribute("id", "correct-answer");
    solutionDiv.getElementsByTagName("a")[0].textContent = "X = " + correctAnswer;
    solutionDiv.removeAttribute("class");
    for (let i = 0; i < x.length; i++) {
        x[i].getElementsByTagName("a")[0].textContent = "X = " + wrongAnswers[i];
    }
    generateQuestion();
}
//converting our math to a question
function generateQuestion() {
    let questionBox = document.getElementsByClassName("question-box")[0];
    questionBox = questionBox.getElementsByTagName("a")[0];
    questionBox.textContent = "X  " + currentOperator + "  " + y + "  =  " + solution;
}

function resetQuestionForm() {
    //setting correct answer back to original state
    let z = document.getElementById("correct-answer");
    z.setAttribute("class", "choice");
    z.removeAttribute("id");
    //resetting wrong answer array
    wrongAnswers = [];
    //resetting question styles
    let x = document.getElementsByClassName("choice");
    for (let i = 0; i < x.length; i++) {
        x[i].style.border = "";
    }
    //creating new equation
    generateEquation();
}

function addQuestionEvents() {
    document.getElementsByClassName("next-btn")[0].addEventListener("click", function() {
        resetQuestionForm();
        updateQuestionCount();
        this.style.display = "none";
    })
    let x = document.getElementsByClassName("choice-wrapper")[0].getElementsByTagName("div");
    for (let i = 0; i < x.length; i++) {
        x[i].addEventListener("click", function() {
            if (gameOver === false) {
                if (this.getAttribute("id") === "correct-answer") {
                    score.win++;
                    this.style.border = "1px solid green";
                    console.log("correct");
                    gameOver = true;
                } else {
                    score.loss++;
                    this.style.border = "1px solid red";
                    gameOver = true;
                    console.log("wrong");
                }
                showNextBtn();
                updateScore();
            }
        })
    }
}

function showNextBtn() {
    document.getElementsByClassName("next-btn")[0].style.display = "block";
}

function updateQuestionCount() {
    currentQuestion++;
    document.getElementById("question-count").textContent = currentQuestion;
}

function updateScore() {
    document.getElementsByClassName("score")[0].getElementsByTagName("a")[0].textContent = score.win + " Correct";
    let winPercent = Math.round((score.win / (score.win + score.loss)) * 100);
    document.getElementsByClassName("win-rate")[0].getElementsByTagName("a")[0].textContent = winPercent + "%";
}
//running start function when window loads
window.onload = function() {
    generateEquation();
    addQuestionEvents();
}