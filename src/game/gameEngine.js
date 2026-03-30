import { SUITS, RANKS } from "./constants.js";
import { initialGameState } from "./gameState.js";

function cloneState(state) {
  return {
    ...state,
    deck: [...state.deck],
    discardPile: [...state.discardPile],
    playerHand: [...state.playerHand],
    computerHand: [...state.computerHand]
  };
}

function getHandKey(playerType) {
  return playerType === "player" ? "playerHand" : "computerHand";
}

export function createDeck() {
  const deck = [];

  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }

  return deck;
}

export function shuffleDeck(deck) {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = shuffled[i];
    shuffled[i] = shuffled[randomIndex];
    shuffled[randomIndex] = temp;
  }

  return shuffled;
}

export function startGame(cardCount = 5) {
  const deck = shuffleDeck(createDeck());

  const playerHand = deck.splice(0, cardCount);
  const computerHand = deck.splice(0, cardCount);

  let firstCard = deck.shift();

  while (firstCard && firstCard.rank === "8") {
    deck.push(firstCard);
    firstCard = deck.shift();
  }

  if (!firstCard) {
    return {
      ...initialGameState,
      message: "Could not start the game."
    };
  }

  return {
    ...initialGameState,
    deck: deck,
    discardPile: [firstCard],
    playerHand: playerHand,
    computerHand: computerHand,
    currentSuit: firstCard.suit,
    currentRank: firstCard.rank,
    currentTurn: "player",
    phase: "playerTurn",
    message: "Game started"
  };
}

export function canPlayCard(card, topCard, currentSuit) {
  if (!card || !topCard) {
    return false;
  }

  return (
    card.rank === "8" ||
    card.suit === currentSuit ||
    card.rank === topCard.rank
  );
}

export function refillDeckIfNeeded(state) {
  const newState = cloneState(state);

  if (newState.deck.length > 0) {
    return newState;
  }

  if (newState.discardPile.length <= 1) {
    return {
      ...newState,
      message: "No cards left to refill the draw pile."
    };
  }

  const topCard = newState.discardPile[newState.discardPile.length - 1];
  const refillCards = newState.discardPile.slice(0, -1);

  newState.deck = shuffleDeck(refillCards);
  newState.discardPile = [topCard];
  newState.message = "Draw pile refilled.";

  return newState;
}

export function drawCard(playerType, state) {
  if (playerType !== "player" && playerType !== "computer") {
    return {
      ...state,
      message: "Invalid player type."
    };
  }

  let newState = refillDeckIfNeeded(state);

  if (newState.deck.length === 0) {
    return {
      ...newState,
      message: "No card can be drawn."
    };
  }

  const handKey = getHandKey(playerType);
  const drawnCard = newState.deck.shift();

  newState[handKey].push(drawnCard);
  newState.message = playerType + " drew 1 card.";

  return newState;
}

export function playCard(playerType, cardIndex, state, chosenSuit = null) {
  if (playerType !== "player" && playerType !== "computer") {
    return {
      ...state,
      message: "Invalid player type."
    };
  }

  const newState = cloneState(state);

  if (newState.currentTurn !== playerType) {
    return {
      ...newState,
      message: "It is not this player's turn."
    };
  }

  const handKey = getHandKey(playerType);
  const hand = newState[handKey];
  const selectedCard = hand[cardIndex];
  const topCard = newState.discardPile[newState.discardPile.length - 1];

  if (!selectedCard) {
    return {
      ...newState,
      message: "Selected card was not found."
    };
  }

  if (!canPlayCard(selectedCard, topCard, newState.currentSuit)) {
    return {
      ...newState,
      message: "Invalid move."
    };
  }

  if (selectedCard.rank === "8") {
    if (!chosenSuit || !SUITS.includes(chosenSuit)) {
      return {
        ...newState,
        message: "Choose a valid suit before playing 8."
      };
    }
  }

  hand.splice(cardIndex, 1);
  newState.discardPile.push(selectedCard);
  newState.currentRank = selectedCard.rank;

  if (selectedCard.rank === "8") {
    newState.currentSuit = chosenSuit;
    newState.message =
      playerType + " played 8 and changed suit to " + chosenSuit + ".";
  } else {
    newState.currentSuit = selectedCard.suit;
    newState.message =
      playerType +
      " played " +
      selectedCard.rank +
      " of " +
      selectedCard.suit +
      ".";
  }

  newState.phase = "checkWin";

  return newState;
}

export function checkWinner(state) {
  const newState = cloneState(state);

  if (newState.playerHand.length === 0) {
    newState.winner = "player";
    newState.phase = "gameOver";
    newState.message = "Player wins!";
    return newState;
  }

  if (newState.computerHand.length === 0) {
    newState.winner = "computer";
    newState.phase = "gameOver";
    newState.message = "Computer wins!";
    return newState;
  }

  newState.phase = "checkWin";
  return newState;
}

export function switchTurn(state) {
  const newState = cloneState(state);

  if (newState.winner) {
    newState.phase = "gameOver";
    return newState;
  }

  if (newState.currentTurn === "player") {
    newState.currentTurn = "computer";
    newState.phase = "computerTurn";
  } else {
    newState.currentTurn = "player";
    newState.phase = "playerTurn";
  }

  newState.message = "Turn changed to " + newState.currentTurn + ".";

  return newState;
}