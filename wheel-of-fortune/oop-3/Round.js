let game;

class Puzzle {
  constructor(guessedLetters, currentPuzzle, currAnswer) {
    this.guessedLetters = [];
    this.currentPuzzle = null;
    this.currAnswer = null;
  }

  generateRandomNumber(puzzleBankLength) {
    return Math.floor(Math.random() * (puzzleBankLength));
  }

  getCategory() {
    if (game.currentRound === 1) {
      this.getPuzzleOne();
    } else if (game.currentRound === 2) {
      this.getPuzzleTwo();
    } else if (game.currentRound === 3) {
      this.getPuzzleThree();
    } else if (game.currentRound === 4) {
      this.getPuzzleFour();
    } else if (game.currentRound === 5) {
      this.getPuzzleTwo();
    }
  }

  getPuzzleOne() {
    let puzzleBankLength = data.puzzles.one_word_answers.puzzle_bank.length
    let randomNum = this.generateRandomNumber(puzzleBankLength);
    let randomPuzzle = data.puzzles.one_word_answers.puzzle_bank[randomNum];
    this.currentPuzzle = randomPuzzle;
  }

  getPuzzleTwo() {
    let puzzleBankLength = data.puzzles.two_word_answers.puzzle_bank.length
    let randomNum = this.generateRandomNumber(puzzleBankLength);
    let randomPuzzle = data.puzzles.two_word_answers.puzzle_bank[randomNum];
    this.currentPuzzle = randomPuzzle;
  }

  getPuzzleThree() {
    let puzzBankLength = data.puzzles.three_word_answers.puzzle_bank.length
    let randomNum = this.generateRandomNumber(puzzBankLength);
    let randomPuzz = data.puzzles.three_word_answers.puzzle_bank[randomNum];
    this.currentPuzzle = randomPuzz;
  }

  getPuzzleFour() {
    let puzzBankLength = data.puzzles.four_word_answers.puzzle_bank.length
    let randomNum = this.generateRandomNumber(puzzBankLength);
    let randomPuzz = data.puzzles.four_word_answers.puzzle_bank[randomNum];

    this.currentPuzzle = randomPuzz;
  }

  splitAnswer(answer) {
    let uppedAnswer = answer.toUpperCase();
    console.log(uppedAnswer)
    this.currAnswer = uppedAnswer.split('');
    return this.currAnswer;
  }

  checkGuessedLetter(letter) {
    let guess = letter.toUpperCase();

    this.guessedLetters = this.currAnswer.filter((currLetter) => {  
      return currLetter.includes(guess);
    });

    return this.guessedLetters;
  }

  checkGuessedLettersArray() {
    let currentPlayer = game.players[round.currPlayer];
    if (this.guessedLetters.length > 0) {
      currentPlayer.updatePlayerScore(wheel.currWheelValue, this.guessedLetters);
      domUpdates.displayScore(currentPlayer.score);
      domUpdates.changePlayerPrompt();
      domUpdates.displayGuessedLetter(event);
    } else {
      round.switchPlayer();
      changePlayerAnimation(round.currPlayer)
      domUpdates.changePlayerPrompt();
    }
  }

  checkGuessedVowelsArray() {
    if (this.guessedLetters.length > 0) {
      domUpdates.displayGuessedLetter(event);
    } else {
      round.switchPlayer();
      changePlayerAnimation(round.currPlayer)
      domUpdates.changePlayerPrompt();
    }

  }

  checkGuessedVowel(letter) {
    let guess = letter.toUpperCase();
    this.guessedLetters = this.currAnswer.filter((currentIndex) => {
      return currentIndex.includes(guess);
    });
    return this.guessedLetters;
  }

  checkSolvePuzzle(guess) {
    let upperCaseGuess = guess.toUpperCase();
    let upperCaseAnswer = this.currentPuzzle.correct_answer.toUpperCase();
    
    if (upperCaseGuess === upperCaseAnswer) {
      domUpdates.displayAnswer(event);
      game.winRound();
      domUpdates.showWonRound();
    } else {
      domUpdates.solvePuzzleFail();
      round.switchPlayer();
    }
  }
}
