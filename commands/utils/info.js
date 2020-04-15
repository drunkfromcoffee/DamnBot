const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "info",
    aliases: ["userinfo"],
    usage: "<prefix>info [user]",
    description: "Get info about a user.",
    
    execute(client, message, args) {
        let info_embed = new MessageEmbed();
        let user;
        if (!message.mentions.users.size && !args.length) {
            info_embed.setFooter("You can ping a user to get his(her) info");
            user = message.author;
        } else if (message.mentions.users.size) {
            user = message.mentions.users.first();
        } else {
            user = message.guild.members.cache.find(member => member.displayName.toLowerCase().includes(args.join(" ").toLowerCase()) || member.user.username.toLowerCase().includes((args.join(" ")).toLowerCase()));
            if (!user) return message.channel.send("No user found with that name, please ping somenone.");
            else user = user.user;
        }
        const member = message.guild.member(user);
        info_embed.setTitle(`${user.username}'s Info`);
        info_embed.setThumbnail(user.displayAvatarURL({format: "png"}));
        info_embed.addField(`Registered account on:`, new Date(user.createdAt).toUTCString());
        info_embed.addField(`Joined this server on:`, new Date(member.joinedAt).toUTCString());
        info_embed.addField(`Roles`, member.roles.cache.filter(role => !role.name.includes("everyone") && !role.managed).map(role => role).join(", "));
        message.channel.send(info_embed);
    }
};
