const discord           = require("discord.js");
const client            = new discord.Client();
client.commands         = new discord.Collection();
const { token, prefix } = require("./config.json");
const read              = require("fs-readdir-recursive");

// Load commands from ./commands directory

const files = read("./commands");

const command_files = files.filter(file => file.endsWith(".js"));

for (let i = 0; i < command_files.length; i++) {
  const command = require(`./commands/${command_files[i]}`);

  console.log(`Loaded command ${command.name}`);
  client.commands.set(command.name, command);
}


client.on("message", (message) => {
  if(!message.content.startsWith(prefix) || message.author.bot) return;

  const args    = message.content.slice(prefix.length).split(" ");
  const command_name = args.shift().toLowerCase();

  if(!client.commands.has(command_name)) return;

  const command = client.commands.get(command_name);

  if (command.args && !args.length) {
    return message.channel.send(command.usage);
  }

  try {
    command.execute(client, message, args);
  } catch (error) {
    console.error(error);
  }
});

client.login(token);
