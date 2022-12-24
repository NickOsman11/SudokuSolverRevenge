import Square from "./square";

export default class Puzzle {
    matrixSize: number;
    matrix: Square[][];
    numbers: number[];
    
    constructor(
        initialMatrix?: number[][], 
        oldMatrix?: Square[][]
        //I wish you could overload constructors in JS - sometimes we need to create a new puzzle (at the beginning of the game),
        //and sometimes we're just creating a copy of an old puzzle. This way of doing it seems messy and I would appreciate feedback
        //on how to improve it
    ) {

        this.matrixSize = 9;
        this.numbers = this.getNumbersList();       //list of numbers from [0 => (n-1)] for iterating over
        this.matrix = this.createMatrix()          
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
