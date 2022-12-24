import Square from "./square";

export default class Puzzle {
    matrixSize: number;
    matrix: Square[][];
    numbers: number[];
    easyMode: boolean;
    
    constructor(
        easyMode: boolean, 
        initialMatrix?: number[][], 
        oldMatrix?: Square[][]
    ) {

        this.matrixSize = 9;
        this.numbers = this.getNumbersList();       //list of numbers from [0 => (n-1)] for iterating over
        this.easyMode = easyMode;
        this.matrix = this.createMatrix()           //creates n x n matrix of Squares
        if (initialMatrix) {
            this.setInitialNumbers(initialMatrix)   
        }
        else if (oldMatrix) {                        
            this.matrix = oldMatrix             
        }
    }

    createMatrix(): Square[][] {      

        const matrix = new Array(this.matrixSize)
        this.numbers.forEach(i => {
            matrix[i] = new Array(this.matrixSize)
            this.numbers.forEach(j => {
                matrix[i][j] = new Square(i, j, 0)
            })
        })
        return matrix     
    }

    setInitialNumbers(initialGrid: number[][]) {

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

    setNumber(i:number, j:number, newValue:number) {
        this.matrix[i][j].value = newValue
    }

    addTriedNumber(i:number, j:number, number: number) {
        if (this.numberAt(i, j) !== number){
            this.matrix[i][j].triedNumbers.push(number)
        }
    }
};
