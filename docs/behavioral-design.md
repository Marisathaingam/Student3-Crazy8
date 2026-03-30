# Behavioral Design

## Game Initialization
The system creates and shuffles a standard deck, deals cards to both participants, and places one card on the discard pile.

## Player Turn 
The player selects a card or draws a card. The system validates the move before updating the game state.

## Computer  Turn
The computer checks all playable cards and selects one according to a simple decision rule.

## Special Card Behavior  
When an 8 is played, the system changes to suit selection behavior.

## End Game  
The game ends when one participant has no cards  remaining.