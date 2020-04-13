module.exports = {
	name: "setstatus",
	botowner:true,
	usage:"<prefix>setstatus <STATUS>",
	args:true,
	execute(client, message, args) {
		client.user.setStatus(args[0]).then(() => {
			message.channel.send("Done!")
		});
	}
};