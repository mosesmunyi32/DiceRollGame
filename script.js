"use strict";

//select the elements that hold main scores for the players
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1"); //faster when doing large selection
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice"); //select the dice
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//>> Event listeners for rolling the Dice
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

let scores, currentScore, activePlayer, playing;

//starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0; // use let since we will be updating it
  activePlayer = 0; // player one is zero
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden"); //hiding the dice that is already displayed
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

// running the init function
init();

//switching player function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0; // set the previous player current score to zero
  activePlayer = activePlayer === 0 ? 1 : 0; // switch to other player
  currentScore = 0; // set the curret score of the switched player to zero
  player0El.classList.toggle("player--active"); // Toggle Actively removes the class if it there, and if it is not there it adds it...
  player1El.classList.toggle("player--active");
};

//Rolling Dice functionality

btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. Generating a random Number
    const dice = Math.floor(Math.random() * 6) + 1;
    //2. Display the Dice
    diceEl.classList.remove("hidden"); // first remove the hidden class
    diceEl.src = `dice-${dice}.png`; //using the tempalte literate match the generate dice with the image
    //3. Check for the rolled 1; otherwise add the dice roll to the current score
    if (dice !== 1) {
      //add the dice to the current score; you should have defined the global variable for the score outside this function
      currentScore += dice; //the same as (currentScore = currentScore + 1)

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //Switching to the next player
      //first know the current player for the current player, you need a global variable for that
      switchPlayer(); //call the function
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    //1: add the current Score to the score of the active player's score
    scores[activePlayer] += currentScore; // scores[1] = scores [1] + currentScore
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2: Check the score if it is >= 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //Switch to the next player
      switchPlayer();
    }
  }
});

//Reseting the game using the Button Click of New Game

btnNew.addEventListener("click", init);
