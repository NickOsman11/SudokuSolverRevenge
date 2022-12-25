# SudokuSolverRevenge

A web application to help beginners to learn to play sudoku!

To install the dependencies, run 
npm install

To run the programme, run 
npm run dev

A beginner's guide to the rules: https://sudoku.com/sudoku-rules/

When playing with Easy Mode enabled, you will not be able to enter a number on the grid unless
you have enough information available to you to know for sure that it belongs there. If you try
to enter a number without sufficient information (that may be correct or incorrect), 
nothing will happen. If you try to enter a number that you have enough information to know for
sure is wrong, that number will disappear from the numpad, and you won't be able to guess it again.

Sometimes in Sudoku, you reach a point where you don't have enough information to be able to make
any certain moves. In these cases, you have to make a speculative move, and see if it leads you to 
a contradiction - in which case you would have to go back and instead make a different move. If you 
press the hint button when no certain moves are open to you, you'll get a message telling you so - 
and you can turn off easy mode and make a legal but uncertain move, and see where it leads you.
