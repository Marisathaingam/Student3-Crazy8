# Crazy 8 FSM / EFSM

## 1. Overview
This document describes the Finite State Machine (FSM) and Extended Finite State Machine (EFSM) for the Crazy 8 game implementation. The game is designed for one human player versus one computer player.

## 2. Main States
- Setup
- PlayerTurn
- ComputerTurn
- CheckWin
- GameOver

## 3. EFSM Variables
The system uses the following variables to control transitions:

- currentSuit
- currentRank
- currentTurn
- playerHand
- computerHand
- discardPile
- deck
- winner

## 4. State Descriptions

### Setup
The system creates a standard 52-card deck, shuffles it, deals the initial cards to the player and the computer, selects the first discard card, and initializes the current suit and rank.

*Transition:*
- Setup -> PlayerTurn after successful game initialization

### PlayerTurn
The human player can either:
- play a valid card, or
- draw a card

A card is valid if:
- it matches the current suit, or
- it matches the current rank, or
- it is an 8

*Transitions:*
- PlayerTurn -> CheckWin when the player plays a valid card
- PlayerTurn -> PlayerTurn when the player selects an invalid card
- PlayerTurn -> ComputerTurn when the player draws a card and the turn ends

### ComputerTurn
The computer evaluates its hand and searches for playable cards. It selects a move according to the AI strategy:
- prefer normal playable cards first
- keep 8 for special use when possible
- draw a card if no playable card exists

*Transitions:*
- ComputerTurn -> CheckWin after the computer plays a valid card
- ComputerTurn -> PlayerTurn if the computer draws a card and no winning condition is reached

### CheckWin
The system checks whether either participant has no cards remaining.

*Transitions:*
- CheckWin -> GameOver if playerHand.length == 0 or computerHand.length == 0
- CheckWin -> PlayerTurn if no winner exists and the next turn belongs to the player
- CheckWin -> ComputerTurn if no winner exists and the next turn belongs to the computer

### GameOver
The game ends and the winner is declared.

*Transition:*
- Terminal state

## 5. Transition Conditions

### Valid Play Guard
A card can be played if:

- card.rank == "8"
- OR card.suit == currentSuit
- OR card.rank == topCard.rank

### Winner Conditions
- playerHand.length == 0 -> Player wins
- computerHand.length == 0 -> Computer wins

### Turn Switching
- If current turn is player, next turn becomes computer
- If current turn is computer, next turn becomes player

## 6. Textual FSM Flow

Setup  
-> PlayerTurn  
-> CheckWin (after valid player move)  
-> ComputerTurn (if no winner)  
-> CheckWin (after computer move)  
-> PlayerTurn / GameOver  

Also:

PlayerTurn  
-> PlayerTurn (invalid move rejected)

PlayerTurn  
-> ComputerTurn (draw action ends the turn)

ComputerTurn  
-> PlayerTurn (computer draws and turn changes)

## 7. EFSM Interpretation
This model is an EFSM because transitions depend not only on states, but also on variables such as currentSuit, currentRank, currentTurn, and the number of cards remaining in each hand.

## 8. Special Card Rule
When an 8 is played:
- the move is always valid
- the current suit changes
- for the human player, the new suit is selected by user input
- for the computer player, the new suit is selected using the suit with the highest frequency in the remaining hand