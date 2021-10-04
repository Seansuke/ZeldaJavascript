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
// TODO - Implement Gamepad. https://github.com/Seansuke/ZeldaJavascript/issues/2
document.onkeyup=function(e) {
	e = window.event || e; 
	if(e.which != undefined) { 
		control[e.which] = false;
	}
	else { 
		control[e.keyCode] = false;
	}
}

/** Check which keyboard key is being held down and sets player one's key to such*/
function setKey(playerNumber) {
	// Iterate through all keys pressed to find what is being pressed and set it.
	for(var keyCode = 0;keyCode < 512;keyCode++) {
		var currentKeyName = keys[currentKeyIndex];
		var previousKeyName = keys[currentKeyIndex - 1];
		var isKeyCodePressed = control[keyCode];
		if(isKeyCodePressed == true) {
			if(currentKeyIndex == 0) {
				if(playerNumber == 1)
				{
					p1.ctrl[currentKeyName] = keyCode;
				}
				else
				{
					p2.ctrl[currentKeyName] = keyCode;	
				}
				currentKeyIndex += 1;
				return keyCode; 
			}
			else 
			{
				if(playerNumber == 1)
				{
					// Only set this new key as long as it doesn't match the previous key exactly.
					if(p1.ctrl[previousKeyName] != keyCode) 
					{
						p1.ctrl[currentKeyName] = keyCode;
						currentKeyIndex += 1;
						return keyCode;
					} 
				}
				else
				{
					// Only set this new key as long as it doesn't match the previous key exactly.
					if(p2.ctrl[previousKeyName] != keyCode) 
					{
						p2.ctrl[currentKeyName] = keyCode;
						currentKeyIndex += 1;
						return keyCode;
					}
				}
			}
		}
	}
	return -1; 
}

/** Set up the custom controls*/
function controlSet(playerNumber) {
	if(p2 === null && playerNumber == 2)
	{
		addPlayer2();
	}
	DisplayConsoleText("Press " + keys[currentKeyIndex] + " for player " + playerNumber);
	setKey(playerNumber);
	if(keys[currentKeyIndex] != "END") {
		setTimeout(`controlSet(${playerNumber})`, 10);
	}
	else {
		currentKeyIndex = 0;
		DisplayConsoleText("Controls are set complete for player " + playerNumber);
		clearTimeout(`controlSet(${playerNumber})`);
	}
}
