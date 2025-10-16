var player1Score;
var player2Score;
var tieAmount;

var player1Icon = "X";
var player2Icon = "O";

var ticTacToeBoard = ["","","","","","","","",""];

var currentPlayer = 1;

//when player clicks a spot, change that spot to either x or o depending if it is an open spot or not
function OnSpotClicked(thisElement)
{
    
    let thisValue = thisElement.value;
    //if tile is empty, then assign this player's value to the array and update the actual board
    
    if(GetTile(thisValue) === "")
    {
        ChangeTile(thisValue,GetPlayerIcon(currentPlayer));
        SwitchPlayerTurn();
    }
}

//used to return the players icon based on a number
function GetPlayerIcon(playerNum)
{
    if (playerNum === 1)
        return player1Icon;
    else if (playerNum === 2)
        return player2Icon;
}

function GetTile(index)
{
    return ticTacToeBoard[index];
}

function ChangeTile(index,value)
{
    ticTacToeBoard[index] = value;
    UpdateTiles();
}

//switches active players
function SwitchPlayerTurn()
{
    let activePlayerText = document.getElementById("activePlayerText");

    //if player 1, switch to 2 and update the active player text
    if (currentPlayer === 1)
    {
        currentPlayer = 2;
        activePlayerText.innerText = `Player: ${player2Icon}`;
    }
    //if player 2, switch to 1 and update the active player text
    else if (currentPlayer === 2)
    {
        currentPlayer = 1;
        activePlayerText.innerText = `Player: ${player1Icon}`;
    }
}

function UpdateTiles()
{
    let tileGrid = document.getElementsByClassName("ticTacToeTile");
    
    //for each tile, assign it with the proper value from the array
    for (let i  = 0; i < tileGrid.length; i++)
    {
        console.log(ticTacToeBoard[i]);
        tileGrid[i].innerText = ticTacToeBoard[i];
    }
}


//assign all the initial values to tiles when the page loads
function InitializeTiles()
{
    let tileGrid = document.getElementsByClassName("ticTacToeTile");
    
    //for each tile, assign it with the proper value from the array
    for (let i  = 0; i < tileGrid.length; i++)
    {
        tileGrid[i].value = i;
    }
    UpdateTiles();
}

InitializeTiles();