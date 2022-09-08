function swarm(config, size, bot) {
	console.log("created swarm",config, size, bot)
	var that = Object.create({
		connect
	})
	var state = Object.create({});
	var array = [];
	function connect() {
		for (var i = 0; i < size; i++) {
			if (array[i] === undefined || array[i].closed)  {
				console.log("bot",i,"connecting")
				array[i] = bot(config,state)
				array[i].run()
			}
		}
	}
	return that;
}

module.exports = swarm
