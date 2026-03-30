import {
  getPlayableCards,
  chooseComputerCard,
  chooseBestSuit,
  computerMove
} from "./game/ai-final.js";

const output = document.getElementById("output");
const runTestButton = document.getElementById("runAITestButton");

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

function runAITest() {
  output.textContent = "";

  writeLine("=== Testing getPlayableCards() ===");
  const topCard = { suit: "Hearts", rank: "5" };
  const currentSuit = "Hearts";

  const hand1 = [
    { suit: "Hearts", rank: "K" },
    { suit: "Clubs", rank: "5" },
    { suit: "Spades", rank: "8" },
    { suit: "Spades", rank: "9" }
  ];

  const playableCards = getPlayableCards(hand1, topCard, currentSuit);

  writeLine("Top card: 5 of Hearts");
  writeLine("Hand: " + formatCards(hand1));
  writeLine("Playable cards: " + formatCards(playableCards));
  writeLine("Playable card count: " + playableCards.length);

  writeLine("");
  writeLine("=== Testing chooseComputerCard() ===");
  const chosenCard = chooseComputerCard(playableCards);
  writeLine("Chosen computer card: " + chosenCard.rank + " of " + chosenCard.suit);

  writeLine("");
  writeLine("=== Testing chooseBestSuit() ===");
  const suitTestHand = [
    { suit: "Clubs", rank: "2" },
    { suit: "Clubs", rank: "K" },
    { suit: "Diamonds", rank: "3" }
  ];

  const bestSuit = chooseBestSuit(suitTestHand);
  writeLine("Hand for suit choice: " + formatCards(suitTestHand));
  writeLine("Best suit: " + bestSuit);

  writeLine("");
  writeLine("=== Testing computerMove() - valid play ===");

  const stateValid = {
    deck: [{ suit: "Spades", rank: "2" }],
    discardPile: [{ suit: "Hearts", rank: "5" }],
    playerHand: [{ suit: "Clubs", rank: "9" }],
    computerHand: [
      { suit: "Clubs", rank: "9" },
      { suit: "Hearts", rank: "K" }
    ],
    currentSuit: "Hearts",
    currentRank: "5",
    currentTurn: "computer",
    winner: null,
    phase: "computerTurn",
    message: ""
  };

  const afterValid = computerMove(stateValid);

  writeLine("Computer hand before: " + formatCards(stateValid.computerHand));
  writeLine("Computer hand after: " + formatCards(afterValid.computerHand));
  writeLine(
    "Top discard after: " +
      afterValid.discardPile[afterValid.discardPile.length - 1].rank +
      " of " +
      afterValid.discardPile[afterValid.discardPile.length - 1].suit
  );
  writeLine("Current suit after: " + afterValid.currentSuit);
  writeLine("Current rank after: " + afterValid.currentRank);
  writeLine("Current turn after: " + afterValid.currentTurn);
  writeLine("Phase after: " + afterValid.phase);
  writeLine("Message: " + afterValid.message);
}

if (runTestButton && output) {
  output.textContent = "AI module loaded.\n";
  runTestButton.addEventListener("click", runAITest);
}