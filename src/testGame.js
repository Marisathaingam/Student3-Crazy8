import {
  createDeck,
  shuffleDeck,
  startGame,
  canPlayCard,
  drawCard,
  playCard,
  checkWinner,
  switchTurn
} from "./game/gameEngine.js";

const output = document.getElementById("output");
const runTestButton = document.getElementById("runTestButton");

function writeLine(text) {
  output.textContent += text + "\n";
}

function formatCards(cards) {
  return cards
    .map(function (card) {
      return card.rank + " of " + card.suit;
    })
    .join(", ");
}

function runStartGameTest() {
  output.textContent = "";

  writeLine("=== Testing createDeck() ===");
  const freshDeck = createDeck();
  writeLine("Total cards in fresh deck: " + freshDeck.length);

  writeLine("");
  writeLine("=== Testing shuffleDeck() ===");
  const shuffledDeck = shuffleDeck(freshDeck);
  writeLine("Total cards after shuffle: " + shuffledDeck.length);

  writeLine("");
  writeLine("=== Testing startGame() ===");
  const state = startGame();

  writeLine("Player hand count: " + state.playerHand.length);
  writeLine("Computer hand count: " + state.computerHand.length);
  writeLine("Deck cards left: " + state.deck.length);
  writeLine("Discard pile count: " + state.discardPile.length);
  writeLine("Current suit: " + state.currentSuit);
  writeLine("Current rank: " + state.currentRank);
  writeLine("Current turn: " + state.currentTurn);
  writeLine("Phase: " + state.phase);
  writeLine("Message: " + state.message);

  writeLine("");
  writeLine("Player hand:");
  writeLine(formatCards(state.playerHand));

  writeLine("");
  writeLine("Computer hand:");
  writeLine(formatCards(state.computerHand));

  writeLine("");
  writeLine("Top discard card:");
  writeLine(state.discardPile[0].rank + " of " + state.discardPile[0].suit);

  writeLine("");
  writeLine("=== Testing canPlayCard() ===");

  const topCard = { suit: "Hearts", rank: "5" };
  const currentSuit = "Hearts";

  const card1 = { suit: "Hearts", rank: "K" };
  const card2 = { suit: "Clubs", rank: "5" };
  const card3 = { suit: "Spades", rank: "8" };
  const card4 = { suit: "Spades", rank: "9" };

  writeLine("Top card: 5 of Hearts");
  writeLine("Current suit: Hearts");
  writeLine("");

  writeLine("Card 1 = K of Hearts -> " + canPlayCard(card1, topCard, currentSuit));
  writeLine("Card 2 = 5 of Clubs -> " + canPlayCard(card2, topCard, currentSuit));
  writeLine("Card 3 = 8 of Spades -> " + canPlayCard(card3, topCard, currentSuit));
  writeLine("Card 4 = 9 of Spades -> " + canPlayCard(card4, topCard, currentSuit));

  writeLine("");
  writeLine("=== Testing drawCard() ===");

  const beforePlayerHandCount = state.playerHand.length;
  const beforeDeckCount = state.deck.length;

  const stateAfterDraw = drawCard("player", state);

  const afterPlayerHandCount = stateAfterDraw.playerHand.length;
  const afterDeckCount = stateAfterDraw.deck.length;
  const drawnCard =
    stateAfterDraw.playerHand[stateAfterDraw.playerHand.length - 1];

  writeLine("Before draw - player hand count: " + beforePlayerHandCount);
  writeLine("Before draw - deck count: " + beforeDeckCount);
  writeLine("After draw - player hand count: " + afterPlayerHandCount);
  writeLine("After draw - deck count: " + afterDeckCount);
  writeLine("Drawn card: " + drawnCard.rank + " of " + drawnCard.suit);
  writeLine("Message after draw: " + stateAfterDraw.message);

  writeLine("");
  writeLine("Player hand after draw:");
  writeLine(formatCards(stateAfterDraw.playerHand));

  writeLine("");
  writeLine("=== Testing playCard() - valid move ===");

  const playStateValid = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [
      { suit: "Hearts", rank: "K" },
      { suit: "Clubs", rank: "9" }
    ],
    computerHand: [],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "player",
    winner: null,
    phase: "playerTurn",
    message: ""
  };

  const stateAfterValidPlay = playCard("player", 0, playStateValid);

  writeLine("Before valid play - player hand count: " + playStateValid.playerHand.length);
  writeLine("Before valid play - discard pile count: " + playStateValid.discardPile.length);
  writeLine("Played card: K of Hearts");
  writeLine("After valid play - player hand count: " + stateAfterValidPlay.playerHand.length);
  writeLine("After valid play - discard pile count: " + stateAfterValidPlay.discardPile.length);
  writeLine("After valid play - current suit: " + stateAfterValidPlay.currentSuit);
  writeLine("After valid play - current rank: " + stateAfterValidPlay.currentRank);
  writeLine("After valid play - phase: " + stateAfterValidPlay.phase);
  writeLine("Message after valid play: " + stateAfterValidPlay.message);

  writeLine("");
  writeLine("Remaining player hand after valid play:");
  writeLine(formatCards(stateAfterValidPlay.playerHand));

  writeLine("");
  writeLine("=== Testing playCard() - invalid move ===");

  const playStateInvalid = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [
      { suit: "Clubs", rank: "9" }
    ],
    computerHand: [],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "player",
    winner: null,
    phase: "playerTurn",
    message: ""
  };

  const stateAfterInvalidPlay = playCard("player", 0, playStateInvalid);

  writeLine("Tried card: 9 of Clubs");
  writeLine("After invalid play - player hand count: " + stateAfterInvalidPlay.playerHand.length);
  writeLine("After invalid play - discard pile count: " + stateAfterInvalidPlay.discardPile.length);
  writeLine("After invalid play - current suit: " + stateAfterInvalidPlay.currentSuit);
  writeLine("After invalid play - current rank: " + stateAfterInvalidPlay.currentRank);
  writeLine("Message after invalid play: " + stateAfterInvalidPlay.message);

  writeLine("");
  writeLine("=== Testing playCard() - play 8 and change suit ===");

  const playStateEight = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [
      { suit: "Spades", rank: "8" }
    ],
    computerHand: [],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "player",
    winner: null,
    phase: "playerTurn",
    message: ""
  };

  const stateAfterEightPlay = playCard("player", 0, playStateEight, "Clubs");

  writeLine("Played card: 8 of Spades");
  writeLine("Chosen new suit: Clubs");
  writeLine("After play 8 - player hand count: " + stateAfterEightPlay.playerHand.length);
  writeLine("After play 8 - discard pile count: " + stateAfterEightPlay.discardPile.length);
  writeLine("After play 8 - current suit: " + stateAfterEightPlay.currentSuit);
  writeLine("After play 8 - current rank: " + stateAfterEightPlay.currentRank);
  writeLine("After play 8 - phase: " + stateAfterEightPlay.phase);
  writeLine("Message after play 8: " + stateAfterEightPlay.message);

  writeLine("");
  writeLine("=== Testing checkWinner() - player wins ===");

  const winnerStatePlayer = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [],
    computerHand: [{ suit: "Clubs", rank: "9" }],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "player",
    winner: null,
    phase: "checkWin",
    message: ""
  };

  const stateAfterPlayerWin = checkWinner(winnerStatePlayer);

  writeLine("Player hand count: " + stateAfterPlayerWin.playerHand.length);
  writeLine("Computer hand count: " + stateAfterPlayerWin.computerHand.length);
  writeLine("Winner: " + stateAfterPlayerWin.winner);
  writeLine("Phase: " + stateAfterPlayerWin.phase);
  writeLine("Message: " + stateAfterPlayerWin.message);

  writeLine("");
  writeLine("=== Testing checkWinner() - computer wins ===");

  const winnerStateComputer = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [{ suit: "Clubs", rank: "9" }],
    computerHand: [],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "computer",
    winner: null,
    phase: "checkWin",
    message: ""
  };

  const stateAfterComputerWin = checkWinner(winnerStateComputer);

  writeLine("Player hand count: " + stateAfterComputerWin.playerHand.length);
  writeLine("Computer hand count: " + stateAfterComputerWin.computerHand.length);
  writeLine("Winner: " + stateAfterComputerWin.winner);
  writeLine("Phase: " + stateAfterComputerWin.phase);
  writeLine("Message: " + stateAfterComputerWin.message);

  writeLine("");
  writeLine("=== Testing checkWinner() - no winner yet ===");

  const noWinnerState = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [{ suit: "Clubs", rank: "9" }],
    computerHand: [{ suit: "Spades", rank: "K" }],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "player",
    winner: null,
    phase: "checkWin",
    message: ""
  };

  const stateAfterNoWinnerCheck = checkWinner(noWinnerState);

  writeLine("Player hand count: " + stateAfterNoWinnerCheck.playerHand.length);
  writeLine("Computer hand count: " + stateAfterNoWinnerCheck.computerHand.length);
  writeLine("Winner: " + stateAfterNoWinnerCheck.winner);
  writeLine("Phase: " + stateAfterNoWinnerCheck.phase);

  writeLine("");
  writeLine("=== Testing switchTurn() - player to computer ===");

  const switchState1 = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [{ suit: "Clubs", rank: "9" }],
    computerHand: [{ suit: "Spades", rank: "K" }],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "player",
    winner: null,
    phase: "playerTurn",
    message: ""
  };

  const stateAfterSwitch1 = switchTurn(switchState1);

  writeLine("Before switch - current turn: " + switchState1.currentTurn);
  writeLine("After switch - current turn: " + stateAfterSwitch1.currentTurn);
  writeLine("After switch - phase: " + stateAfterSwitch1.phase);
  writeLine("After switch - message: " + stateAfterSwitch1.message);

  writeLine("");
  writeLine("=== Testing switchTurn() - computer to player ===");

  const switchState2 = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [{ suit: "Clubs", rank: "9" }],
    computerHand: [{ suit: "Spades", rank: "K" }],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "computer",
    winner: null,
    phase: "computerTurn",
    message: ""
  };

  const stateAfterSwitch2 = switchTurn(switchState2);

  writeLine("Before switch - current turn: " + switchState2.currentTurn);
  writeLine("After switch - current turn: " + stateAfterSwitch2.currentTurn);
  writeLine("After switch - phase: " + stateAfterSwitch2.phase);
  writeLine("After switch - message: " + stateAfterSwitch2.message);

  writeLine("");
  writeLine("=== Testing switchTurn() - game already has winner ===");

  const switchStateWinner = {
    deck: [],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [],
    computerHand: [{ suit: "Spades", rank: "K" }],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "player",
    winner: "player",
    phase: "gameOver",
    message: ""
  };

  const stateAfterWinnerSwitch = switchTurn(switchStateWinner);

  writeLine("Winner: " + stateAfterWinnerSwitch.winner);
  writeLine("After switch attempt - current turn: " + stateAfterWinnerSwitch.currentTurn);
  writeLine("After switch attempt - phase: " + stateAfterWinnerSwitch.phase);

  console.log("Fresh deck:", freshDeck);
  console.log("Shuffled deck:", shuffledDeck);
  console.log("Game state:", state);
  console.log("State after draw:", stateAfterDraw);
  console.log("State after valid play:", stateAfterValidPlay);
  console.log("State after invalid play:", stateAfterInvalidPlay);
  console.log("State after play 8:", stateAfterEightPlay);
  console.log("State after player win:", stateAfterPlayerWin);
  console.log("State after computer win:", stateAfterComputerWin);
  console.log("State after no winner check:", stateAfterNoWinnerCheck);
  console.log("State after switch 1:", stateAfterSwitch1);
  console.log("State after switch 2:", stateAfterSwitch2);
  console.log("State after winner switch attempt:", stateAfterWinnerSwitch);
}

if (runTestButton && output) {
  runTestButton.addEventListener("click", runStartGameTest);
}