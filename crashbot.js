const bot = require("./bot.js")

function crashbot(config, state) {
	console.warn("CrashBot's will crash the server.");
	let that = bot(config, state)
	function tick(that) {
		console.log("Sending crash packets, server should crash soon™.")
		that.send({input: {}});
		that.ws.sendUTF("lmao");
	}
	that.tick = tick;
	return that
}

module.exports = crashbot
