// Simple aimbot
const bot = require("./bot.js")

function aimbot(config, state) {
	let that = bot(config, state);
	
	// Map's allow keys to be ints. (take note of this zero.)
	var players = new Map();
	var loadtick = 0;

	function tick(that) {
		var inputpkt = {input: {tick: that.connection.currentTick, input: that.mkinput()}}
		that.send(inputpkt)
		let target = get_target();

		if (target !== null) {
			let target_player = players.get(target);
			let self_player = players.get(that.connection.selfId)

			let dx = target_player.x - self_player.x;
			let dy = target_player.y - self_player.y;

			let angle = Math.atan2(dy,dx);

			if (loadtick > 100){
				that.send({
					angle: angle, 
					shoot: true, 
					cx: self_player.x,
					cy: self_player.y,
				})
				loadtick = 0
			} else {
				that.send({angle: angle})
				loadtick ++;
			}
		}


	}

	function get_target() {
		var target = null;
		var target_dist = null;
		let pself = players.get(that.connection.selfId);
		
		if (!pself) {
			return null;
		}
		
		for (playerid of players.keys()) {
			if (playerid !== that.connection.selfId) {
				var player = players.get(playerid);
				var dx = pself.x - player.x;
				var dy = pself.x - player.x;
				var d = Math.sqrt(dx*dx + dy*dy);
				if ((target_dist === null) || (d < target_dist)) {
					target_dist = d;
					target = playerid;
				}
			}

		}
		return target;
	}

	function onrx(that, data) {
		// I dont want to bother with lockstep, this sould keep us in sync with server :)
		var handled = false;
		if (data.serverPayload) {
			handled = true;
			that.connection.currentTick = data.serverPayload.tick;
		}
		if (data.changePack) {
			handled = true;
			for (idx in data.changePack) {
				let newstate = data.changePack[idx]
				players.set(newstate.id, newstate)

			}
		}
		if (!handled) {
		}

	}
	that.onrx = onrx
	that.tick = tick;
	return that
}

module.exports = aimbot
