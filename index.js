const swarm = require("./swarm.js")
const bot = require("./spambot.js")
//const bot = require("./movebot.js")

config = {
	server: "wss://gungame.zerotixdev.repl.co/"
}

var bots = swarm(config, 100, bot)
console.log("Initailized!")
setInterval(bots.debug,500)
setInterval(bots.connect,500)
