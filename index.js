const discord           = require("discord.js");
const client            = new discord.Client();
client.commands         = new discord.Collection();
client.config           = require("./config.json");
const read              = require("fs-readdir-recursive");
const fs                = require("fs");

// Load commands from ./commands directory

const command_files = read("./commands").filter(file => file.endsWith(".js"));

for (let i = 0; i < command_files.length; i++) {
  const command = require(`./commands/${command_files[i]}`);

  console.log(`Loaded command ${command.name}`);
  client.commands.set(command.name, command);
}

const events = fs.readdirSync("./events/").filter(file => file.endsWith(".js"));

for (let i = 0; i < events.length; i++) {
  const event = require(`./events/${events[i]}`);

  console.log(`Loadead event ${event.event}`);
  client.on(event.event, event.execute.bind(null, client));
}

client.login(client.config.token);