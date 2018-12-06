/*
Developer: Justas Lauzinskas
Title: Word Guess Game
Description: Homework 3: Vanilla Javascript
Date: 2018-12-01
*/
var guessLimit;
var guessedLetters;
var correctLetterCounter;
var randomNumber;

function Game(playerName) {
	var self = this;
	this.player = playerName;
	this.scoreWins = 0;
	this.scoreLoses = 0;
	this.scoreGuess = 0;
	this.questionsList = Array();
	this.randomNumberList = Array();
	this.Questions = function(question, answer) {
		this.question = question;
		this.answer = window.atob(answer);
	}
	// Method, changes image src, after guesses-- 
	this.changeImage = function(guessLimit) {
		var selectedHtml = document.getElementById("hangman");
		imgSrc = "hangman" + guessLimit + ".png"
		selectedHtml.src = "assets/images/" + imgSrc;
	}
	// Method, tracks pressed letters and prepares them for game
	this.getLetter = function() {
		pressedKey = event.key;
		pressedKey = pressedKey.toLowerCase();
		self.checkLetter(pressedKey);
	}
	// Method, prepares users DOM for game
	this.prepareForGame = function(randomNumber) {
		var selectedQuestion = self.questionsList[randomNumber];
		var selectedHtml = document.getElementById("question");
		selectedHtml.innerHTML = selectedQuestion.question;
		for (var i = 0; i < selectedQuestion.answer.length; i++) {
			var para = document.createElement("p");
			generateId = ("ltr" + i);
			para.setAttribute("id", generateId);
			var node = document.createTextNode("_");
			para.appendChild(node);
			var element = document.getElementById("lettersList");
			element.appendChild(para);
			var element = document.getElementById("scoreWins");
			element.innerHTML = "Wins " + this.scoreWins;
			var element = document.getElementById("scoreLoses");
			element.innerHTML = "Losses " + this.scoreLoses;
			var selectedHtml = document.getElementById("hangman");
			imgSrc = "hangman9.png";
			selectedHtml.src = "assets/images/" + imgSrc;
		}
	}
	// Method, cleans all information before start or new word
	this.cleanGame = function() {
		guessedLetters = [];
		correctLetterCounter = 0;
		guessLimit = 9;
		var myNode = document.getElementById("lettersList");
		while (myNode.firstChild) {
			myNode.removeChild(myNode.firstChild);
		}
		var x = document.querySelectorAll(".choice > p");
		for ( var i = 0; i < x.length; i++) {
			x[i].style.background = "rgba(0,0,0,0.5)";
		}
		var element = document.getElementById("guessesLeft");
		element.innerHTML = "Guesses Left " + (guessLimit);
		var element = document.getElementById("scoreTotal");
		element.innerHTML = "Total Score " + this.scoreGuess;
		this.randomNumber();
	}
	// Method, if guessed letter matches letter of answer show letter on screen
	this.displayLetter = function(pressedKey) {
		var selectedQuestion = self.questionsList[randomNumber];
		for (var i = 0; i < selectedQuestion.answer.length; i++) {
			if (selectedQuestion.answer.charAt(i) === pressedKey) {
				correctLetterCounter++;
				generateId = ("ltr" + i);
				var element = document.getElementById(generateId);
				element.innerHTML = pressedKey;
			}
		}
	}
	// Method, changes style of keys showed on screen
	this.letterStyle = function(pressedKey, letterCorrect) {
		className = (".letter" + pressedKey.toUpperCase() + " p");
		pressedKey = pressedKey.toLowerCase();
		var selectedClass = document.querySelector(className);
		if (letterCorrect) {
			selectedClass.style.background = "#2ABA66";
			this.scoreGuess++;
		} else {
			selectedClass.style.background = "#D8334A";
			var element = document.getElementById("guessesLeft");
			element.innerHTML = "Guesses Left " + (guessLimit - 1);
			if (this.scoreGuess > 0) {
				this.scoreGuess--;
			} else {
				this.scoreGuess = 0;
			}
		}
		var element = document.getElementById("scoreTotal");
		element.innerHTML = "Total Score " + this.scoreGuess;
	}
	// Method, generates random number, to select question
	this.randomNumber = function() {
		if (this.randomNumberList.length != this.questionsList.length) {
			var randomGeneratedNumber = Math.floor(Math.random() * this.questionsList.length);
			if (this.randomNumberList.indexOf(randomGeneratedNumber) === -1) {
				this.randomNumberList.push(randomGeneratedNumber);
				this.prepareForGame(randomGeneratedNumber);
				randomNumber = randomGeneratedNumber;
			} else {
				this.randomNumber();
			}
		} else {
			var element = document.getElementById("question");
			element.innerHTML = "There is no more questions in this game.";
		}
	}
	// Main method, displays score, calls other methods, checks if letters match.
	this.checkLetter = function(pressedKey) {
		var selectedQuestion = self.questionsList[randomNumber];
		var toLetters = selectedQuestion.answer.split("");
		var alphabet = 'abcdefghijklmnopqrstuvwxyz'.split("");
		if ((guessLimit > 0) && (alphabet.indexOf(pressedKey) > -1) && (guessedLetters.indexOf(pressedKey) === -1)) {
			guessedLetters.push(pressedKey);
			if (toLetters.indexOf(pressedKey) > -1) {
				letterCorrect = true;
				this.letterStyle(pressedKey, letterCorrect);
				this.displayLetter(pressedKey);
				if (correctLetterCounter === selectedQuestion.answer.length) {
					self.scoreWins++;
					self.scoreGuess = (self.scoreGuess + 100);
					this.cleanGame();
				}
			} else {
				letterCorrect = false;
				this.letterStyle(pressedKey, letterCorrect);
				guessLimit--;
				self.changeImage(guessLimit);
				if (guessLimit === 0) {
					if (self.scoreGuess > 50) {
						self.scoreGuess = (self.scoreGuess - 50);
					} else {
						self.scoreGuess = 0;
					}
					self.scoreLoses++;
					this.cleanGame();
				}
			}
		}
	}
}
// Future update to get users name from DOM
var playersName = "Player";
var ourGame = new Game(playersName);

// Answers are encoded so don't try to cheat !
// START HTML Questions
ourGame.questionsList.push(new ourGame.Questions("_____ Text Markup Language", "aHlwZXI="));
ourGame.questionsList.push(new ourGame.Questions("What is full name of h1 tag?", "aGVhZGluZw=="));
ourGame.questionsList.push(new ourGame.Questions("Main HTML Web file is called _____.html?", "aW5kZXg="));
ourGame.questionsList.push(new ourGame.Questions("The < p > element defines a", "cGFyYWdyYXBo"));
ourGame.questionsList.push(new ourGame.Questions("Which element contains meta information about the document", "aGVhZA=="));
ourGame.questionsList.push(new ourGame.Questions("In HTML <!-- --> - used to insert", "Y29tbWVudHM="));
ourGame.questionsList.push(new ourGame.Questions("All HTML elements can have", "YXR0cmlidXRlcw=="));
ourGame.questionsList.push(new ourGame.Questions("What kind of list < O L > is?", "b3JkZXJlZA=="));
ourGame.questionsList.push(new ourGame.Questions("HTML _____ Web Design", "cmVzcG9uc2l2ZQ=="));
ourGame.questionsList.push(new ourGame.Questions("HTML docs must start with declaration: <!_____ html>", "ZG9jdHlwZQ=="));
// END HTML Questions
// START CSS Questions
ourGame.questionsList.push(new ourGame.Questions("What property do you use to create spacing between HTML elements?", "bWFyZ2lu"));
ourGame.questionsList.push(new ourGame.Questions("Most popular CSS Framework/Library", "Ym9vdHN0cmFw"));
ourGame.questionsList.push(new ourGame.Questions("_ _ _ _ _ Style Sheets", "Y2FzY2FkaW5n"));
ourGame.questionsList.push(new ourGame.Questions("Media _____ help us to build responsive website?", "cXVlcmllcw=="));
ourGame.questionsList.push(new ourGame.Questions("How do you set a style for a link that a user has already been to before?", "dmlzaXRlZA=="));
ourGame.questionsList.push(new ourGame.Questions("Most common CSS units of measure", "cGl4ZWxz"));
ourGame.questionsList.push(new ourGame.Questions("CSS _____ Layout Module", "ZmxleGJveA=="));
ourGame.questionsList.push(new ourGame.Questions("What property specifies the transparency of an element?", "b3BhY2l0eQ=="));
ourGame.questionsList.push(new ourGame.Questions("A CSS _____-element is used to style specified parts of an element.", "cHNldWRv"));
ourGame.questionsList.push(new ourGame.Questions("Positioned relative to the nearest ancestor", "YWJzb2x1dGU="));
// END CSS Questions
//START Javascript Questions
ourGame.questionsList.push(new ourGame.Questions("Programming language of HTML and the Web.", "amF2YXNjcmlwdA=="));
ourGame.questionsList.push(new ourGame.Questions("Variable i stands for", "aW5jcmVtZW50"));
ourGame.questionsList.push(new ourGame.Questions("Which data type can only take the values true or false", "Ym9vbGVhbg=="));
ourGame.questionsList.push(new ourGame.Questions("What do you use to store multiple values in a single variable", "YXJyYXk="));
ourGame.questionsList.push(new ourGame.Questions("What are you going to use to store number?", "dmFyaWFibGU="));
ourGame.questionsList.push(new ourGame.Questions("You can use _____ for debugging code", "Y29uc29sZQ=="));
ourGame.questionsList.push(new ourGame.Questions("Operator * is used for", "bXVsdGlwbGljYXRpb24="));
ourGame.questionsList.push(new ourGame.Questions("Javascript data type", "b2JqZWN0"));
ourGame.questionsList.push(new ourGame.Questions("Unmodified JavaSript is called", "dmFuaWxsYQ=="));
ourGame.questionsList.push(new ourGame.Questions("Javascript library", "cmVhY3Q="));
//END Javascript Questions

ourGame.cleanGame(); // Prepare game and start new game.
document.addEventListener('keyup', ourGame.getLetter); // Track user pressed keys and send them to method.