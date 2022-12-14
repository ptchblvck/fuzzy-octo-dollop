// tic tac toe constants

const ticTacToeFieldArray = document.querySelectorAll("div.fields");
const ROOT = document.querySelector(":root");
const COLORS = document.querySelectorAll(".picking-color > div");

// variables for colors

let pickedColor;
let changedColor;
let colorValue = [];

// tia tac toe variables

let colorDivArray = [];
let userTic;
let npcTic;
let gameOver = false;
let ticTacToeAvailableFields = [
  "field1",
  "field2",
  "field3",
  "field4",
  "field5",
  "field6",
  "field7",
  "field8",
  "field9",
];
const ticTacToePlayedFields = ticTacToeAvailableFields.map((e) => e);
let ticTacToeUserArray = [];
let ticTacToeNpcArray = [];
winPossibilities = {
  win1: ["field1", "field2", "field3"],
  win2: ["field1", "field5", "field9"],
  win3: ["field1", "field4", "field7"],
  win4: ["field4", "field5", "field6"],
  win5: ["field7", "field8", "field9"],
  win6: ["field2", "field5", "field8"],
  win7: ["field3", "field6", "field9"],
  win8: ["field3", "field5", "field7"],
};

let playedGames = 0;

// tic tac toe game

let ticTacToeFieldId = ticTacToeFieldArray.forEach((tictac) =>
  tictac.addEventListener("click", (e) => {
    userTic = e.target.id;
    npcTic = NpcRandomFieldNumber();
    userTicTacToField(userTic);
    while (checkIfFieldEmpty(npcTic)) {
      npcTic = NpcRandomFieldNumber();
    }
    npcTicTacToField(npcTic);
    usedFieldDetection(userTic);
    usedFieldDetection(npcTic);
    whoWillWinTheGame();
  })
);

// draw X into parameter  //? (<div id="fieldName"></div>)

function userTicTacToField(fieldName) {
  if (ticTacToeUserArray.includes(fieldName) == true) {
    alert("field already chosen!");
    return false;
  } else if (ticTacToeAvailableFields.includes(fieldName)) {
    for (let i = 0; i < 2; i++) {
      let crossSpan = document.createElement("span");
      crossSpan.className = "player-cross-filled";
      document.getElementById(fieldName).append(crossSpan);
    }
    ticTacToeUserArray.push(fieldName);
    deleteFromPossibleField(fieldName);
    // console.log(`Player picked: ${ticTacToeUserArray}`);
  }
}

function usedFieldDetection(fieldName) {
  let usedFieldPosition = parseInt(fieldName.slice(5, 6)) - 1;
  if (ticTacToeUserArray.includes(fieldName) == true) {
    ticTacToePlayedFields.splice(usedFieldPosition, 1, "x");
  }
  if (ticTacToeNpcArray.includes(fieldName) == true) {
    ticTacToePlayedFields.splice(usedFieldPosition, 1, "o");
  }
}

function sortArrayToString(arrayName) {
  return JSON.stringify(arrayName.sort());
}

// random number from 1 to 9 -> returns field number

function NpcRandomFieldNumber() {
  let npcRandomField = Math.floor(Math.random() * 9) + 1;
  return "field" + npcRandomField;
}

// npc function to draw a circle to field

function npcTicTacToField(fieldName) {
  if (ticTacToeNpcArray.includes(fieldName) && checkIfFieldEmpty(fieldName)) {
    return false;
  } else if (ticTacToeAvailableFields.includes(fieldName)) {
    for (let i = 0; i < 1; i++) {
      let circleNpc = document.createElement("div");
      circleNpc.className = "computer-circle-filled";
      document.getElementById(fieldName).append(circleNpc);
    }
    ticTacToeNpcArray.push(fieldName);
    deleteFromPossibleField(fieldName);
    // console.log(`Npc picked ${ticTacToeNpcArray}`);
  }
}

// deletes the parameter given to function from the available fields

function deleteFromPossibleField(fieldName) {
  for (let i = 0; i < ticTacToeAvailableFields.length; i++) {
    if (ticTacToeAvailableFields.includes(fieldName)) {
      ticTacToeAvailableFields.splice(
        ticTacToeAvailableFields.indexOf(fieldName),
        1
      );
    }
  }
}

// check for emptyness of field //? returns false if field is empty

function checkIfFieldEmpty(fieldName) {
  if (
    ticTacToeAvailableFields.includes(fieldName) ||
    ticTacToeAvailableFields.length < 1
  ) {
    return false;
  }
  return true;
}

// this is where winner will be determined

function whoWillWinTheGame() {
  if (winOption(ticTacToeUserArray)) {
    document.querySelector("h1").textContent = "Player Wins!";
    console.log("Player Wins!");
    setTimeout((e) => {
      e = location.reload();
    }, 2000);
  } else if (winOption(ticTacToeNpcArray)) {
    document.querySelector("h1").textContent = "Computer Wins!";
    console.log("Computer Wins!");
    setTimeout((e) => {
      e = location.reload();
    }, 2000);
  }
  if (ticTacToeAvailableFields.length < 1) {
    document.querySelector("h1").textContent = "It's a Draw!";
    console.log("It's a Draw!");
    setTimeout((e) => {
      e = location.reload();
    }, 2000);
  }
}

// this is the check for if array of player or computer matches with the winning options

function winOption(groupFields) {
  let winPossibilityArray = Object.keys(winPossibilities);
  for (let i = 0; i < winPossibilityArray.length; i++) {
    const WIN_POS = winPossibilityArray[i];
    for (let j = 0; j < winPossibilities[WIN_POS].length; j++) {
      const WIN_ARRAY_POS = winPossibilities[WIN_POS];
      if (
        groupFields.includes(WIN_ARRAY_POS[0]) &&
        groupFields.includes(WIN_ARRAY_POS[1]) &&
        groupFields.includes(WIN_ARRAY_POS[2])
      ) {
        return true;
      }
    }
  }
  return false;
}

// changing color

function getColor() {
  let rootStyle = getComputedStyle(ROOT);
  console.log(
    `The value of ${pickedColor} is: ` +
      rootStyle.getPropertyValue("--color-player")
  );
}

function changePlayerColor(color) {
  ROOT.style.setProperty("--color-player", color);
}

function changeNpcColor(color) {
  ROOT.style.setProperty("--color-npc", color);
}

COLORS.forEach((colorPosition) =>
  colorPosition.addEventListener("click", (c) => {
    pickedColor = c.currentTarget.id.slice(5) - 1;
    console.log(getAllColorValues(pickedColor));
    changePlayerColor(getAllColorValues(pickedColor));
    colorPicker();
  })
);

function getAllColorValues(colorPosition) {
  for (const element of COLORS) {
    colorValue.push(
      window
        .getComputedStyle(element, null)
        .getPropertyValue("background-color")
    );
  }
  return colorValue[colorPosition];
}

function colorNumber() {
  for (let i = 0; i < COLORS.length; i++) {
    const position = COLORS[i];
  }
}

function colorPicker() {
  for (let i = 0, j = 7; i < 8, j >= 0; i++, j--) {
    switch (pickedColor) {
      case i:
        changeNpcColor(getAllColorValues(j));
        break;
    }
  }
}

// hard mode

// computer choses one of the corners

function npcRoundOne() {
  let num = Math.ceil(Math.random() * 4);
  switch (num) {
    case 1:
      return "field1";
    case 2:
      return "field3";
    case 3:
      return "field7";
    case 4:
      return "field9";
    default:
      break;
  }
}

function npcWillAlwaysWin() {
  if (playedGames == 0) {
    if (ticTacToePlayedFields[4] == "x") {
      npcTicTacToField(npcRoundOne);
      playedGames++;
    }
    if (
      ticTacToePlayedFields[0] == "x" ||
      ticTacToePlayedFields[2] == "x" ||
      ticTacToePlayedFields[6] == "x" ||
      ticTacToePlayedFields[8] == "x"
    ) {
      npcTicTacToField("field5");
      playedGames++;
    }
  }

  /* the if the game looks not like this:

      [o][ ][ ] or [ ][ ][o] or [ ][ ][ ] or [ ][ ][ ]
      [ ][x][ ]    [ ][x][ ]    [ ][x][ ]    [ ][x][ ]
      [ ][ ][ ]    [ ][ ][ ]    [o][ ][ ]    [ ][ ][o]

      player chose one of the corners:

      [x][ ][ ]
      [ ][x][ ]
      [ ][ ][o]
  */

  if (playedGames == 1) {
    if (ticTacToePlayedFields[4] == "x") {
      if (
        !ticTacToePlayedFields[1] == "x" &&
        !ticTacToePlayedFields[3] == "x" &&
        !ticTacToePlayedFields[5] == "x" &&
        !ticTacToePlayedFields[7] == "x"
      ) {
        if (
          ticTacToePlayedFields[0] == "o" &&
          ticTacToeAvailableFields.includes("field9")
        ) {
          npcTicTacToField("field9");
        }
        if (
          ticTacToePlayedFields[2] == "o" &&
          ticTacToeAvailableFields.includes("field7")
        ) {
          npcTicTacToField("field7");
        }
        if (
          ticTacToePlayedFields[6] == "o" &&
          ticTacToeAvailableFields.includes("field3")
        ) {
          npcTicTacToField("field3");
        }
        if (
          ticTacToePlayedFields[8] == "o" &&
          ticTacToeAvailableFields.includes("field1")
        ) {
          npcTicTacToField("field1");
        }
      }
    }
  }
}
