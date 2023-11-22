
/*
1) we will analyse the game
- There is a 3x3 grid of cells so 9 cells in total
- in these cells can be x , o or they can be empty




2) we will create data
- Create x and o players
- create a 2 dimentional array with cells

[
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
]
-winning combinations
Col, Row = (0,0), (1,0), (2,0)
[{row: 0 , col: 0},{row: 1, col: 0 },{row: 2, col: 0 } ]
        Colmuns
[     0 ,  1   , 2
    ["x", "x", "x"], 0
    ["", "", ""],    1   Rows
    ["", "", ""],    2
]
[
    ["x", "", ""],
    ["", "x", ""],
    ["", "", "x"],
]
[
    ["", "", ""],
    ["", "", ""],
    ["x", "x", "x"],
]

3) we will build the logic
- create a grid of empty cells based on the data

*/
const app = new PIXI.Application({
    width: 800,
    height: 800,
    backgroundColor: 0xc2c2c2, // rgb 0, f
    view: document.getElementById('canvas')
}); 


const assetsMap = {
    sprites: [
        { name: 'cell-backgroud', url: './Assets/cell.png' },
        { name: 'x-value', url: './Assets/x.png' },
        { name: 'o-value', url: './Assets/o.png' },
        { name: 'explosion', url: './Assets/explosion.png' },
    ]
}




const winnerCombinations = [
    [{ row: 0, col: 0} , { row: 0, col: 1}, { row: 0, col: 2}],
	[{ row: 1, col: 0} , { row: 1, col: 1}, { row: 1, col: 2}],
	[{ row: 2, col: 0} , { row: 2, col: 1}, { row: 2, col: 2}],
	[{ row: 0, col: 0} , { row: 1, col: 0}, { row: 2, col: 0}],
	[{ row: 0, col: 1} , { row: 1, col: 1}, { row: 2, col: 1}],
	[{ row: 0, col: 2} , { row: 1, col: 2}, { row: 2, col: 2}],
	[{ row: 0, col: 0} , { row: 1, col: 1}, { row: 2, col: 2}],
	[{ row: 0, col: 2} , { row: 1, col: 1}, { row: 2, col: 0}]

]

function createGrid(sprites, width, height, cellWidth, cellHeight, onCellClickCb){
    for (let col = 0; col < width; col++) {
        for (let row = 0; row < height; row++) {
           
            // create sprite
            const cellTexture = PIXI.Texture.from('cell-backgroud');
            const cellSprite = new PIXI.Sprite(cellTexture);
            cellSprite.width = cellWidth;
            cellSprite.height = cellHeight;
            // set its positions X, Y positions
            // let's calcualte X postion
            const x = cellWidth * col;
           
            // let's calcualte Y postion
            const y = cellHeight * row;

            cellSprite.position.set(x, y);
            // add it to the stage
            app.stage.addChild(cellSprite);

            cellSprite.interactive = true;
            cellSprite.addListener("click", function() {
                onCellClickCb(col, row);
            } );

            sprites[row][col] = cellSprite;
        }
    }
}

function runGame() {
   
    const playerOne = 'x';
    const playerTwo = 'o';
    const gridWidth = 3;
    const gridHeight = 3;
    const cellWidth = 60; // size of an image
    const cellHeight = 60; // size of an image
    const grid = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    const sprites = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    let currentPlayer = playerOne;

    /*
    - the game starts [DONE]
    // Gameplay loop
    - player has x or o value [DONE]
    - whenver onclick happens [DONE]
        if cell is empty [DONE]
            the x or o value gets populated  [HW] in the grid and create a sprite with X or O image and add it to the stage [DONE]

            - if x or o will be filled in 3 in a row then is a win condition [HW]
        else 
            do nothing
    - the turn goes to another player {DONE}
    - repeat steps
    */

    function isGridCellEmpty(col, row){
        const cellValue = grid[row][col]

        if(cellValue === "") {
            return true;
        } else {
            return false;
        }
    }

    function createCellSprite (col, row, width, height, textureName) {
        
        const xTexture = PIXI.Texture.from(textureName);
        const xSprite = new PIXI.Sprite(xTexture);

        const x = width * col;
        const y = height * row;
        
        xSprite.position.set(x, y);

        app.stage.addChild(xSprite);
    }

    function populateGridValue(col, row, value) {
        grid[row][col] = value
    }
    function processUserClick(col, row, exSprite) {
        const currentSymbol = currentPlayer;

       if (isGridCellEmpty(col, row)) {
        const textureName = currentPlayer + '-value';
        createCellSprite(col, row, cellWidth, cellHeight, textureName)
        populateGridValue(col, row, currentPlayer)


        for (let i = 0; i < winnerCombinations.length; i++){
            const rowWithCombination = winnerCombinations[i];
            let counter = 0;
            for (let j= 0; j < rowWithCombination.length; j++){
                const rowCell = rowWithCombination[j]
                const value = grid[rowCell.row][rowCell.col];
                if(value === currentPlayer) {
                    counter += 1;
                }
            } 

            if(counter === 3) {


                sprites.forEach(function(row) {
                    row.forEach(function(cellSprite) {
                            cellSprite.removeAllListeners()
                    })
                })
                const exTexture = PIXI.Texture.from('explosion');
                const exSprite = new PIXI.Sprite(exTexture);
                app.stage.addChild(exSprite);
                exSprite.position.set(250, 200);
                function increaseSize(){
                    exSprite.width += 5;
                    exSprite.height += 5;
                } 
                setInterval(increaseSize, 1)
                setTimout(function(){        clearInterval()        
                    conts message = currentPlayer + " Has Won!!!"
                let text = new PIXI.Text(message,{
                    "dropShadow": true,
                    "dropShadowColor": "#665c5c", 
                    "fontSize": 50
                });
                app.stage.addChild(text);
                text.position.set(400, 400);}, 5000)
                setTimeout(function() {
                    app.stage.removeChildren();
                    runGame();
                }, 6000)
                
                // return;
                // think of how we can stop the game for some time and then restart it again [DONE]
                // read about setTimout [DONE]
                // read on the internet how to diable PIXI ineractivity [DONE]
            }
        }

        // [HW] If there are no win conditions and the grid is full then restart the game because there is a ti
        // [HW] use the grid to check the values. If there is not empty values left ("") then there is not winner
        // [HW] show the message that there is a tie and restart the game

        

       }





        if(currentPlayer === playerOne) {
            currentPlayer = playerTwo
        } else {
            currentPlayer = playerOne
        }
    }


    createGrid(sprites, gridWidth, gridHeight, cellWidth, cellHeight, processUserClick)





}

app.loader.add(assetsMap.sprites); 
app.loader.load(runGame)

window.STAGE = app.stage;