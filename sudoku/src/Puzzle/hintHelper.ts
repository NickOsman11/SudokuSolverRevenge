import Puzzle from "./puzzle"
import Square from "./square"

export default class HintHelper {
    numbers: number[];
    eliminatedNumbersMatrix: number[][][];
    puzzleMatrix: Square[][];

    constructor(
        puzzle: Puzzle
    ) {
        this.numbers = puzzle.numbers;
        this.eliminatedNumbersMatrix = this.createMatrix(this.numbers.length)
        this.puzzleMatrix = puzzle.matrix
        puzzle.numbers.forEach(i => {
            puzzle.numbers.forEach(j => {
                this.updateEliminatedNumbers(i, j, puzzle.matrix[i][j].value)
            })
        })
    }

    createMatrix(size: number): number[][][] {
        const matrix = new Array(size)
        this.numbers.forEach(i => {
            matrix[i] = new Array(size)
            this.numbers.forEach(j => {
                matrix[i][j] = []
            })
        })
        return matrix 
    }

    numberIsEliminated(row: number, col: number, value: number) {
        console.log(row, col, " eliminated")
        console.log(this.eliminatedNumbersMatrix[row][col])
        return this.eliminatedNumbersMatrix[row][col].includes(value)
    }

    addEliminatedNumber(row: number, col: number, value: number) {
        if (!this.numberIsEliminated(row, col, value)) {
            this.eliminatedNumbersMatrix[row][col].push(value)
        }
    }

    updateEliminatedNumbers(
        i: number, 
        j: number,  
        value: number
        ) {
        
        if (value === 0) {
            return
        }
        //once a number is set at a particular square, no other square
        //in that row can be set at that number
        //so that number must be added to the eliminatedNumbers of every 
        //square in that row
        //repeated for column and subgrid
        this.updateRowEliminatedNumbers(i, value)
        this.updateColEliminatedNumbers(j, value)
        this.updateSubgridEliminatedNumbers(i, j, value)
        //the square at which the number was set can no longer be set to any
        //number, so all numbers [1=>gridsize] are added to its eliminatedNumbers
        this.updateThisSquareEliminatedNumbers(i, j)
    }

    updateThisSquareEliminatedNumbers(
        row: number, 
        col: number,
        ) {
        this.numbers.forEach(n => this.addEliminatedNumber(row, col, n + 1))
    }

    updateRowEliminatedNumbers(
        row: number, 
        value: number
        ) { 
        this.numbers.forEach(j => this.addEliminatedNumber(row, j, value))
    }

    updateColEliminatedNumbers(
        col: number, 
        value: number
        ) {
        this.numbers.forEach(i => this.addEliminatedNumber(i, col, value))
    }

    updateSubgridEliminatedNumbers(
        row: number, 
        col: number, 
        value: number
        ) {
        let subgridSize = Math.sqrt(this.numbers.length)
        let rowMin = row - (row % subgridSize)
        let rowMax = rowMin + subgridSize
        let colMin = col -  col % subgridSize
        let colMax = colMin + subgridSize

        for (let i = rowMin; i < rowMax; i++){
            for (let j = colMin; j < colMax; j++){
                this.addEliminatedNumber(i, j, value)
            }
        }
    }

    getHint(): Square {

        let hints: Square[] = []
        this.numbers.forEach(i => {
            this.numbers.forEach(j => {
                this.numbers.forEach(n => {
                    if (this.checkIfNumberIsDetermined(i, j, n)) {
                        hints.push(this.puzzleMatrix[i][j])
                    }
                })
            })
        })
        return hints[Math.floor(Math.random()*hints.length)]
    }

    checkIfNumberIsDetermined(
        row: number, 
        col: number,  
        value: number) {

        return (
            !this.numberIsEliminated(row, col, value)
        && (
            this.checkIfNumberEliminatedForRestOfRow(row, col, value) 
        || this.checkIfNumberEliminatedForRestOfCol(row, col, value) 
        || this.checkIfNumberEliminatedForSubgrid(row, col, value)
        ))
    }

    checkIfNumberEliminatedForRestOfRow(
        row: number,
        col: number,
        value: number
        ) {

        let numberOfSquaresEliminated = this.numbers
            .filter(j => this.numberIsEliminated(row, j, value))
            .length
            
        return (numberOfSquaresEliminated === this.numbers.length - 1) 
    }

    checkIfNumberEliminatedForRestOfCol(
        row: number,
        col: number,
        value: number
        ) {

        let numberOfSquaresEliminated = this.numbers
            .filter(i => this.numberIsEliminated(i, col, value))
            .length
            
        return (numberOfSquaresEliminated === this.numbers.length - 1) 
    }
    
    checkIfNumberEliminatedForSubgrid(
        row: number, 
        col: number,
        value: number) {

        let numberOfSquaresEliminated = 0;
        let subgridSize = Math.sqrt(this.numbers.length);
        let rowMin = row - (row % subgridSize)
        let rowMax = rowMin + subgridSize
        let colMin = col -  col % subgridSize
        let colMax = colMin + subgridSize

        for (let i = rowMin; i < rowMax; i++){
            for (let j = colMin; j < colMax; j++){
                if (this.numberIsEliminated(i, j, value)) {
                    numberOfSquaresEliminated++
                }
            }
        }

        return (numberOfSquaresEliminated === this.numbers.length - 1) 
    }
}
