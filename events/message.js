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
        
        
        try {
            command.execute(client, message, args);
        } catch (error) {
            console.error(error);
        }
    }
}
