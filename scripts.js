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

  const $form = $("form");
  $form.submit(changeDsc);

  const start = "Starting area, text to follow";

  let currentRoom = start;

  function changeDsc(event) {
    let $dsc = $("#gameDsc");
    $dsc.html(currentRoom);
    event.preventDefault();
  }

  function moveRoom(event) {
    const $command = $("input[name=commands]");
    let $output = $command.val();
    if ($output = "Forward") {
      console.log(currentRoom.prototype.fwd);
    } else {
      alert("Command not recognized. Check the instructions on the left.");
    }
    event.preventDefault();
  }
}) // End of document.ready
