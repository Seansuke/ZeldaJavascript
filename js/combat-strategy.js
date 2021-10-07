/**
 * Handles the logic of combat.  How drops are handled, how damage is dealt, etc.
 *  */
function CombatStrategy() {
	/** 
	 * Have a random drop appear in the location (x, y)
	 * @param x - Horizontal location on the current map.
	 * @param y - Vertical location on the current map.
	 * @param maxDropValue - The maximum value this drop is worth.  Can be as low as 1 or as high as 20.
	 */
	this.createRandomDrop = function(x, y, maxDropValue) {
		var itemDrop = new Drop();
		itemDrop.pos.x = x;
		itemDrop.pos.y = y;
		if (_p1.stat.hp <= 15 || (_p2 === null ? false : _p2.stat.hp <= maxDropValue)) {
			// Low on HP, promote healing.
			itemDrop.type = (Array('heart', 'heart', 'heart', 'heart', 'heart', 'rupee', 'speed'))[Math.floor(Math.random() * 7)];
		}
		else if (_p1.stat.mhp - _p1.stat.hp <= maxDropValue || (_p2 === null ? false : _p2.stat.mhp - _p2.stat.hp <= maxDropValue)) {
			// Don't promote overhealing when high on HP.
			itemDrop.type = (Array('heart', 'rupee', 'rupee', 'rupee', 'speed', 'speed', 'speed'))[Math.floor(Math.random() * 7)];
		}
		else {
			// Normal conditions means equal chance of drops.
			itemDrop.type = (Array('heart', 'rupee', 'speed'))[Math.floor(Math.random() * 3)];
		}
		itemDrop.imgtag.src = "gfx/drop/" + itemDrop.type + ".png";
		itemDrop.amnt = Math.ceil(maxDropValue * 0.5 + Math.random() * maxDropValue * 0.5);
		drawSprite(itemDrop.imgtag, itemDrop);
		_itemDropList.push(itemDrop);
	}


}