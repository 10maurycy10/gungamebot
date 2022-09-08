/// A genric Gungame bot, override the "tick" and "onrx" properties to set custom behavior
const wss = require("websocket");
const msgpack = require("msgpack-lite")

function mkinput() {
	input = new Object();
	input.left = false;
	input.rigth = false;
	input.down = false;
	input.up = false;
	input.shift = false;
	return input;
}

deltaTick  = 1/60

function mkconnection() {
	return Object.create({
		seldId: null,
		currentTick: null
	})
}

function bot(config, state) {
	var connection = mkconnection()
	var url = config.server;
	var wsc = new wss.client()
	var ws = null;
	
	var that = Object.create({
		run: run,
		connection,
		state,
		send: send,
		initpkt: (that) => ({join: true, name: "bot", armor: "0"}),
		closed: false
	})

	function handle_message(obj) {
		if (obj.selfId !== undefined) {
			console.log("Know self.")
			connection.selfId = obj.selfId	
		}
		if (that.onrx) {
			that.onrx(that)
		}
	}

	// Helpful function for sending data
	function send(obj) {
		console.log(obj)
		ws.sendUTF(JSON.stringify(obj))
	}

	function run() {
		console.log("Connecting to ", url)
		wsc.on("connect", function (connection_handle) {
			ws = connection_handle;
			that.ws = ws;
			console.log("Connected.");
			
			send(that.initpkt(that) || {join: true, name: "bot", armor: "0"});

			ticker = setInterval(tick, deltaTick*1000);
			pinger = setInterval(ping,250);

			connection_handle.on('message', function(message) {
				data = JSON.parse(message.utf8Data)
				handle_message(data)
			});
			
			connection_handle.on("close", () => {
				that.closed = true;
				clearTimeout(ticker)
				clearTimeout(pinger)
				console.log("closed")
			})
			if (that.init) {
				that.init(that)
			}
		})
		wsc.connect(url)
	}
	
	function ping() {
		send({ ping: Date.now() });
	}

	function tick() {
		connection.currentTick++;
		if (that.tick) {
			that.tick(that)
		}
	}
	return that
}

module.exports = bot
