var game;

$(document).ready(function() {
  $(".card").toggle();
  $(".btn").toggle();
  $("#drink").hide();
  $("#endTurn").hide();
  $("#playbtn").click(function() {
    game = new Game();

    console.log(game);
    $(".card").show();
    $(".btn").show();
    $("#playbtn").css("margin", "5% 35%");
    displayCardsWithJQuery();
    displayCurrentCard();
  });

  $("#plusBtn").click(function() {
    var result = game.play("+");
    displayCardsWithJQuery();
    displayCurrentCard();
    displayTurnMessage(result);
  });

  $("#lessBtn").click(function() {
    var result = game.play("-");
    displayCardsWithJQuery();
    displayCurrentCard();
    displayTurnMessage(result);
  });

  $("#equalBtn").click(function() {
    var result = game.play("=");
    displayCardsWithJQuery();
    displayCurrentCard();
    displayTurnMessage(result);
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
      $(this).css("color", "red");
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
    setTimeout(function() {
      $("#drink").hide();
      $(".btn").show();
    }, 3000);

    // $("#drink").css("margin", "-25% 0 8% 0");
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
    }, 3000);
  }
}
