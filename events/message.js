const discord = require("discord.js");

module.exports = {
    event: "message",
    execute(client, message) {

        if(!message.content.startsWith(client.config.prefix) || message.author.bot) return;
        
        const args    = message.content.slice(client.config.prefix.length).split(" ");
        const command_name = args.shift().toLowerCase();
        const command = client.commands.get(command_name) || client.commands.find(cmd => {
            if (cmd.aliases == undefined) return false;
            else {
                return cmd.aliases.includes(command_name);
            }
        })
        
        if(!command) return;
        
        if (command.owner && message.author.id != client.config.botowner) {
            return message.channel.send("Bot owner command only -_-");
        }
        if (command.args && !args.length) {
            return message.channel.send(`\`\`\`css\n${command.usage.replace("<prefix>", client.config.prefix)}\`\`\``);
        }
        const cooldowns = client.cooldowns;
        if (!cooldowns.has(command.name)) {
            cooldowns.set(command.name, new discord.Collection());
        }

        const now = Date.now();
        const timestamps = cooldowns.get(command.name);
        const cooldownAmount = (command.cooldown || 3) * 1000;

        if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
            }
        }

        timestamps.set(message.author.id, now);
        setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
        
        try {
            command.execute(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }
}
