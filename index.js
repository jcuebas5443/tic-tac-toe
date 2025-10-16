var player1Score;
var player2Score;
var tieAmount;

var player1Icon = "X";
var player2Icon = "O";

var ticTacToeBoard = ["","","","","","","","",""];

var currentPlayer = 1;

var winner;

//when player clicks a spot, change that spot to either x or o depending if it is an open spot or not
function OnSpotClicked(thisElement)
{
    
    let thisValue = thisElement.value;
    //if tile is empty, then assign this player's value to the array and update the actual board
    
    if(GetTile(thisValue) === "")
    {
        ChangeTile(thisValue,GetPlayerIcon(currentPlayer));
        CheckForWin();
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

//check for wins function (check if indices are the same, if none, then tie)
//horizontal:
//if 0, 1, 2
//if 3, 4, 5
//if 6, 7, 8

//vertical:
//if 0, 3, 6
//if 1, 4, 7
//if 2, 5, 8

//diagonal
//if 0, 4, 8
//if 2, 4, 6
function CheckForWin()
{
    
    if(
        CheckTileSequence(0, 1, 2) === true ||
        CheckTileSequence(3, 4, 5) === true ||
        CheckTileSequence(6, 7, 8) === true ||
        CheckTileSequence(0, 3, 6) === true ||
        CheckTileSequence(1, 4, 7) === true ||
        CheckTileSequence(2, 5, 8) === true ||
        CheckTileSequence(0, 4, 8) === true ||
        CheckTileSequence(2, 4, 6) === true
    )
    {
        WinGame();
    }
    else if (CheckForTie() === true)
    {
        console.log(`It's a tie!`);
        ResetGame();
    }
    
}

//checks if all items are full and if they are then its a tie
function CheckForTie()
{
    for (let i = 0; i < ticTacToeBoard.length; i++)
    {
        if (ticTacToeBoard[i] === "") 
        {
            
            return false;
        }
    }
    return true;
}

function CheckTileSequence(num1, num2, num3)
{
    if(GetTile(num1) !== "" && GetTile(num1) === GetTile(num2) && GetTile(num2) === GetTile(num3))
    {
        winner = GetTile(num1);
        return true;
    }
    return false;
}

function WinGame()
{
    console.log(`Winner: ${winner}`);
    ResetGame();
}

function ResetGame()
{
    ticTacToeBoard = ["","","","","","","","",""];
    currentPlayer = 1;
    InitializeTiles();
}

function UpdateTiles()
{
    let tileGrid = document.getElementsByClassName("ticTacToeTile");
    
    //for each tile, assign it with the proper value from the array
    for (let i  = 0; i < tileGrid.length; i++)
    {
        
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