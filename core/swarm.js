function swarm(config, size, bot) {
	console.log("created swarm",config, size, bot)
	var that = Object.create({
		connect,
		debug
	})
	var state = Object.create({});
	var array = [];
	function debug() {
		table = []
		for (var i = 0; i < size; i++) {
			if (undefined !== array[i])
				table[i] = {id: array[i].connection.selfId, closed: array[i].closed}
		}
		console.table(table)
	}
	function connect() {
		for (var i = 0; i < size; i++) {
			if (array[i] === undefined || array[i].closed)  {
				array[i] = bot(config,state)
				array[i].run()
			}
		}
	}
	return that;
}

module.exports = swarm
