const random_reddit    = require("random-puppy");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "meme",
    aliases: ["memes"],
    category: "Fun",
    usage: "<prefix>meme",
    execute(client, message, args) {
        let subreddits = ["dankmemes", "memes", "meme", "MemeEconomy", "me_irl"];
        let subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
        
        random_reddit(subreddit).then((url) => {
            let embed = new MessageEmbed()
                .setTitle(`Random meme from r/${subreddit}`)
                .setImage(url);
            message.channel.send(embed);
        });
    }
}
