$(document).ready(() => {
  console.log("Up and Running");

  // No longer using this file for JQuery, keeping for the notes.
  // Start of pseudocode

  // Click event for the start button
  $("#start").click(start);

  function start(event) {
    // Makes the start button go away
    $("#start").css("opacity","0");
    $("#start").css("z-index","-1");
    // Brings up the game window
    $("#game").css("opacity","1");
    $("form").css("opacity","1");
    $("#reset").css("opacity","1");
    return;
  }

  // Form submit event
  const $form = $("form");
  $form.submit(changeRoom);

  changeRoom = function(event) {
    event.preventDefault();
    const $command = $("input[name=commands]");
    alert($command.val());
  }

  let $text = ("#gameText");
  $text.html("I dun changed it");

  // Get the form inputs

  // Define each of the valid commands as variables
    // Commands are Forwards, Backwards, Left, Right
    // i.e. const $fwd = $("#commands").val("Forward") or however you do it

  // Create a constructor function for a room class.
    // Has one property for each direction the player can move
    // Directions with entrances to other rooms will be the variable for that room (i.e $room1.left = $room2)
    // Directions with no entrances/exits will be defined as false
    // An additional property containing the text that will be displayed in the game in game window
      // This may be stored in a different variable for cleaner looking code

    // Constructor function for the room
  class Room {
    constructor (forward, backward, left, right, text) {
      this.fwd = forward;
      this.bwd = backward;
      this.left = left;
      this.right = right;
      this.text = text;
    }
  }

  // Define each room

  let $start = new Room($r1,false,false,false,"Hi There!");
  let $r1 = new Room(false,$start,false,false,"Go Away");

  // Create a class for just the game.
    // One property, currentRoom = the defined variable of the room the player is in
    // One method that changes the text in the game window when the player changes rooms
      // Grabs currentRoom.text, a property of the room which has the text that should be displayed in the game window.
      // Change the text in the in game window to currentRoom.text
    // One method for changing rooms when the player inputs a command. Various if statements
      // Display an error alert when the player inputs a correct command. "That is not a valid command" or similar.
      // Display an error alert when the player moves in a direction with no room "You smacked your head against the wall."
      // If the player inputs a valid command that leads to a room, should change the current room to be that room.
        // Grabs the property of the current room corresponding to the direction the player moved and makes that the current room

  // Game is now an object:

  let $game = {
    currentRoom: $start,
  }

  // Click event for the reset button which returns the player to the starting room.

  // If time allows, function that plays a sound clip when a specific room is entered
    // If game.currentRoom = $roomWithSoundClip play clip
    // Need to research the most effective way to impliment this. Maybe add in the HTML tag for playing an mp3 file.


}) // end of document.ready do not fux with
