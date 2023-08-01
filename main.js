const hint = document.getElementById("hint");
const noOfGuessesRef = document.getElementById("no-of-guesses");
const guessedNumsRef = document.getElementById("guessed-nums");
const restartButton = document.getElementById("restart");
const game = document.getElementById("game");
const guessInput = document.getElementById("guess");
const checkButton = document.getElementById("check-btn");
const container = document.getElementById("container");

let answer, noOfGuesses, guessedNums;

const play = () => {
	if (noOfGuesses < 10) {
		const userGuess = guessInput.value;
		if (userGuess < 1 || userGuess > 100 || isNaN(userGuess)) {
			alert("Please enter a valid number between 1 and 100.");
			guessInput.value = "";
			return;
		}
		guessedNums.push(userGuess);
		noOfGuesses += 1;
		if (userGuess != answer) {
			if (userGuess < answer) {
				hint.innerHTML = "Too low. Try Again!";
			} else {
				hint.innerHTML = "Too high. Try Again!";
			}
			noOfGuessesRef.innerHTML = `<span>No. Of Guesses:</span> ${noOfGuesses}`;
			guessedNumsRef.innerHTML = `<span>Guessed Numbers are: </span>${guessedNums.join(
				","
			)}`;
			hint.classList.remove("error");
			setTimeout(() => {
				hint.classList.add("error");
			}, 10);
			guessInput.value = "";
		} else {
			hint.innerHTML = `Congratulations!<br>The number was <span>${answer}</span>.<br>You guessed the number in <span>${noOfGuesses} </span>tries.`;
			hint.classList.add("success");
			game.style.display = "none";
			restartButton.style.display = "block";
		}
	} else {
		hint.innerHTML = `Too Bad<br>The number was <span>${answer}</span>.<br>You failed to guessed the number in <span>${noOfGuesses} </span>tries.`;
		hint.classList.add("failed");
		container.classList.add("failed");
		game.style.display = "none";
		restartButton.style.display = "block";
	}
};

const init = () => {
	console.log("Game Started");
	answer = Math.floor(Math.random() * 100) + 1;
	console.log(answer);
	noOfGuesses = 0;
	guessedNums = [];
	noOfGuessesRef.innerHTML = "No. Of Guesses: 0";
	guessedNumsRef.innerHTML = "Guessed Numbers are: None";
	guessInput.value = "";
	hint.classList.remove("success", "error", "failed");
};

guessInput.addEventListener("keydown", (event) => {
	if (event.keyCode === 13) {
		event.preventDefault();
		play();
	}
});

restartButton.addEventListener("click", () => {
	game.style.display = "grid";
	restartButton.style.display = "none";
	hint.innerHTML = "";
	hint.classList.remove("success");
	container.classList.remove("failed");
	init();
});

checkButton.addEventListener("click", play);
window.addEventListener("load", init);
