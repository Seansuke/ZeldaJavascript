/** 
 * A class that contains a single item that is on the field.
 */
function Drop() {
    this.pos = {
        x: -999,
        y: -999
    };
    this.misc = {
        name: "drop",
        box: 6,
        subimg: 0,
        direction: "up",
        attacking: 0,
        imgSpd: 0,
        currentWpn: "none",
        team: "itemDrop",
        gfxRows: 4
    };
    this.dmg = {
        att: 0,
        time: 0,
        force: 0,
        cool: 0,
        direction: "up",
        effect: "none"
    };
    this.type = "";
    this.amnt = 0;
    this.imgtag = (document.getElementById("drops").appendChild(document.createElement('img')));
    this.imgtag.src = "gfx/alpha.png";
}