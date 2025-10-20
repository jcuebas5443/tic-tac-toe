var player1Score = 0;
var player2Score = 0;
var tieAmount = 0;

var player1Icon = "X";
var player2Icon = "O";

var ticTacToeBoard = ["","","","","","","","",""];

var currentPlayer = 1;

var winner;

var readyToStart = false;
var iconSelected = false;

var player1Color = "#b9ffc5ff"
var player2Color = "#ffbabaff"


//ONCLICK LOGIC
//when player clicks a spot, change that spot to either x or o depending if it is an open spot or not
function OnSpotClicked(thisElement)
{
    //can't play game without selecting player icon
    if (!readyToStart || !iconSelected) return;
    
    let thisValue = thisElement.value;
    //if tile is empty, then assign this player's value to the array and update the actual board
    
    if(GetTile(thisValue) === "")
    {
        ChangeTile(thisValue,GetPlayerIcon(currentPlayer));
        HighlightSquare(currentPlayer, thisValue);
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

//used to highlight the just-selected square
function HighlightSquare(playerNum, squareIndex)
{
    let tileGrid = document.getElementsByClassName("ticTacToeTile");
    
    
    //find this tile and color it accordingly
    for (let i  = 0; i < tileGrid.length; i++)
    {
        if (i === Number(squareIndex))
        {
            
            if (playerNum === 1)
            {
                tileGrid[i].style.backgroundColor = player1Color;
            }
            else
            {
                tileGrid[i].style.backgroundColor = player2Color;
            }
        }
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
        tieAmount++;
        document.getElementById("playersTie").innerText = tieAmount;

        //take away the current player text for now and replace it with the winner
        let activePlayerText = document.getElementById("activePlayerText");
        activePlayerText.innerText = `Tie!`;

        PickNextGame();
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
        //uses any one of the winning tiles to get the winning player
        winner = GetTile(num1);

        //changes the colors of the winning tiles
        ChangeWinningTileColors(num1, num2, num3);
        
        //tells the game this player won
        return true;
    }
    return false;
}

function ChangeWinningTileColors(num1, num2, num3)
{
    let tileGrid = document.getElementsByClassName("ticTacToeTile");
    

    //for each tile, assign it with the proper value from the array
    for (let i  = 0; i < tileGrid.length; i++)
    {
        if (i === num1 || i === num2 || i === num3)
            tileGrid[i].classList.add("pulseWin");
    }
}

function WinGame()
{
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

    //take away the current player text for now and replace it with the winner
    let activePlayerText = document.getElementById("activePlayerText");
    activePlayerText.innerText = `Winner: Player ${GetPlayerFromIcon(winner)}(${winner})`;

    PickNextGame();
}

function ResetTileColors()
{
    let tileGrid = document.getElementsByClassName("ticTacToeTile");
    
    //for each tile, assign it with the proper value from the array
    for (let i  = 0; i < tileGrid.length; i++)
    {
        tileGrid[i].value = i;
        tileGrid[i].style.backgroundColor = "#ffffff";
        tileGrid[i].classList.remove("pulseWin");
    }
}




//BETWEEN GAMES LOGIC
function PickNextGame()
{
    readyToStart = false;
    let gameButtonSection = document.getElementById("nextGameButtons");

    let gameButtons = document.createElement("div");
    gameButtons.innerHTML = `
            <button onclick="ResetGame();">Play Again</button>
            <button onclick="ResetGame(); ResetScore(); PickUserIcon();">Reset Game</button>
        `;
    gameButtonSection.append(gameButtons);

    
}




//GAME RESET LOGIC
function ResetGame()
{
    ticTacToeBoard = ["","","","","","","","",""];

    
    RemoveNextGameButtons();
    InitializeTiles();
}

function ResetScore()
{
    //reset scores back to nothing
    player1Score = 0;
    player2Score = 0;
    tieAmount = 0;
    document.getElementById("playersTie").innerText = tieAmount;
    document.getElementById("player1Score").innerText = player1Score;
    document.getElementById("player2Score").innerText = player2Score;

    InitializeTiles();
}

function RemoveNextGameButtons()
{
    let gameButtonSection = document.getElementById("nextGameButtons");

    gameButtonSection.innerHTML = "";
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
//assign all the initial values to tiles when new game begins
function InitializeTiles()
{
    readyToStart = true;

    ResetTileColors();

    //assign player text
    currentPlayer = 1;

    //show current player
    let activePlayerText = document.getElementById("activePlayerText");
    activePlayerText.innerText = `Player: ${GetPlayerIcon(currentPlayer)}`;

    //actually update visible tiles
    UpdateTiles();
}

//displays buttons where user can pick their icon
function PickUserIcon()
{
    let gameButtonSection = document.getElementById("nextGameButtons");

    let gameButtons = document.createElement("div");
    gameButtons.innerHTML = `
            <button onclick="ChoosePlayer(this.innerText);">X</button>
            <button onclick="ChoosePlayer(this.innerText);">O</button>
        `;
    gameButtonSection.append(gameButtons);

    //display select player text
    let activePlayerText = document.getElementById("activePlayerText");
    activePlayerText.innerText = `Player 1: Select an icon.`;

    iconSelected = false;

}

//assigns the player the value they choose
function ChoosePlayer(value)
{
    iconSelected = true;
    player1Icon = value;
    if (value === "X")
    {
        player2Icon = "O";

        //update player text on screen
        document.getElementById("player1Title").innerText = 'Player 1 (X)';
        document.getElementById("player2Title").innerText = 'Player 2 (O)';
    }
    else if (value === "O")
    {
        player2Icon = "X";

        //update player text on screen
        document.getElementById("player1Title").innerText = 'Player 1 (O)';
        document.getElementById("player2Title").innerText = 'Player 2 (X)';
    }

    
    //show current player
    let activePlayerText = document.getElementById("activePlayerText");
    activePlayerText.innerText = `Player: ${GetPlayerIcon(currentPlayer)}`;

    //get rid of buttons
    RemoveNextGameButtons();
}


//FUNCTIONS CALLED ON START
InitializeTiles();
PickUserIcon();
