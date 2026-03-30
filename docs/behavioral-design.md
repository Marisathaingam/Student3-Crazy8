# Behavioral Design

## 1. Introduction
This section describes the behavioral design of the Crazy 8 game system. The implementation supports one human player versus one computer player and focuses on game state changes, move validation, turn handling, winner detection, and computer decision-making.

## 2. Game Initialization Behavior
When a new game starts, the system creates a standard 52-card deck and shuffles it randomly. It then deals the initial cards to both participants. After dealing, the system places one card on the discard pile and sets the current suit and current rank according to that card. The first active turn is assigned to the human player.

If the initial discard card is an 8, the system avoids using it as the starting discard card and selects another card to maintain a clearer initial game state.

## 3. Player Turn Behavior
During the player’s turn, the system allows the player to choose one of two actions: play a card or draw a card.

When the player selects a card, the system validates the move using the following rules:
- the selected card matches the current suit, or
- the selected card matches the current rank, or
- the selected card is an 8

If the selected card is valid, the system removes it from the player’s hand, places it onto the discard pile, updates the current rank, and updates the current suit. If the selected card is an 8, the system changes the current suit according to the suit chosen by the player.

If the selected card is invalid, the system rejects the move and keeps the player in the same turn state.

## 4. Draw Behavior
If a participant cannot or does not play a card, the system performs a draw action. One card is taken from the draw pile and added to the participant’s hand.

If the draw pile becomes empty, the system refills it by reshuffling the discard pile except for the top discard card. This preserves the visible game context while allowing play to continue.

After drawing, the system updates the hand size and the game message. In the current implementation, drawing ends the active turn and control passes to the other participant.

## 5. Computer Turn Behavior
During the computer’s turn, the system first retrieves all playable cards from the computer’s hand. This is done using the same validation rules applied to the human player.

The computer then selects a move according to a simple strategy:
- if a normal playable card exists, it is chosen first
- if no normal playable card exists but an 8 exists, the 8 is selected
- if no playable card exists, the computer draws one card

This strategy is designed to keep the implementation simple, deterministic, and easy to explain in the system design documentation.

## 6. Special Card Behavior
The card 8 is treated as a wildcard. It can be played regardless of the current suit or rank.

When the human player uses an 8, the system requires the player to provide a new suit before the move is completed.

When the computer uses an 8, the system analyzes the remaining cards in the computer’s hand and chooses the suit that appears most frequently. This increases the chance of having a playable move in the following turns.

## 7. Winner Detection Behavior
After every successful play, the system checks whether either participant has no cards remaining.

If the player’s hand becomes empty, the player is declared the winner.

If the computer’s hand becomes empty, the computer is declared the winner.

Once a winner is found, the system changes the phase to gameOver and stops normal turn switching.

## 8. Turn Management Behavior
If no winner exists after an action, the system changes the turn to the opposite participant. The phase is updated accordingly:
- playerTurn for the human player
- computerTurn for the computer player

This mechanism ensures that the game progresses in a controlled and predictable sequence.

## 9. Behavioral Summary
The behavior of the Crazy 8 system is centered around four key ideas:
- validating moves according to game rules
- updating the game state after each action
- detecting end-game conditions
- enabling automated decision-making for the computer player

The implemented behavior is intentionally simple and structured so that it can be clearly mapped to both the FSM/EFSM model and the source code.