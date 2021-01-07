// The list of locations player1 has so far
var list_of_boxes_player1_has = []

// The list of locations player2 has so far
var list_of_boxes_player2_has = []

// How many moves have been cast so far
var progress = 0

// Which players turn it is currently. 1 corresponds to player1, 2 to player2
var turn = 1

// Whether player1 has won
var win1 = false;

// Whether player2 has won
var win2 = false;

// The list of sequences of locations a player would need to have to win a game. 
var winning_sequences = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8],
[3, 6, 9], [1, 5, 9], [3, 5, 7]]

// Whether the game is ongoing or not
var still_going = true;

// The remaining number of moves left. 
var remaining = 9

/**Takes the ID of a button pressed and changes the HTML content accordingly.
 * 
 * - If a button has already been pressed, it sents an alert saying so.
 * - If it's an empty grid-location, and it's player one's turn, it changes the 
 *    box to 'X'. The title is changed to "Player 2's turn!"
 * - For player two, the box is changed to '0' and the title is changed to 
 *    "Player 1's turn!"
 * - For both players, the box is added to their list of boxes.
 * - It also checks to see whether any player has won after every turn.
 * - If the game has ended (draw or win) it disables the grid buttons so that
 *    the players can not input anything into the grid.
 */
function return_value(name) {
  var current_value_of_button_pressed = document.getElementById(name).innerHTML;

  if (current_value_of_button_pressed === "X" ||
    current_value_of_button_pressed === "0") {
    alert("This spot has been used already!");
  }
  else {
    if (turn === 1) {
      document.getElementById(name).innerHTML = "X";
      list_of_boxes_player1_has.push(parseInt(name));
      progress += 1;
      var done = declare_winner(progress);

      if (done === 0) {
        document.getElementById("toptitle").innerHTML = "Player 2's turn!";
        turn = 2;
      }

      else {
        document.querySelectorAll('button.location').forEach(disable);
      }
    }

    else if (turn === 2) {
      document.getElementById(name).innerHTML = "0";
      list_of_boxes_player2_has.push(parseInt(name));
      progress += 1;
      var done = declare_winner(progress);

      if (done === 0) {

        document.getElementById("toptitle").innerHTML = "Player 1's turn!";
        turn = 1;
      }
      else {
        document.querySelectorAll('button.location').forEach(disable);
      }
    }

    else {
      document.getElementById("toptitle").innerHTML = "Impossible!";
    }
  }
}

/**Takes a button and disables it */
function disable(button) {
  button.disabled = true;
}

/**Checks who won using [find_winner] and changes the HTML accordingly.
 * If player1 won, it changes the title to "Player 1 Wins!" and returns 1
 * If player2 won, it changes the title to "Player 2 Wins!" and also returns 1
 * If nine moves have been made already, and neither won, it changes the title
 * to "Draw!" and returns 1 again.
 * 
 * If none of the above conditions applies, it doesn't change the title and 
 * returns 0.
 */
function declare_winner(progress) {
  var result = find_winner();
  if (result === 1) {
    document.getElementById("toptitle").innerHTML = "Player 1 Wins!";
    return 1
  }
  else if (result === 2) {
    document.getElementById("toptitle").innerHTML = "Player 2 Wins!";
    return 1
  }
  else if (progress === 9) {
    document.getElementById("toptitle").innerHTML = "Draw!";
    return 1
  }
  else {
    return 0;
  }
}

/**Checks whether if either player have matched any of the winning sequences. 
 * Loops through the list [winning_sequences] and if player1 has all three 
 * locations of particular sequences (e.g. top-right, top-center, top-left), it
 * it sets win1 to true. It sets win2 to true if player2 has any of those
 * sequences. 
 * 
 * Returns 1 if win1 is true, signalling that player1 won
 * Returns 2 if win2 is true, signalling that player2 won
 * Returns 0 if neither have a winning sequence, either meaning a draw or that 
 * the match is not over yet.
 */
function find_winner() {
  for (var i = 0; i < winning_sequences.length; i++) {
    for (var j = 0; j < 3; j++) {
      if (list_of_boxes_player1_has.includes(winning_sequences[i][j])
        && list_of_boxes_player1_has.includes(winning_sequences[i][j + 1])
        && list_of_boxes_player1_has.includes(winning_sequences[i][j + 2])
      ) {
        win1 = true;
        win2 = false;
      }
      if (list_of_boxes_player2_has.includes(winning_sequences[i][j])
        && list_of_boxes_player2_has.includes(winning_sequences[i][j + 1])
        && list_of_boxes_player2_has.includes(winning_sequences[i][j + 2])
      ) {
        win2 = true;
        win1 = false;
      }
    }
    if (win1 == true) {
      return 1
    }
    else if (win2 == true) {
      return 2
    }
  }
  return 0
}

// List of IDs of all nine grid locations
var buttons = ["1", "2", "3", "4", "5", "6",
  "7", "8", "9"]

/* Checks whether any of the grid-location buttons have been pressed. Stops
when all nine buttons have been pressed */
while (still_going === true) {
  buttons.forEach(check_whether_pressed)
  remaining = remaining - 1

  if (remaining === 0) {
    still_going = false
  }
}

// Constantly checks whether the Play Again button has been pressed
check_whether_pressed("end-button")

/**Takes an ID and if the value of the element with the id is empty (meaning it 
 * is one of the nine grid-locations), it calls return_value with the ID.
 * If the value is "Play Again", it reloads the page. */
function check_whether_pressed(name) {

  document.getElementById(name).onclick = function () {
    var end_value = document.getElementById(name).innerHTML;
    if (end_value === "Play Again") {
      location.reload();
      return false;
    }
    else {
      return_value(name);
    }
  };
};

