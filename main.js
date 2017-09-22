var game;

$(document).ready(function() {
  $(".card").toggle();
  $(".btn").toggle();
  $("#drink").hide();
  $("#endTurn").hide();
  $(".scores").hide();
  $("#final").hide();
  $("#winIMG").hide();
  $("#playbtn").click(function() {
    game = new Game();

    console.log(game);
    $(".card").show();
    $(".btn").show();
    $("#final").hide();
    $("#winIMG").hide();
    $(".scores").show();
    $("#top").css("height", "250px");
    $("#playbtn").css("margin", "2% 0 0 0");
    $("#playbtn").css("padding-bottom", "3%");
    $("#remains").text("Remaining cards in packet: " + game.deck.cards.length);
    displayCardsWithJQuery();
    displayCurrentCard();
    displayPlayer();
  });

  $("#plusBtn").click(function() {
    var result = game.play("+");
    displayCardsWithJQuery();
    displayCurrentCard();
    displayTurnMessage(result);
    displayScore();
    $("#remains").text("Remaining cards in packet: " + game.deck.cards.length);
    displayPlayer();
  });

  $("#lessBtn").click(function() {
    var result = game.play("-");
    displayCardsWithJQuery();
    displayCurrentCard();
    displayTurnMessage(result);
    displayScore();
    $("#remains").text("Remaining cards in packet: " + game.deck.cards.length);
    displayPlayer();
  });

  $("#equalBtn").click(function() {
    var result = game.play("=");
    displayCardsWithJQuery();
    displayCurrentCard();
    displayTurnMessage(result);
    displayScore();
    $("#remains").text("Remaining cards in packet: " + game.deck.cards.length);
    displayPlayer();
  });
});

function displayCardsWithJQuery() {
  $("#drink").hide();

  $(".card").each(function(index, element) {
    $(this).text(
      game.visibleCards[index].rank + " " + game.visibleCards[index].suit
    );
    // "\u2665": heart, "\u2666": diams
    if (
      game.visibleCards[index].suit === "\u2665" ||
      game.visibleCards[index].suit === "\u2666"
    ) {
      $(this).css("color", "#b30000");
    } else {
      $(this).css("color", "black");
    }
  });
}

function displayCurrentCard() {
  $(".card").each(function(index) {
    $(this).removeClass("currentCard");
  });

  if (game.step === 0) {
    $("#step0").addClass("currentCard");
  } else if (game.step === 1) {
    $("#step1").addClass("currentCard");
  } else if (game.step === 2) {
    $("#step2").addClass("currentCard");
  } else if (game.step === 3) {
    $("#step3").addClass("currentCard");
  } else if (game.step === 4) {
    $("#step4").addClass("currentCard");
  }
}

function displayTurnMessage(result) {
  if (result === false) {
    $("#drink").show();
    $(".btn").hide();
    $("#remains").hide();
    setTimeout(function() {
      $("#remains").show();
      $("#drink").hide();
      $(".btn").show();
    }, 2000);
  }

  console.log(game);
  if (game.gameEnded() === "win") {
    $("#endTurn").show();
    $(".btn").hide();
    $(".card").hide();
    setTimeout(function() {
      $("#endTurn").hide();
      $(".btn").show();
      $(".card").show();
    }, 2000);
  }

  if (game.gameEnded() === false) {
    console.log("hey");
    $(".btn").hide();
    $(".card").hide();
    $("#final").show();
    $("#final").text("Winner is Player " + winnerIs());
    $("#winIMG").show();
  }
}

function displayScore() {
  if (game.playerScores[1] === 0) {
    $(".score1 span").text(game.playerScores[1]);
  } else {
    $(".score1 span").text("-" + game.playerScores[1]);
  }

  if (game.playerScores[2] === 0) {
    $(".score2 span").text(game.playerScores[2]);
  } else {
    $(".score2 span").text("-" + game.playerScores[2]);
  }
}

function winnerIs() {
  if (game.playerScores[1] < game.playerScores[2]) {
    return 1;
  } else {
    return 2;
  }
}

function displayPlayer() {
  if (game.currentPlayer === 1) {
    $(".score1 p").css("font-size", "40px");
    $(".score1 p").css("color", "tomato");
    $(".score1 p").css("font-weight", "bold");
  }
}
