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
  let $start = new Room(false,false,false,false,"You wake up to in a dark enclosed area. Rock walls surround you and the ceiling is low. Beside you is a lantern. You pick it up and see an exit in front of you, leading into darkness.");
  let $r1 = new Room(false,$start,false,false,"You enter a dimly lit area with exits in front of you and to the right.");
  let $r2 = new Room(false,false,$r1,false,"You enter a narrow corridor with exits in front of you and to the left of you.");
  let $de1 = new Room(false,$r1,false,false,"You stumble over some rocks as you enter this section of the cave. As you look up you see only rock walls surrounding you. The only way out is behind you.");
  let $r3 = new Room(false,$r2,false,false, "This part of the cave is spacious with high ceilings. There are exits behind you, in front of you, and to the right. ");
  let $de2 = new Room(false,false,$r3,false,"As you illuminate this part of the cave you notice a skeleton. Next to it is a lantern similar to the one you’re carrying. It’s long since gone out. The only exit is to your left.");
  let $r4 = new Room(false,$r3,false,false,"You notice this area has exits on all four walls. The exit to your right is marked with a lantern hanging onto the wall.");
  let $r5 = new Room(false,false,$r4,false,"You see an exit to your right that’s been caved in. There are exits in front of you and to the left that appear to be fine. ");
  let $r6 = new Room(false,$r5,false,false,"Off to the right there’s a large chasm filled with stalactite and stalagmite. There are exits behind you and to your left.");
  let $r7 = new Room(false,$r4,false,$r6," You notice a strange smell in this part of the cave. There are exits behind you and to your right. You notice a pile of oily rags by the exit to your right. ");
  let $r8 = new Room(false,false,false,$r4,"This room has exits in the front, left, and right walls. You see an abandoned backpack by the entrance to the right. Opening it up reveals moldy food within. ");
  let $r9 = new Room(false,false,false,$r8,"You barely fit inside this area of the cave. Your head scrapes against the ceiling. There are exits to your right, left, and behind you. ");
  let $de3 = new Room(false,false,false,$r9,"This area leads nowhere but back the way you came.");
  let $r10 = new Room($r9,false,false,false,"This space opens up tall and wide enough for you to stand comfortably. There are exits in front of and behind you.");
  let $de4 = new Room($r10,false,false,false,"You enter an enclosed space you barely fit inside. In order to leave you need to crawl back the way you came.");
  let $r11 = new Room(false,$r8,false,false,"You enter a large corridor that leads both behind and in front of you.");
  let $r12 = new Room(false,$r11,false,false,"This space is well illuminated with lamps lighting up each wall. You see exits in front, behind, and to the right of you. ");
  let $r13 = new Room(false,false,$r12,false,"You enter a cramped corridor with exits to your left and right.");
  let $de5 = new Room(false,false,$r13,false,"You reach a dead end with the only exit to your right. A candy bar lays on the ground in front of you. The wrapper seems intact, but you decide against picking it up.");
  let $r14 = new Room(false,$r12,false,false,"You enter a wide space. You have to walk to the center in order to see it all. As you raise your lantern you notice exits behind you, to your left, and in front of you.");
  let $de6 = new Room(false,$r14,false,false,"You enter another wide space, only this time you discover the only exit is back the way you came.");
  let $r15 = new Room(false,false,false,$r14,"When you walk into this area you notice it’s a long, snaking corridor. After walking it’s length you find exits to your right, left, and in front of you.");
  let $de7 = new Room(false,$r15,false,false,"The first thing you notice is the skeleton to your right. It appears to be holding a an old fashioned revolver. This leaves you worried. The only exit is back the way you came.");
  let $r16 = new Room(false,false,false,$r15,"You enter a wide corridor with exits to the left and right. You see light coming from the exit on the left and feel a breeze flow past you.");
  let $finish = new Room(true,true,true,true,"Congratulations! You escaped from the cave! Hit the Retry button to return to the beginning. ");

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
  $r3.fwd = $r4;
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
  $r8.fwd = $r11;
  $r8.left = $r9;
  // Room 9
  $r9.left = $de3;
  $r9.bwd = $r10;
  // Room 10
  $r10.bwd = $de4;
  // Room 11
  $r11.fwd = $r12;
  // Room 12
  $r12.right = $r13;
  $r12.fwd = $r14;
  // Room 13
  $r13.right = $de5;
  // Room 14
  $r14.fwd = $de6;
  $r14.left = $r15;
  // Room 15
  $r15.fwd = $de7;
  $r15.left = $r16;
  // Room 16
  $r16.left = $finish;


  // storing what room the player is currently in and changes the text in the game window
  let currentRoom = $start;
  let roomDsc = currentRoom.text;
  let $dsc = $("#gameDsc");
  $dsc.html(roomDsc);

  // Function for changing rooms, works until you accidentally walk into a wall. Next command reloads the page.
  function moveRoom(event) {
    let $command = $("input[name=commands]");
    let $output = $command.val();
    const forward = "forward";
    const backward = "backward";
    const left = "left";
    const right = "right";
    if ($output.toLowerCase() === forward) {
      if (currentRoom.fwd === false) {
        alert("You smacked your head against the wall.");
      }
      else {
      // Changing room the player is in and the text inside the game window
      currentRoom = currentRoom.fwd;
      roomDsc = currentRoom.text;
      $dsc.html(roomDsc);
      }
  } if ($output.toLowerCase() === backward) {
      if (currentRoom.bwd === false) {
        alert("You smacked your head against the wall.");
    } else {
      // Changing room the player is in and the text inside the game window
      currentRoom = currentRoom.bwd;
      roomDsc = currentRoom.text;
      $dsc.html(roomDsc);
      }
  } if ($output.toLowerCase() === left) {
      if (currentRoom.left === false) {
        alert("You smacked your head against the wall.");
      } else {
      // Changing room the player is in and the text inside the game window
      currentRoom = currentRoom.left;
      roomDsc = currentRoom.text;
      $dsc.html(roomDsc);
      }
  } if ($output.toLowerCase() === right) {
      if (currentRoom.right === false) {
        alert("You smacked your head against the wall.");
      } else {
      // Changing room the player is in and the text inside the game window
      currentRoom = currentRoom.right;
      roomDsc = currentRoom.text;
      $dsc.html(roomDsc);
      }
  } if ($output.toLowerCase() === "finish") {
      currentRoom = $finish;
      roomDsc = currentRoom.text;
      $dsc.html(roomDsc);
  }
    event.preventDefault();
  }

  let $retry = $("#reset");
  $retry.click(gameReset);

  function gameReset(event) {
    // Changing room the player is in and the text inside the game window
    currentRoom = $start;
    roomDsc = currentRoom.text;
    $dsc.html(roomDsc);
  }

}) // End of document.ready
