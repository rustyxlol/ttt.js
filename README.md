<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://en.wikipedia.org/wiki/Tic-tac-toe" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/3/32/Tic_tac_toe.svg" alt="Tic-tac-toe" width="200" height="200"/> </a> 
  </a>


  <h3 align="center">Tic-tac-toe</h3>

  <p align="center">
    An optimal solution
    <br />
    <br />
    <a href="https://rustyxlol.github.io/repo/">View Demo</a>
    ·
    <a href="https://github.com/rustyxlol/repo/issues">Report Bug</a>
    ·
    <a href="https://github.com/rustyxlol/repo/issues">Request Feature</a>
  </p>
</p>



# Tic-tac-toe

Tic-tac-toe, is a turn-based paper-and-pencil game played on a 3x3 grid for two players (an AI in this case), denoted by X and O. Either can go first(decided by the user). In order to win, either player must establish three consecutive marks vertically, horizontally or diagonally.

## Description 

A player can play a perfect game of tic-tac-toe (to win or at least draw) if, each time it is their turn to play, they choose the first available move from the following list, as used in Newell and Simon's 1972 tic-tac-toe program.

### Strategy: 

A player can play a perfect game of tic-tac-toe (to win or at least draw) if, each time it is their turn to play, they choose the first available move from the following list, as used in Newell and Simon's 1972 tic-tac-toe program.

1. Win: If the player has two in a row, they can place a third to get three in a row.
2. Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.
3. Fork: Cause a scenario where the player has two ways to win (two non-blocked lines of 2).
4. Blocking an opponent's fork: If there is only one possible fork for the opponent, the player should block it. Otherwise, the player should block all forks in any way that simultaneously allows them to make two in a row. Otherwise, the player should make a two in a row to force the opponent into defending, as long as it does not result in them producing a fork. For example, if "X" has two opposite corners and "O" has the center, "O" must not play a corner move to win. (Playing a corner move in this scenario produces a fork for "X" to win.)
5. Center: A player marks the center. (If it is the first move of the game, playing a corner move gives the second player more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
6. Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
7. Empty corner: The player plays in a corner square.
8. Empty side: The player plays in a middle square on any of the four sides.   

Check out the implementation by [WesleyyC](https://github.com/WesleyyC/Tic-Tac-Toe).   

The implementation seems simple enough, defining 8 different functions and checking every single one of them in order to determine the next position of the AI.   
However, it's not the optimal approach, it works perfectly on paper but machines don't see it that way.

Luckily, minimax algorithm exists which is machine-friendly and won't require defining 8 different functions in addition to the existing ones.

### How does it work?

Minimax is a recursive decision-making algorithm which decides an optimal move for a player assuming that the opponent is also making optimal moves.

<a href="https://en.wikipedia.org/wiki/File:Minimax.svg" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Minimax.svg" alt="Minimax Algorithm"/> </a>

Consider this example of a turn-based game where the rows alternate between the two players, named Max(circle) and Min(square).   
Minmax algorithm begins and leaf nodes are assigned a value based on a function.  

Max's objective is to find the maxmium value from it's immediate children and Min's objective is to find the minimum value from it's immediate children.

### Minimax Algorithm
#### Pseudocode
```
function minimax(position, depth, maximizingPlayer) is
    if depth = 0 or game over in position
        return the static evaluation of position

    if maximizingPlayer then
        maxValue = −∞
        for each child of position do
            value =  minimax(child, depth − 1, FALSE)
            maxValue = max(maxValue, value);
        return maxValue

    else (minimizing player)
        minValue = +∞
        for each child of position do
            value = minimax(child, depth − 1, TRUE)
            minValue = min(minValue, value)
        return minValue
```

### Further improvement
The algorithm can be optimized further by utilizing Alpha-beata pruning - A search algorithm where unnecessary nodes are skipped.
#### Pseudocode - with Alpha-Beta pruning
```
function minimax(position, depth, alpha, beta, maximizingPlayer) is
    if depth = 0 or game over in position
        return the static evaluation of position

    if maximizingPlayer then
        maxValue = −∞
        for each child of position do
            value =  minimax(child, depth − 1, alpha, beta, FALSE)
            maxValue = max(maxValue, value);
            alpha = max(alpha, value)
            if beta <= alpha then
                break
        return maxValue

    else (minimizing player)
        minValue = +∞
        for each child of position do
            value = minimax(child, depth − 1, alpha, beta, TRUE)
            minValue = min(minValue, value)
            beta = min(beta, value)
        return minValue
```
#### Built With

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a>
<a href="https://www.w3.org/html/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="html5" width="30" height="30"/> </a> 
<a href="https://www.w3schools.com/css/" target="_blank"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="css3" width="30" height="30"/> </a> 

## Roadmap

See the [open issues](https://github.com/rustyxlol/repo/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/yourFeature`)
3. Commit your Changes (`git commit -m 'Added yourFeature'`)
4. Push to the Branch (`git push origin feature/yourFeature`)
5. Open a Pull Request


## License

Distributed under the MIT License. See `LICENSE` for more information.
