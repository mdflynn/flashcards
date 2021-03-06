const Turn = require('./Turn.js');

class Round {
  constructor(deck) {
    this.deck = deck.cardDeck;
    this.turns = 0;
    this.incorrectGuesses = [];
  }

  returnCurrentCard() {
    return this.deck[0];
  }

  takeTurn(guess) {
    const currentCard = this.returnCurrentCard();
    const turn = new Turn(guess, currentCard);
    const result = turn.giveFeedback();
    this.turns++;
    this.checkGuess(guess);
    this.updateCardDeck();
    return result;
  }

  updateCardDeck() {
    this.deck.shift();
  }

  checkGuess(guess) {
    if (guess !== this.deck[0].correctAnswer) {
      this.incorrectGuesses.push(this.deck[0].id);
    }
  }

  calculatePercentCorrect() {
    return Math.round((this.turns - this.incorrectGuesses.length) / this.turns * 100);
  }

  endRound() {
    const percentCorrect = this.calculatePercentCorrect();
    console.log(`**Round over!** You answered ${percentCorrect}% of the questions correctly!`);
  }
}

module.exports = Round;
