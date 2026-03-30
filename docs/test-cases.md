# Test Cases

## Core Game Logic
1. Create deck -> expected result: 52 cards
2. Shuffle deck -> expected result: 52 cards after shuffle
3. Start game -> expected result: player hand = 5, computer hand = 5, discard pile = 1, deck = 41
4. Valid move by suit -> expected result: accepted
5. Valid move by rank -> expected result: accepted
6. Valid move by 8 -> expected result: accepted
7. Invalid move -> expected result: rejected
8. Draw card -> expected result: hand size +1, deck size -1
9. Player wins -> expected result: winner = player
10. Computer wins -> expected result: winner = computer
11. Switch turn from player -> expected result: computerTurn
12. Switch turn from computer -> expected result: playerTurn

## AI Logic
13. Get playable cards -> expected result: only valid cards returned
14. Choose computer card -> expected result: normal playable card preferred over 8
15. Choose best suit -> expected result: suit with highest frequency selected
16. Computer valid move -> expected result: card played, turn switches to player
