var Deck = function() {
  //Create an empty deck//
  this.cards = [];
  //Define the cards' attributes//
  var suits = ["hearts", "diams", "clubs", "spades"];
  var ranks = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"
  ];
  //Double loop and push to create the all pack of cards in the deck//
  for (var i = 0; i < suits.length; i++) {
    for (var j = 0; j < ranks.length; j++) {
      var card = {
        suit: suits[i],
        rank: ranks[j],
        value: j + 1
      };
      this.cards.push(card);
    }
  }
  // Shuffle of this.cards
  this._shuffleCard();
};
Deck.prototype._shuffleCard = function() {
  this.cards = _.shuffle(this.cards);
};

///Return a new card and delete it from the deck//
Deck.prototype.drawCard = function() {
  return this.cards.pop();
};

//Set up new game and visible cards on the deck//
var Game = function() {
  this.deck = new Deck();
  this.step = 0;
  this.visibleCards = [];
  for (var i = 0; i < 5; i++) {
    this.visibleCards.push(this.deck.drawCard());
  }
};

// Function to define outcomes//
Game.prototype.play = function(choice) {
  var newCard = this.deck.drawCard();
  console.log("BEFORE", "newCard.value:", newCard.value, "this.step:", this.step);
  console.log(this.visibleCards[0].value, this.visibleCards[1].value, this.visibleCards[2].value, this.visibleCards[3].value, this.visibleCards[4].value);

  switch (choice) {
    case "+":
      if(newCard.value > this.visibleCards[this.step].value){
        this.visibleCards[this.step] = newCard;
        this.step ++;
      } else {
        this.visibleCards[this.step] = newCard;
        this.step = 0;
      }
      break;

    case "-":
      if(newCard.value < this.visibleCards[this.step].value){
        this.visibleCards[this.step] = newCard;
        this.step ++;
      } else {
        this.visibleCards[this.step] = newCard;
        this.step = 0;
      }
      break;

    case "=":
      if(newCard.value === this.visibleCards[0].value){
        this.visibleCards[this.step] = newCard;
        this.step ++;
      } else {
        this.visibleCards[this.step] = newCard;
        this.step = 0;
      }
      break;
  }
  console.log("AFTER", "newCard.value:", newCard.value, "this.step:", this.step);
  console.log(this.visibleCards[0].value, this.visibleCards[1].value, this.visibleCards[2].value, this.visibleCards[3].value, this.visibleCards[4].value);

};


var game = new Game();
console.log(game.visibleCards);
