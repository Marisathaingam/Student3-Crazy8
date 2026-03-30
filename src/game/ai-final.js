import {
  canPlayCard,
  drawCard,
  playCard,
  checkWinner,
  switchTurn
} from "./gameEngine.js";

export const AI_VERSION = "final-v1";

export function getPlayableCards(hand, topCard, currentSuit) {
  return hand.filter(function (card) {
    return canPlayCard(card, topCard, currentSuit);
  });
}

export function chooseComputerCard(playableCards) {
  const nonEightCards = playableCards.filter(function (card) {
    return card.rank !== "8";
  });

  if (nonEightCards.length > 0) {
    return nonEightCards[0];
  }

  if (playableCards.length > 0) {
    return playableCards[0];
  }

  return null;
}

export function chooseBestSuit(hand) {
  const suitCount = {
    Hearts: 0,
    Diamonds: 0,
    Clubs: 0,
    Spades: 0
  };

  hand.forEach(function (card) {
    if (Object.prototype.hasOwnProperty.call(suitCount, card.suit)) {
      suitCount[card.suit]++;
    }
  });

  let bestSuit = "Hearts";
  let maxCount = -1;

  for (const suit in suitCount) {
    if (suitCount[suit] > maxCount) {
      maxCount = suitCount[suit];
      bestSuit = suit;
    }
  }

  return bestSuit;
}

export function computerMove(state) {
  if (state.currentTurn !== "computer") {
    return {
      ...state,
      message: "It is not computer's turn."
    };
  }

  const topCard = state.discardPile[state.discardPile.length - 1];
  const playableCards = getPlayableCards(
    state.computerHand,
    topCard,
    state.currentSuit
  );

  if (playableCards.length > 0) {
    const chosenCard = chooseComputerCard(playableCards);

    const cardIndex = state.computerHand.findIndex(function (card) {
      return card.suit === chosenCard.suit && card.rank === chosenCard.rank;
    });

    let chosenSuit = null;

    if (chosenCard.rank === "8") {
      const remainingHand = state.computerHand.filter(function (_, index) {
        return index !== cardIndex;
      });

      chosenSuit = chooseBestSuit(remainingHand);
    }

    let newState = playCard("computer", cardIndex, state, chosenSuit);
    const actionMessage = newState.message;

    newState = checkWinner(newState);

    if (!newState.winner) {
      newState = switchTurn(newState);
      newState.message =
        actionMessage + " Turn changed to " + newState.currentTurn + ".";
    }

    return newState;
  }

  let newState = drawCard("computer", state);
  const actionMessage = newState.message;

  if (!newState.winner) {
    newState = switchTurn(newState);
    newState.message =
      actionMessage + " Turn changed to " + newState.currentTurn + ".";
  }

  return newState;
}