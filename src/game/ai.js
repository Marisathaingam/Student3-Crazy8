export function getPlayableCards(hand, topCard, currentSuit) {
  return hand.filter((card) => {
    return (
      card.rank === "8" ||
      card.suit === currentSuit ||
      card.rank === topCard.rank
    );
  });
}

export function chooseComputerCard(playableCards) {
  const nonEightCards = playableCards.filter((card) => card.rank !== "8");

  if (nonEightCards.length > 0) {
    return nonEightCards[0];
  }

  return playableCards[0] || null;
}

export function chooseBestSuit(hand) {
  const suitCount = {
    Hearts: 0,
    Diamonds: 0,
    Clubs: 0,
    Spades: 0
  };

  for (const card of hand) {
    suitCount[card.suit]++;
  }

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