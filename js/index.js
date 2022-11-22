// tic tac toe constants

const TICTACTOEFIELD_ARRAY = document.querySelectorAll("div.fields");
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

// tic tac toe game
let ticTacToe = TICTACTOEFIELD_ARRAY.forEach((tictac) =>
  tictac.addEventListener("click", (e) => {
    userTic = e.target.id;
    npcTic = NpcRandomFieldNumber();
    userTicTacToField(userTic);
    while (checkIfFieldEmpty(npcTic)) {
      npcTic = NpcRandomFieldNumber();
    }
    if (ticTacToeAvailableFields.length > 1) {
      npcTicTacToField(npcTic);
    }
    whoWillWinTheGame();
    console.log(gameOver);
  })
);

// draw X into parameter  //? (<div id="fieldName"></div>)

function userTicTacToField(fieldName) {
  if (!ticTacToeAvailableFields.includes(fieldName)) {
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
  let usedFieldPosition = parseInt(fieldName.slice(5, 6));
  if (ticTacToeUserArray.includes(fieldName) == true) {
    ticTacToeAvailableFields.splice(usedFieldPosition, 0, "x");
  }
  if (ticTacToeNpcArray.includes(fieldName) == true) {
    ticTacToeAvailableFields.splice(usedFieldPosition, 0, "o");
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
  if (ticTacToeAvailableFields.includes(fieldName)) {
    return false;
  }
  return true;
}

// this is where winner will be determined

function whoWillWinTheGame() {
  if (winOption(ticTacToeUserArray)) {
    console.log("Player Wins!");
    gameOver = true;
  } else if (winOption(ticTacToeNpcArray)) {
    console.log("Computer Wins!");
    gameOver = true;
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
