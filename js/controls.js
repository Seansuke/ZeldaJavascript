/* ==================================================================================================================================*/
/*========================================================== GET INPUT     ==========================================================*/
/* ==================================================================================================================================*/
document.onkeydown=function(e) {
	e = window.event || e; 
	if(e.which != undefined) {
		control[e.which] = true;
	}
	else { 
		control[e.keyCode] = true;
	}
}
// TODO - Implement Gamepad.
document.onkeyup=function(e) {
	e = window.event || e; 
	if(e.which != undefined) { 
		control[e.which] = false;
	}
	else { 
		control[e.keyCode] = false;
	}
}

// Check which keyboard key is being held down and sets player one's key to such
function setKey(playerNumber) {
	for(var i = 0;i < 512;i++) {
		if(control[i] == true) {
			if(current == 0) {
				if(playerNumber == 1)
				{
					p1.ctrl[(keys[current])] = i;
				}
				else
				{
					p2.ctrl[(keys[current])] = i;	
				}
				current += 1;
				return i; 
			}
			else if(p1.ctrl[(keys[(current - 1)])] != i) {
				if(playerNumber == 1)
				{
					p1.ctrl[(keys[current])] = i;
				}
				else
				{
					p2.ctrl[(keys[current])] = i;	
				}
				current += 1;
				return i; 
			}
		}
	}
	return -1; 
}

// Set up the custom controls
function controlSet(playerNumber) {
	DisplayConsoleText("Press " + keys[current]);
	setKey(playerNumber);
	if(keys[current] != "END") {
		setTimeout(`controlSet(${playerNumber})`, 10);
	}
	else {
		current = 0;
		consoleTag.value = "All Set!";
		clearTimeout(`controlSet(${playerNumber})`);
	}
}
