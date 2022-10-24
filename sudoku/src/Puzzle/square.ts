export default class GridSquare { 
    i: number;
    j: number;
    value: number;
    eliminatedNumbers: number[];

    constructor(row: number, col: number, value: number) {
        this.i = row;
        this.j = col;
        this.value = value //the number at that square - zero if empty
        this.eliminatedNumbers = [] //a list of all the numbers that cannot
                                    //be at that square
    }

    static at(row: number, col: number, number: number){
        return new GridSquare(row, col, number)
    }
}