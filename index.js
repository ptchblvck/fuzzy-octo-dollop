// tic tac toe

const TICTACTOEFIELD_ARRAY = document.querySelectorAll("div.fields");
let userTic;
let userTicTac;
let ticTacToeFieldsUsed = [];
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

let ticTacToe = TICTACTOEFIELD_ARRAY.forEach((tictac) =>
  tictac.addEventListener("click", (e) => {
    userTic = e.target.id;
    console.log(userTic);
    userTicTacToField(userTic);
    npcTicTacToField(NpcRandomFieldNumber());
  })
);

function userTicTacToField(fieldName) {
  if (ticTacToeUserArray.includes(fieldName) == true) {
    alert("field already chosen!");
    return false;
  } else {
    for (let i = 0; i < 2; i++) {
      let crossSpan = document.createElement("span");
      crossSpan.className = "player-cross-filled";
      document.getElementById(fieldName).append(crossSpan);
    }
    ticTacToeUserArray.push(fieldName);

    console.log(ticTacToeUserArray);

    userWins();
  }
}

function usedFieldDetection(fieldName) {
  let usedFieldPosition = parseInt(fieldName.slice(5, 6));
  if (ticTacToeUserArray.includes(fieldName) == true) {
    ticTacToeFieldsUsed.splice(usedFieldPosition, 0, "x");
  }
  if (ticTacToeNpcArray.includes(fieldName) == true) {
    ticTacToeFieldsUsed.splice(usedFieldPosition, 0, "o");
  }
}

function sortArrayToString(arrayName) {
  return JSON.stringify(arrayName.sort());
}

// this is where the magic happens...

function userWins() {
  let userWinChanceOptions = Object.keys(winPossibilities);
  for (let chance = 0; chance < userWinChanceOptions.length; chance++) {
    const userWinChancePosition = userWinChanceOptions[chance];
    let userWinResult = sortArrayToString(ticTacToeUserArray);
    let userWinComparison = sortArrayToString(
      winPossibilities[userWinChancePosition]
    );
    if (userWinResult == userWinComparison) {
      console.log("you win!");
    }
  }
  // for (let i = 0; i < ticTacToeUserArray.length; i++) {
  //   const userArrayPosition = ticTacToeUserArray[i];
  //   if (
  //     winPossibilities.win1.includes(userArrayPosition) &&
  //     ticTacToeUserArray.length > 2
  //   ) {
  //     console.log("you Win!");
  //   }
  // }
}

function NpcRandomFieldNumber() {
  let npcRandomField = Math.floor(Math.random() * 9) + 1;
  return "field" + npcRandomField;
}

function npcTicTacToField(fieldName) {
  if (
    ticTacToeNpcArray.includes(fieldName) == true ||
    ticTacToeUserArray.includes(fieldName) == true
  ) {
    return false;
  }
  // if (
  //   !ticTacToeUserArray.includes(fieldName) &&
  //   !ticTacToeNpcArray.includes(fieldName)
  // ) {
  // }
  else {
    for (let i = 0; i < 2; i++) {
      let circleNpc = document.createElement("div");
      circleNpc.className = "computer-circle-filled";
      document.getElementById(fieldName).append(circleNpc);
    }
    ticTacToeNpcArray.push(fieldName);

    console.log(ticTacToeNpcArray);
  }
}

npcTicTacToField(NpcRandomFieldNumber());
