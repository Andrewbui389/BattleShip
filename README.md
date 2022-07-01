# BattleShip
Constants: 
A gameboard one for the computer and one for the player to keep track of where the ships are placed 
an object containing the various ships and the length 

App State Variables: 
The amount of ships that are left standing for the player and computer 
The state of the game whether all of onesides ships has been sunked 
The state of the players board and the computers board
Whose turn is it to fire 
the coordinates 
Rotation status 
winner 

Cached Elements: 
The value of the tables and the data cells 
message for the player to tell them if they won or lost the battle 
rotation button 


Event Listeners: 
listen for click to recieve coordinates for ship placement and to check phase to switch to attack mode
event listener to check for whether the cursor is hovering or not 
listen to the click on a table to check whether or not it was a hit
replay button for when the game ends 

Functions: 
function to make the player and the computer each a board 
function to place the ships on the given coordinates 
function to take care of grid palcement and whether the grid spaces are within the boundaries 
function to go through all five ships
function to check if rotation should place ships vertically or horizontally 
function for computer to choose random ships placements on grid 
function to highLight when placing ships 





 



 
