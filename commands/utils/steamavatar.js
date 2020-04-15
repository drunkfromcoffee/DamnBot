const { MessageEmbed } = require('discord.js');
const SteamCommunity   = require('SteamCommunity');
const community        = new SteamCommunity();
module.exports = {
    name: "steamavatar",
    category: "Utility",
    description: "Get a steam user's avatar",
    usage: "<prefix>steamavatar <steamuserid>",
    execute(client, message, args) {
        community.getSteamUser(args[0], (err, user) => {
            if (err) {
                return message.channel.send(`An error has occurred.\n`);
            }
            const embed = new MessageEmbed();
            embed.setTitle(`${user.name}'s Avatar`);
            embed.setImage(user.getAvatarURL("full"));
            return message.channel.send(embed);
        });
    }
};