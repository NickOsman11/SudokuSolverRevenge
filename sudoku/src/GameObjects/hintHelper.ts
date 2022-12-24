import Puzzle from "./puzzle"
import Square from "./square"

export default class HintHelper {
    matrixSize: number;
    numbers: number[];
    eliminatedNumbersMatrix: number[][][];  // a matrix of arrays, each array storing the numbers that are eliminated for that square
    determinedSquares: Square[];

    constructor(
        puzzle: Puzzle
    ) {
        this.matrixSize = puzzle.matrixSize;
        this.numbers = puzzle.numbers;
        this.eliminatedNumbersMatrix = this.createMatrix();
        this.populateEliminatedNumbersMatrix(puzzle)                                 
        this.determinedSquares = this.findAllDeterminedSquares(puzzle)
    }

    checkIfMoveCorrect(     //checks that the attempted move is in the list of determined moves
        row: number,
        col: number,
        number: number,
    ) {
        return this.determinedSquares.some(s => (s.row === row && s.col === col && s.value === number))
    }

    getHint(): Square {         
        return this.determinedSquares[Math.floor(Math.random()*this.determinedSquares.length)]
    }

    checkIfNumberEliminated(row: number, col: number, value: number) {
        return this.eliminatedNumbersMatrix[row][col].includes(value)
    }

    createMatrix(): number[][][] {
        const matrix = new Array(this.matrixSize)
        this.numbers.forEach(i => {
            matrix[i] = new Array(this.matrixSize)
            this.numbers.forEach(j => {
                matrix[i][j] = []
            })
        })
        return matrix 
    }

    populateEliminatedNumbersMatrix(puzzle: Puzzle) {
        this.numbers.forEach(i => {
            this.numbers.forEach(j => {
                this.updateEliminatedNumbers(i, j, puzzle.matrix[i][j].value)
            })
        })
    }

    findAllDeterminedSquares(puzzle: Puzzle): Square[] {  
        
        let determinedSquares: Square[] = []
        //A square S is determined under two conditions:
        //1 - if all other numbers are eliminated for S, then S must contain the remaining number
        //2 - if all other squares in S's row/col/subgrid cannot contain a given number, then S must contain that number
        this.numbers.forEach(i => {
            this.numbers.forEach(j => {             //for each square:
                if (puzzle.numberAt(i, j) === 0) {  //check it's not already filled in
                    if (this.eliminatedNumbersMatrix[i][j].length === this.numbers.length - 1){              //condition 1
                        let number = this.numbers.find(n => !this.eliminatedNumbersMatrix[i][j].includes(n)) //find the only number not eliminated
                        determinedSquares.push(new Square(i, j, number!))                                    //add hint to list
                    } 
                    else {
                        this.numbers.forEach(n => {                             //for each number:
                            if (this.checkNumberCantGoAnywhereElse(i, j, n)) {  //condition 2
                                determinedSquares.push(new Square(i, j, n))
                            }
                        })
                    } 
                }                                                     
            })
        })
        return determinedSquares
    }

    addEliminatedNumber(row: number, col: number, value: number) {
        if (!this.checkIfNumberEliminated(row, col, value)) {   //as we use the length of the eliminated numbers array to check how many numbers have been eliminated,
            this.eliminatedNumbersMatrix[row][col].push(value)  //we must avoid duplicates
        }
    }

    updateEliminatedNumbers(
        row: number, 
        col: number,  
        value: number
    ) {
        
        if (value === 0) {
            return
        }
        //once a number is set at a particular square, no other square
        //in that row can be set at that number
        //so that number must be added to the eliminatedNumbers of every 
        //square in that row
        this.numbers.forEach(j => this.addEliminatedNumber(row, j, value))
        //repeated for column
        this.numbers.forEach(i => this.addEliminatedNumber(i, col, value))
        //and subgrid
        this.updateSubgridEliminatedNumbers(row, col, value)
        //the square at which the number was set can no longer be set to any other
        //number, so all numbers [1=>gridsize] are added to its eliminatedNumbers
        this.numbers.forEach(n => this.addEliminatedNumber(row, col, n + 1))
    }

    updateSubgridEliminatedNumbers(      //eliminates a given number for every square in a (root n x root n) subgrid
        row: number, 
        col: number, 
        value: number
    ) {
        let subgridSize = Math.sqrt(this.numbers.length)
        let rowMin = row - (row % subgridSize)
        let rowMax = rowMin + subgridSize
        let colMin = col -  col % subgridSize
        let colMax = colMin + subgridSize        // boundries of subgrid

        for (let i = rowMin; i < rowMax; i++){
            for (let j = colMin; j < colMax; j++){
                this.addEliminatedNumber(i, j, value)
            }
        }
    }

    checkNumberCantGoAnywhereElse(
        row: number, 
        col: number,  
        value: number
    ) {

        return (
            !this.checkIfNumberEliminated(row, col, value)      
        && (
            this.checkIfNumberEliminatedForRestOfRow(row, value) 
            || this.checkIfNumberEliminatedForRestOfCol(col, value) 
            || this.checkIfNumberEliminatedForSubgrid(row, col, value)
        ))
    }

    checkIfNumberEliminatedForRestOfRow(
        row: number,
        value: number
    ) {

        let numberOfSquaresEliminated = this.numbers
            .filter(j => this.checkIfNumberEliminated(row, j, value))
            .length
            
        return (numberOfSquaresEliminated === this.numbers.length - 1) 
    }

    checkIfNumberEliminatedForRestOfCol(
        col: number,
        value: number
    ) {

        let numberOfSquaresEliminated = this.numbers
            .filter(i => this.checkIfNumberEliminated(i, col, value))
            .length
            
        return (numberOfSquaresEliminated === this.numbers.length - 1) 
    }
    
    checkIfNumberEliminatedForSubgrid(
        row: number, 
        col: number,
        value: number
    ) {

        let numberOfSquaresEliminated = 0;
        let subgridSize = Math.sqrt(this.numbers.length);
        let rowMin = row - (row % subgridSize)
        let rowMax = rowMin + subgridSize
        let colMin = col -  col % subgridSize
        let colMax = colMin + subgridSize       

        for (let i = rowMin; i < rowMax; i++){
            for (let j = colMin; j < colMax; j++){
                if (this.checkIfNumberEliminated(i, j, value)) {
                    numberOfSquaresEliminated++
                }
            }
        }

        return (numberOfSquaresEliminated === this.numbers.length - 1) 
    }
}
