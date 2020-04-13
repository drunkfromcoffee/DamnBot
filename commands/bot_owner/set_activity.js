module.exports = {
	name: "setactivity",
	botowner:true,
	usage:"<prefix>setactivity <type> <activity>",
	args:true,
	execute(client, message, args) {
		let activity_type = args.shift().toUpperCase();
		client.user.setPresence({ activity : {name : args.join(" "), type: activity_type}}).then(() => {
			message.channel.send("Done!")
		});
	}
};