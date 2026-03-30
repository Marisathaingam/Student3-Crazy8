# Student 3 Handoff Note

## Main Files
- src/game/gameEngine.js
- src/game/ai-final.js
- src/game/constants.js
- src/game/gameState.js

## Test Files
- src/game/student3-test.html
- src/student3-ai-test.html

## What is implemented
- createDeck
- shuffleDeck
- startGame
- canPlayCard
- drawCard
- playCard
- checkWinner
- switchTurn
- getPlayableCards
- chooseComputerCard
- chooseBestSuit
- computerMove

## Current AI File
The current working AI file is:
- src/game/ai-final.js

## Notes for integration
- The frontend should call the game logic functions from gameEngine.js
- The AI logic should be imported from ai-final.js
- The current implementation supports 1 player vs 1 computer