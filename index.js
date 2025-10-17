var player1Score;
var player2Score;
var tieAmount;

var player1Icon = "X";
var player2Icon = "O";

var ticTacToeBoard = ["","","","","","","","",""];

var currentPlayer = 1;

var winner;



//ONCLICK LOGIC
//when player clicks a spot, change that spot to either x or o depending if it is an open spot or not
function OnSpotClicked(thisElement)
{
    
    let thisValue = thisElement.value;
    //if tile is empty, then assign this player's value to the array and update the actual board
    
    if(GetTile(thisValue) === "")
    {
        ChangeTile(thisValue,GetPlayerIcon(currentPlayer));
        SwitchPlayerTurn();
        CheckForWin();
    }
}



//PLAYER UPDATE LOGIC
//used to return the players icon based on a number
function GetPlayerIcon(playerNum)
{
    if (playerNum === 1)
        return player1Icon;
    else if (playerNum === 2)
        return player2Icon;
}

//used to get the player number if given an icon
function GetPlayerFromIcon(icon)
{
    if (icon === player1Icon)
    {
        return 1;
    }
    else if (icon === player2Icon)
    {
        return 2;
    }
}




//TILE LOGIC
function GetTile(index)
{
    return ticTacToeBoard[index];
}

function ChangeTile(index,value)
{
    ticTacToeBoard[index] = value;
    UpdateTiles();
}



//TURN LOGIC
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




//WIN LOGIC
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
        tieAmount++;
        document.getElementById("tieScore").innerText = tieAmount;
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

    //update win counts
    if (GetPlayerFromIcon(winner) === 1)
    {
        player1Score++;
        document.getElementById("player1Score").innerText = player1Score;
    }
    else if (GetPlayerFromIcon(winner) === 2)
    {
        player2Score++;
        document.getElementById("player2Score").innerText = player2Score;
    }
    //tie score updating is in tie function

    ResetGame();
}





//GAME RESET LOGIC
function ResetGame()
{
    ticTacToeBoard = ["","","","","","","","",""];

    

    InitializeTiles();
}




//UPDATE LOGIC
function UpdateTiles()
{
    let tileGrid = document.getElementsByClassName("ticTacToeTile");
    
    //for each tile, assign it with the proper value from the array
    for (let i  = 0; i < tileGrid.length; i++)
    {
        
        tileGrid[i].innerText = ticTacToeBoard[i];
    }
}




//START LOGIC
//assign all the initial values to tiles when the page loads
function InitializeTiles()
{
    let tileGrid = document.getElementsByClassName("ticTacToeTile");
    
    //for each tile, assign it with the proper value from the array
    for (let i  = 0; i < tileGrid.length; i++)
    {
        tileGrid[i].value = i;
    }

    //assign player text
    currentPlayer = 1;
    let activePlayerText = document.getElementById("activePlayerText");
    activePlayerText.innerText = `Player: ${GetPlayerIcon(currentPlayer)}`;

    //actually update visible tiles
    UpdateTiles();
}

InitializeTiles();