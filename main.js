var gamePattern = [];
var playerPattern = [];

var gameLevel = 0;

// Fuction to play sound
function playSound(track) {
  const audio = new Audio(`./sounds/${track}.mp3`);
  audio.play();
}

//  Function to generate a random block and push it to the array
function generatePattern() {
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      gamePattern.push("green");
      break;
    case 1:
      gamePattern.push("red");
      break;
    case 2:
      gamePattern.push("yellow");
      break;
    case 3:
      gamePattern.push("blue");
      break;
    default:
      console.log("Something Went wrong!!");
      $("#level-title").text("Unexpected Error!!please refresh");
      break;
  }
  // console.log(gamePattern);
}

// Function to play the generated pattern
function playPattern() {
  $(`#${gamePattern[gamePattern.length - 1]}`)
    .fadeOut(100)
    .fadeIn(100);
  playSound(gamePattern[gamePattern.length - 1]);

  console.log(gamePattern);
}

// Function to check the player entered pattern
function verifyPlayerPattern(index) {
  if (playerPattern[index] === gamePattern[index]) {
    if (playerPattern.length === gamePattern.length) {
      return 1;
    }
  } else {
    return 0;
  }
}

// Event Listener to check when the player starts the game
$(document).on("keydown", () => {
  if (gameLevel === 0) {
    generatePattern();
    gameLevel++;
    $("body").removeClass("game-over");
    $("#level-title").text(`Level ${gameLevel}`);
    setTimeout(() => {
      playPattern();
    }, 500);
  }
});

$(".btn").on("click", (e) => {
  if (gameLevel === 0) {
    $("#level-title").text("Press a key to restart");
  } else {
    const button = $(e.target);
    button.fadeOut(100).fadeIn(100);
    playSound(button.attr("id"));

    playerPattern.push(button.attr("id"));

    switch (verifyPlayerPattern(playerPattern.length - 1)) {
      case 1:
        gameLevel++;

        $("#level-title").text(`Level ${gameLevel}`);
        generatePattern();
        playerPattern = [];
        setTimeout(() => {
          playPattern();
        }, 1000);
        break;

      case 0:
        playerPattern = [];
        gamePattern = [];
        gameLevel = 0;

        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over");
        break;

      default:
        break;
    }
  }
});
