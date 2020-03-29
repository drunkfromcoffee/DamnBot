const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Get someone's avatar",
  usage: "<prefix>avatar [user]",

  execute(client, message, args) {
    let avatar_embed = new MessageEmbed();
    if (!message.mentions.users.size) {
      avatar_embed = avatar_embed.setFooter("You can ping a user to get his(her) avatar");
      var user = message.author;
    } else {
      var user = message.mentions.users.first();
    }

    avatar_embed = avatar_embed
      .setTitle(`${user.username}'s avatar`)
      .setImage(`${user.displayAvatarURL()}`);
    message.channel.send(avatar_embed);
  }
}
