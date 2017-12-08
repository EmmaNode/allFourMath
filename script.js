let correctAnswer;
let y;
let solution;
let currentOperator;
let wrongAnswers = [];
const operators = ["+","-","*"]
//returns random values with given min and max
var generateValue = function(min,max){
	let n = Math.floor((Math.random() * max) + min);
	return n;
}
//generating solution with random operator
var generateSolution = function(val1,val2){
	currentOperator = operators[generateValue(0,operators.length)];
	let n = eval(val1+currentOperator+val2);
	console.log(currentOperator);
	return n;
}
//generate the equation in our question
function generateEquation(){
	let minNumber = 5;
	let maxNumber = 50;
	correctAnswer = generateValue(minNumber,maxNumber);
	y = generateValue(minNumber,maxNumber);
	solution = generateSolution(correctAnswer, y);
	generateWrongAnswers(minNumber,maxNumber);
}
//generate array for wrong choices
function generateWrongAnswers(min,max){
	for(let i =0;i<3;i++){
		let randomNum = generateValue(min,max);
		if(randomNum === correctAnswer){
			randomNum = generateValue(min,max);
			wrongAnswers.push(randomNum);
		}else{
			wrongAnswers.push(randomNum);
		}
	}
	addAnswersToPage();
}
//adding answers to the choices div
function addAnswersToPage(){
	let x = document.getElementsByClassName("choice");
	let solutionDiv = x[generateValue(0,x.length)];
	solutionDiv.setAttribute("id","correct-answer");
	solutionDiv.getElementsByTagName("a")[0].textContent = "X = " + correctAnswer;
	solutionDiv.removeAttribute("class");
	for(let i =0;i<x.length;i++){
		x[i].getElementsByTagName("a")[0].textContent = "X = " + wrongAnswers[i];	
	}
	generateQuestion();
}
//converting our math to a question
function generateQuestion(){
	let questionBox = document.getElementsByClassName("question-box")[0];
	questionBox = questionBox.getElementsByTagName("a")[0];
	questionBox.textContent = "X  "+currentOperator +"  " + y +"  =  " + solution;
}
//running start function when window loads
window.onload =	function(){
	generateEquation();
}