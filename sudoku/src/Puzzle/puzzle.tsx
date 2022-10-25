import GridSquare from "./square";
import HintHelper from "./hintHelper";

export default class Puzzle {
    matrixSize: number;
    matrix: GridSquare[][];
    numbers: number[];
    easyMode: boolean;
    
    constructor(easyMode: boolean, initialMatrix?: number[][], oldMatrix?: GridSquare[][]){
        this.matrixSize = 9;
        this.numbers = this.getNumbersList(); //list of numbers from [1 => gridsize]
        this.easyMode = easyMode;
        this.matrix = this.createGrid()
        if (initialMatrix) {
            this.populateGrid(initialMatrix)
        }
        else if (oldMatrix) {
            this.matrix = oldMatrix
        }
    }

    createGrid() :GridSquare[][] {

        const puzzle = new Array(this.matrixSize)
        for (let i = 0; i<this.matrixSize; i++){
            puzzle[i] = new Array(this.matrixSize)
        }
        for (let i = 0; i<this.matrixSize; i++){
            for (let j = 0; j<this.matrixSize; j++){
                puzzle[i][j] = GridSquare.at(i, j, 0)
            }
        }
        return puzzle 
    }

    populateGrid(initialGrid: number[][]) {

        this.numbers.map(i => {
            this.numbers.map(j => {
                this.setNumber(i, j, initialGrid[i][j]);
            })
        })
    }

    getNumbersList() {

        let numbersList: number[] = [];
        for (let n = 0; n<this.matrixSize; n++){
            numbersList.push(n)
        };
        return numbersList
    }
    
    numberAt(i:number, j:number) {
        return this.matrix[i][j].value
    }

    eliminatedNumbersAt(i:number, j:number) {
        return this.matrix[i][j].eliminatedNumbers
    }

    setNumber(i:number, j:number, newValue:number) {

        this.matrix[i][j].value = newValue
        if (newValue != 0 && this.easyMode){
            HintHelper.updateEliminatedNumbers(i, j, this, newValue)
        }
    }

    addEliminatedNumber(i:number, j:number, number: number) {
        this.matrix[i][j].eliminatedNumbers.push(number)
    }

    addTriedNumber(i:number, j:number, number: number) {
        this.matrix[i][j].triedNumbers.push(number)
    }

    checkIfLegalMove(i:number, j:number, number: number) {
        return !this.matrix[i][j].eliminatedNumbers.includes(number)
    }

};
