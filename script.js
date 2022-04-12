'use strict';
const diceEl = document.querySelector('.dice');
const scoreOneEl = document.querySelector('#score--1');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
let dice, active, currentScore, score, playing, maxScore;

const switchPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${active}`).textContent = currentScore;
  document
    .querySelector(`.player--${active}`)
    .classList.remove('player--active');
  active = active === 0 ? 1 : 0;
  document.querySelector(`.player--${active}`).classList.add('player--active');
};
const defaultSetup = function () {
  active = 0;
  currentScore = 0;
  score = [0, 0];
  playing = true;
  document.querySelector(`.player--0`).classList.add('player--active');
  document
    .querySelector('.player--1')
    .classList.remove('player--active', 'player--winner');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.getElementById(`score--0`).textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('name--0').textContent = 'Player 1';
  document.getElementById('name--1').textContent = 'Player 2';
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  diceEl.classList.add('hidden');
};

document
  .querySelector('input[type=submit]')
  .addEventListener('click', function (e) {
    maxScore = Number(document.querySelector('.input').value);
    console.log(`new max ${maxScore}`);
    // e.preventDefault();

    if (document.querySelector('.input').value != 0) {
      console.log('Put number above 0');
      document.querySelector('.start').classList.add('hidden');
      e.preventDefault();
    }
  });
defaultSetup();
btnRoll.addEventListener('click', function () {
  if (playing) {
    dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //Display image of dice
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice === 1) {
      switchPlayer();
    } else {
      currentScore += dice;
      document.getElementById(`current--${active}`).textContent = currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  score[active] += currentScore;
  document.getElementById(`score--${active}`).textContent = score[active];
  if (score[active] >= maxScore) {
    playing = false;
    document.getElementById(`name--${active}`).textContent = `Player ${
      active === 0 ? 1 : 2
    } won!`;

    console.log(`1 check ${active}`);
    document
      .querySelector(`.player--${active}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${active}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
    console.log(`Player ${active === 0 ? 1 : 2} won!`);

    currentScore = 0;
  } else switchPlayer();
});
btnNew.addEventListener('click', function () {
  defaultSetup();
});
