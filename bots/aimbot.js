const bot = require("../core/bot.js")

const Weapons = {
	Pistol: { cooldown: 0.5},
	Shotgun: { cooldown: 1.6},
	Rifle: {cooldown: 2.8 },
}

function aimbot(config, state) {
	let that = bot(config, state);
	
	// Map's allow keys to be ints. (take note of this zero.)
	var players = new Map();
	var loadtick = 0;

	function tick(that) {
		var players = that.connection.players;
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
					cy: self_player.y
				})
				loadtick = 0
			} else {
				that.send({angle: angle})
				loadtick ++;
			}
		}


	}

	function get_target() {
		var players = that.connection.players
		var target = null;
		var target_dist = null;
		let pself = players.get(that.connection.selfId);
		
		if (!pself) {
			return null;
		}
		
		for (playerid of players.keys()) {
			if (!config.botids.includes(playerid)) {
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
	
	that.tick = tick;
	return that
}

module.exports = aimbot
