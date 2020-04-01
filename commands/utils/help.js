module.exports = {
	name: "help",
	usage: "<prefix>help [commandname]",
	execute(client, message, args) {
		let data = [];

		if(!args.length) {
			data.push("Here's a list with all my commands:");
			data.push(client.commands.map(command => "> " +command.name + "\n Usage: ``"+ command.usage.replace("<prefix>", client.config.prefix) + "``").join("\n"));
			data.push(`You can use ${client.config.prefix}help [commandname] to get more info about a specific command!`);
			return message.channel.send(data, { split: true});
		}

		const command_name = args[0].toLowerCase();
		const command = client.commands.get(command_name) || client.commands.find(cmd => {
            if (cmd.aliases == undefined) return false;
            else {
                return cmd.aliases.includes(command_name);
            }
        });

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);

		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${client.config.prefix}${command.name} ${command.usage}`);

		data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`);

		message.channel.send(data, { split: true });

	}
}