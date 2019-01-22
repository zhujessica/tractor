# tractor

This is the game of tractor.

## Rules of the Game

### Terms:
* Banker: player who receives extra cards from the deck and is able to swap out those 
extra cards for other cards from his hand.
* On deck: refers to a player on the team where one of the players on the team is the 
banker.
* I'll refer to cards by rank and suit, in short hand. e.g. 5S = 5 of spades

### Gameplay

1. To win the entire game, a player must raise his level to Aces, and win a round where he
is on deck.

2. A player's level goes up if he is on deck and prevents the other team from getting 
a certain amount of points that round. For typical 4-5 people games with 2 decks, that 
value is 80 points.

3. If a team is on deck and they prevent the other team from getting 80 points, the 
team on deck increases their level by 1. If the team on deck prevents the other team from
getting 40 points, they increase their level by 2. For every 40 points below 80 points,
the number of levels the on deck team increases by 1. If the team not on deck gets over
80 points, they become on deck in the next round. For every increment of 40 points that 
they score over 80 points, their level increases by 1. e.g. If the team not on deck gets 
125 points, they switch bankership and increase their level by 1.

### Drawing

During this phase, players will decide the trump suit. The trump card level is decided by
the level of the player that is set to be banker. The first person to put down a 
card with the trump number on it sets the suit to be the suit of that card. Another player
can overturn the suit by putting down a pair of cards with the trump rank. The trump suit
then becomes the suit of the pair. The first player can "reinforce" his choice by 
changing his single card to a pair, but a player cannot overturn his own trump suit 
choice. A pair of jokers (both small or both big) overturns the trump suit to no trump.

In the very first round, every player starts with a level of 2. However, since the banker
has not yet been chosen, bankership goes to whoever decides the suit in the first round.
Afterwards, if the team on deck wins, bankership transfers to the next player on the team.
Otherwise, bankership transfers to the next player on the other team.

### Points

To earn points, a team must win a round containing cards that have point value. Cards
with a rank of 5 are worth 5 points, and cards with a rank of 10 and King are worth 
10 points. In each round, the player that plays the highest single or combination of
cards wins the round and all of the points in the round. If there are two players playing
the same valued card, the player who played it first has the higher value. 

### Combinations

At the start of each round, a player may either play a single card, some number of 
consecutive doubles, or a lead, which is a combination of single and double cards. 

TODO: add in rules for 3 or more decks

A player can start off with any single card in their hand. 

For doubles, they must play the exact same card to qualify as a double. For consecutive 
doubles, or tractors, a player must play two or more doubles that have consecutive values.
For example,
* 3S 3S 4S 4S if 2s are trump
* 3S 3S 5S 5S if 4s are trump
* AS AS 2H 2H if 2s and spades are trump
* 2D 2D 2S 2S if 2s and spades are trump
* 5S 5S 6S 6S 7S 7S if 10s are trump

A lead involves playing a set of cards that is the highest set of cards in that suit. 
For example, 
* AS AS KS if hearts are trump
* AS KS KS if hearts are trump
* KS QS 10S 10S 8S 8S 3S 3S if both AS, one KS have been played, Spades is not trump, 2s
are trump, and no one has any pairs in spades higher than 3S 3S
Incorrect leads are a penalty of 10 points per incorrect card, and the player must play
the card in their lead. In the third point above, if the lead was incorrect because 
someone had a 4S 4S pair, the player must play a 3S, and will lose 20 points for the 
incorrect 3S 3S pair.


Note: rules are based off of 
https://en.wikipedia.org/wiki/Sheng_ji
with some other specifications listed above.


## Node Setup Linux

1. Install Node Version Manager (NVM)
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash

2. Install Latest Version of Node
nvm install node

## Code Running Instructions

1. Running Node Server
npm install  (install project dependencies)
node app.js   (run node server)
view at "localhost:port"; current port is 3000 so go to "localhost:3000"

2. Running Test Cases
npm test     (runs all tests in 'test/' folder)


