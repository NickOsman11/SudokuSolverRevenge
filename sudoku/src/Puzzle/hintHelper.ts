import Puzzle from "./puzzle"
import GridSquare from "./square"

export default class HintHelper {

    static getHint(puzzle: Puzzle): GridSquare {

        let hints: GridSquare[] = []
        puzzle.numbers.forEach(row => {
            puzzle.numbers.forEach(col => {
                puzzle.numbers.forEach(n => {
                    console.log(this.checkIfNumberIsDetermined(row, col, puzzle, n))
                    if ( this.checkIfNumberIsDetermined(row, col, puzzle, n)) {
                        hints.push(puzzle.matrix[row][col])
                    }
                })
            })
        })
        return hints[Math.floor(Math.random()*hints.length)]
    }

    static updateEliminatedNumbers(i: number ,j: number, grid:Puzzle, numberJustSet:number){

        //once a number is set at a particular square, no other square
        //in that row can be set at that number
        //so that number must be added to the eliminatedNumbers of every 
        //square in that row
        //repeated for column and subgrid
        this.updateRowEliminatedNumbers(i, j, grid, numberJustSet)
        this.updateColEliminatedNumbers(i, j, grid, numberJustSet)
        this.updateSubgridEliminatedNumbers(i, j, grid, numberJustSet)
        //the square at which the number was set can no longer be set to any
        //number, so all numbers [1=>gridsize] are added to its eliminatedNumbers
        this.updateThisSquareEliminatedNumbers(i, j, grid)
    }

    static updateThisSquareEliminatedNumbers(i: number, j: number, grid: Puzzle){

        grid.numbers.forEach(n =>{
            if (!grid.eliminatedNumbersAt(i, j).includes(n + 1)){
                grid.addEliminatedNumber(i, j, n + 1)
            }
        })
    }

    static updateRowEliminatedNumbers(i: number, j: number, grid: Puzzle, numberJustSet:number){ 

        grid.matrix[i].forEach(square => {
            if (!(square.eliminatedNumbers.includes(numberJustSet))){
                square.eliminatedNumbers.push(numberJustSet)
            }
        })
    }

    static updateColEliminatedNumbers(i: number, j: number, grid: Puzzle, numberJustSet: number){

        for (let row = 0; row < grid.matrixSize; row ++){
            if ( ! (grid.eliminatedNumbersAt(row, j).includes(numberJustSet))){
                grid.addEliminatedNumber(row, j, numberJustSet)
            }
        }
    }

    static updateSubgridEliminatedNumbers(i: number, j: number, grid: Puzzle, numberJustSet: number){

        let subgridSize = Math.sqrt(grid.matrixSize)
        for (let row = i - i%subgridSize; row < (i - i%subgridSize) + subgridSize; row++){
            for (let col = j -  j%subgridSize; col < (j - j%subgridSize) + subgridSize; col++){
                if ( ! (grid.eliminatedNumbersAt(row, col).includes(numberJustSet))){
                    grid.addEliminatedNumber(row, col, numberJustSet)
                }
            }
        }
    }

    static checkIfNumberIsDetermined(i: number, j: number, grid: Puzzle, n: number) {

        return (!grid.matrix[i][j].eliminatedNumbers.includes(n) &&
            (this.checkIfNumberEliminatedForRestOfRow(i, j, grid, n) ||
            this.checkIfNumberEliminatedForRestOfCol(i, j, grid, n) ||
            this.checkIfNumberEliminatedForSubgrid(i, j, grid, n)))
    }

    static checkIfNumberEliminatedForRestOfRow(i: number, j: number,
        grid: Puzzle, n: number){

        let numberOfSquaresEliminated = 0
        for (let col = 0; col < grid.matrixSize; col++) {
            if (col != j && grid.eliminatedNumbersAt(i, col).includes(n)) {
                numberOfSquaresEliminated++
            }
        }
        return (numberOfSquaresEliminated === grid.matrixSize - 1) 
    }

    static checkIfNumberEliminatedForRestOfCol(i: number, j: number,
        grid: Puzzle, n: number){

        let numberOfSquaresEliminated = 0
        for (let row = 0; row < grid.matrixSize; row ++){
            if (row != i && grid.eliminatedNumbersAt(row, j).includes(n)){   
                numberOfSquaresEliminated ++
            }
        }
        return (numberOfSquaresEliminated === grid.matrixSize - 1) 
    }
    
    static checkIfNumberEliminatedForSubgrid(i: number, j: number,
        grid: Puzzle, n: number) {

        let numberOfSquaresEliminated = 0;
        let subgridSize = Math.sqrt(grid.matrixSize);

        for (let row = i - i % subgridSize; row < (i - i % subgridSize) + subgridSize; row++) {
            for (let col = j - j % subgridSize; col < (j - j % subgridSize) + subgridSize; col++) {
                if (!(row === i && col === j)) {
                    if (grid.eliminatedNumbersAt(row, col).includes(n)) {
                        numberOfSquaresEliminated++
                    }
                }
            }
        }
        return (numberOfSquaresEliminated === grid.matrixSize - 1) 
    }
}
