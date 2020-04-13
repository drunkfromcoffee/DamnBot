const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "help",
	usage: "<prefix>help [commandname]",
	execute(client, message, args) {
		const embed = new MessageEmbed();

		if(!args.length) {
			embed.setTitle("Help");
			client.commands.forEach(command => {
				if (command.hidden) return;
				embed.addField(command.name, "" + command.usage.replace("<prefix>", client.config.prefix));
			});
			embed.setFooter(`You can use ${client.config.prefix}help [command] to get more info about a command.`);
			return message.channel.send(embed);
		}

		const command_name = args[0].toLowerCase();
		const command = client.commands.get(command_name) || client.commands.find(cmd => {
            if (cmd.aliases === undefined) return false;
            else {
                return cmd.aliases.includes(command_name);
            }
        });

		if (!command || command.hidden) {
			return message.reply('that\'s not a valid command!');
		}

		embed.setTitle(`**Name:** ${command.name}`);

		if (command.aliases) embed.addField("**Aliases:**", command.aliases.join(', '));
		if (command.description) embed.addField("**Description:**", command.description);
		if (command.usage) embed.addField("**Usage:**", command.usage.replace("<prefix>", client.config.prefix));

		embed.addField("**Cooldown:**", `${command.cooldown || 3} second(s)`);

		message.channel.send(embed);

	}
};