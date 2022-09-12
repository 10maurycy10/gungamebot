const swarm = require("./swarm.js")
const bot = require("./cheatbot.js")

config = {
	server: "wss://gungame.zerotixdev.repl.co/"
}

var bots = swarm(config, 1, bot)
console.log("Initailized!")
setInterval(bots.debug,500)
setInterval(bots.connect,500)
