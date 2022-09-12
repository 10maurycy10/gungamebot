const bot = require("./bot.js")

function spam(config, state) {
	let that = bot(config, state)
	function tick(that) {
		if (that.connection.selfId) {
			that.send({chatMessage: "AAAA".repeat(1024)})
		}
	}
	that.tick = tick;
	return that
}

module.exports = spam
