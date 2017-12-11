$(document).ready(() => {
  console.log("Up and running")

    // Click event for the start button
  $("#start").click(initiate);

  function initiate(event) {
    // Makes the start button go away
    $("#start").css("opacity","0");
    $("#start").css("z-index","-1");
    // Brings up the game window
    $("#game").css("opacity","1");
    $("form").css("opacity","1");
    $("#reset").css("opacity","1");
    return;
  }

  // Grabbing the form and creating a submit event
  const $form = $("form");
  $form.submit(moveRoom);

  // Room constructor function
  class Room {
    constructor(forward,backward,left,right,text) {
      this.fwd = forward;
      this.bwd = backward;
      this.left = left;
      this.right = right;
      this.text = text;
    }
  }

  // Creating each room, start =  starting room, r = normal room, de = dead end, finish = last room
  let $start = new Room(false,false,false,false,"Starting area, text to follow");
  let $r1 = new Room(false,$start,false,false,"Text changed");
  let $r2 = new Room(false,false,$r1,false,"You are now in room 2");
  let $de1 = new Room(false,false,false,$r1,"This is the first dead end");
  let $r3 = new Room(false,$r2,false,false, "Third room");
  let $de2 = new Room(false,false,$r3,false,"Second dead end");
  let $r4 = new Room(false,$r3,false,false,"Fourth room");
  let $r5 = new Room(false,false,$r4,false,"Fifth room");
  let $r6 = new Room(false,$r5,false,false,"Sixth room");
  let $r7 = new Room(false,$r4,false,$r6,"7th room");
  let $r8 = new Room(false,false,$r4,false,"Eighth room");
  let $r9 = new Room(false,false,$r8,false,"9th room");
  let $de3 = new Room(false,false,$r9,false,"Third dead end");
  let $r10 = new Room($r9,false,false,false,"10th room");
  let $de4 = new Room($r10,false,false,false,"Fourth dead end");
  let $r11 = new Room(false,$r8,false,false,"11th room");

  // Can't define room.direction unless the room it leads to has already been defined
  // Redefining room.direction where needed
  // Starting area
  $start.fwd = $r1;
  // Room 1
  $r1.fwd = $de1;
  $r1.right = $r2;
  // Room 2
  $r2.fwd = $r3;
  // Room 3
  $r3.fwd = $r4
  $r3.right = $de2;
  // Room 4
  $r4.right = $r5;
  $r4.fwd = $r7;
  $r4.left = $r8;
  // Room 5
  $r5.fwd = $r6;
  // Room 6
  $r6.left = $r7;
  // Room 8
  $r8.left = $r9;
  // Room 9
  $r9.right = $de3;
  $r9.bwd = $r10;
  // Room 10
  $r10.bwd = $de4;

  // storing what room the player is currently in
  let currentRoom = $start;
  let roomDsc = currentRoom.text;
  let $dsc = $("#gameDsc");
  $dsc.html(roomDsc);

  // Function for changing rooms, not currently working
  function moveRoom(event) {
    let $command = $("input[name=commands]");
    let $output = $command.val();
    let forward = "forward";
    let backward = "backward";
    let left = "left";
    let right = "right";
    if ($output.toLowerCase() === forward) {
      if (currentRoom.fwd === false) {
        alert("You smacked your head against the wall.")
      } else {
      // Changing the text inside the game window
      currentRoom = currentRoom.fwd;
      let roomDsc = currentRoom.text;
      let $dsc = $("#gameDsc");
      $dsc.html(roomDsc);
      }
  } if ($output.toLowerCase() === backward) {
      if (currentRoom.bwd === false) {
        alert("You smacked your head against the wall.")
      } else {
      // Changing the text inside the game window
      currentRoom = currentRoom.bwd;
      let roomDsc = currentRoom.text;
      let $dsc = $("#gameDsc");
      $dsc.html(roomDsc);
      }
  } if ($output.toLowerCase() === left) {
      if (currentRoom.left === false) {
        alert("You smacked your head against the wall.")
      } else {
      // Changing the text inside the game window
      currentRoom = currentRoom.left;
      let roomDsc = currentRoom.text;
      let $dsc = $("#gameDsc");
      $dsc.html(roomDsc);
      }
  } if ($output.toLowerCase() === right) {
      if (currentRoom.right === false) {
        alert("You smacked your head against the wall.")
      } else {
      // Changing the text inside the game window
      currentRoom = currentRoom.right;
      let roomDsc = currentRoom.text;
      let $dsc = $("#gameDsc");
      $dsc.html(roomDsc);
      }
  }
    event.preventDefault();
  }

  let $retry = $("#reset");
  $retry.click(gameReset);

  function gameReset(event) {
    currentRoom = $start;
    let roomDsc = currentRoom.text;
    let $dsc = $("#gameDsc");
    $dsc.html(roomDsc);
  }

}) // End of document.ready
