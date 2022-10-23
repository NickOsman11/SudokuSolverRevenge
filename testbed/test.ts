let puzzle = [
    [0,0,8,0,0,0,5,0,0],
    [6,0,0,7,0,5,0,0,3],
    [0,9,0,8,3,2,0,0,0],
    [0,0,4,0,1,0,0,0,0],
    [3,8,0,4,0,7,0,5,1],
    [0,0,0,0,8,0,2,0,0],
    [0,0,0,1,5,9,0,7,0],
    [8,0,0,3,0,4,0,0,5],
    [0,0,9,0,0,0,1,0,0]
]

const gridSize = 9
let numbers = []

for (let i = 0; i<gridSize; i++) {
    numbers.push(i)
}

function newGame(){    
    const newPuzzle = numbers.map(row => {
        return numbers.map(col => {
            return {
                coordinates: [row, col],
                value: puzzle[row][col],
                eliminatedNumbers: [],
            }
        })
    })
    console.log(newPuzzle);
}

newGame()
