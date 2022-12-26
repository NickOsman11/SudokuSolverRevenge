export default class Square { 
    row: number;
    col: number;
    value: number;

    constructor(row: number, col: number, value: number) {
        this.row = row;
        this.col = col;
        this.value = value              //the number at that square - zero if empty
    }
}
