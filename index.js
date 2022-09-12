const swarm = require("./swarm.js")
const bot = require("./cheatbot.js")

config = {
	server: "wss://gungame.zerotixdev.repl.co/",
	botids: []
}

var bots = swarm(config, 2, bot)
console.log("Initailized!")
setInterval(bots.debug,500)
setInterval(bots.connect,500)
