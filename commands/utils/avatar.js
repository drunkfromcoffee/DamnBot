const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  category: "Utility",
  description: "Get someone's avatar",
  usage: "<prefix>avatar [user]",

  execute(client, message, args) {
    let avatar_embed = new MessageEmbed();
    let user;
    if (!message.mentions.users.size && !args.length) {
      avatar_embed.setFooter("You can ping a user to get his(her) avatar");
      user = message.author;
    } else if (message.mentions.users.size) {
      user = message.mentions.users.first();
    } else {
      user = message.guild.members.cache.find(member => member.displayName.toLowerCase().includes(args.join(" ").toLowerCase()) || member.user.username.toLowerCase().includes((args.join(" ")).toLowerCase()));
      if (!user) return message.channel.send("No user found with that name, please ping somenone.");
      else user = user.user;
    }

    avatar_embed.setTitle(`${user.username}'s avatar`)
        .setImage(`${user.displayAvatarURL({format:"png"})}`);
    message.channel.send(avatar_embed);
  }
};
