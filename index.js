const bot = require("./crashbot.js")
const swarm = require("./swarm.js")

config = {
	server: "wss://gungame.zerotixdev.repl.co/"
}

var bots = swarm(config, 1, bot)
console.log("Initailized!")
bots.connect()
console.log("connected all bots!")
setInterval(bots.connect,500)
