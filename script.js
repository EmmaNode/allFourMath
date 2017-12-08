// //generate an  X and Y using math.random
// //get sum value of x + y and assign it to var z
// //var operator ["+" "-" "*"]

// // operate.length

// --//store x value in a random choice as correct answer
// //generate false options with math.random
// //check if false options are equal to X and if one is then generate new question
// //assign false to options open div in option (assuming the correct answer is present in HTML)
// //create question format and insert it in the question div
// --//add event listener for the correct option
// //add event listener for the false options
// 	//display next button when choices are clicked 
// //when next button is clicked remove event listeners and generate new question
// --//change score depending on answer
// 	//display a reset button
//when you reset the page remove the correct answer id and set the choice class back to the correct answer
let correctAnswer;
let y;
let solution;
let wrongAnswers = [];
var generateValue = function(min,max){
	let n = Math.floor((Math.random() * max) + min);
	return n;
}
//generate the equation in our question
function generateEquation(){
	let minNumber = 5;
	let maxNumber = 50;
	correctAnswer = generateValue(minNumber,maxNumber);
	y = generateValue(minNumber,maxNumber);
	solution = correctAnswer + y;
	generateWrongAnswers(minNumber,maxNumber);
}
//generate array for wrong choices
function generateWrongAnswers(min,max){
	for(let i =0;i<3;i++){
		//TODO CHECK IF RANDOM VALUE IS EQUAL TO SOLUTION
		wrongAnswers.push(generateValue(min,max));
	}
	addAnswersToPage();
}
function addAnswersToPage(){
	let x = document.getElementsByClassName("choice");
	let totalChoices = x.length - 1;
	//setting correct answer
	let solutionDivIndex = generateValue(0,totalChoices);
	let solutionDiv = x[solutionDivIndex];
	solutionDiv.setAttribute("id","correct-answer");
	solutionDiv.getElementsByTagName("a")[0].textContent = "X = " + correctAnswer;
	solutionDiv.removeAttribute("class");
	//removing correct answer from choice array;
	for(let i =0;i<x.length;i++){
		x[i].getElementsByTagName("a")[0].textContent = "X = " + wrongAnswers[i];	
		console.log(i);
	}
	generateQuestion();
}
function generateQuestion(){
	let questionBox = document.getElementsByClassName("question-box")[0];
	questionBox = questionBox.getElementsByTagName("a")[0];
	questionBox.textContent = "X  + " + y +"  =  " + solution;
}
window.onload =	function(){
	generateEquation();
}