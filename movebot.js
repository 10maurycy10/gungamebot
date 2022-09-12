const bot = require("./bot.js")

function crashbot(config, state) {
	let that = bot(config, state)
	function tick(that) {
		var inputpkt = {input: {tick: that.connection.currentTick, input: that.mkinput()}}
		inputpkt.input.input.up = true;
		that.send(inputpkt)
	}
	that.tick = tick;
	return that
}

module.exports = crashbot
