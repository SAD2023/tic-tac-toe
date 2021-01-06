var list_of_boxes_player1_has = []
var list_of_boxes_player2_has = []
var progress = 0
var turn = 1
var win1 = false;
var win2 = false;

var winning_sequences = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8],
[3, 6, 9], [1, 5, 9], [3, 5, 7]]

var still_going = true;
var remaining = 9
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
        document.querySelectorAll('button').forEach(disable);
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
        document.querySelectorAll('button').forEach(disable);
      }
    }

    else {
      document.getElementById("toptitle").innerHTML = "Impossible!";
    }
  }
}

function disable(button) {
  button.disabled = true;
}

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

var buttons = ["1", "2", "3", "4", "5", "6",
  "7", "8", "9"]

while (still_going === true) {
  buttons.forEach(check_whether_pressed)
  remaining = remaining - 1

  if (remaining === 0) {
    still_going = false
  }

}

function check_whether_pressed(name) {

  document.getElementById(name).onclick = function () {
    return_value(name);
  };

};

