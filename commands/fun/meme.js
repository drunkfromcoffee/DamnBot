const fetch            = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "meme",
    aliases: ["memes"],
    category: "Fun",
    usage: "<prefix>meme",
    cooldown: 1,
    execute: function (client, message, args) {
        const subreddits = ["dankmemes", "memes", "meme", "DeepFriedMemes", "DarkHumorAndMemes", "AccidentalRacism", "ComedyHeaven", "HistoryMemes", "HolUp"];
        const subreddit = subreddits[Math.floor(Math.random() * subreddits.length)];
        fetch(`https://reddit.com/r/${subreddit}.json?limit=100&sort=top&t=today`).then(res => res.json()).then(res => {
            const body = res;
            const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18 && post.data.url);
            if (!allowed.length) return message.channel.send("It seems that we are out of memes. Try again latter.");
            const meme = allowed[Math.floor(Math.random() * allowed.length)];
            if (meme.data.url.includes(".mp4")) return message.channel.send(meme.data.url);
            const embed = new MessageEmbed()
                .setTitle(`Posted by ${meme.data.author}`)
                .setDescription(`[${meme.data.title}](https://reddit.com${meme.data.permalink})`)
                .setImage(meme.data.url)
                .setFooter(`Upvotes: ${meme.data.ups}👍. Comments: ${meme.data.num_comments}💬. r/${subreddit}`);
            return message.channel.send(embed);
        });
    }
};
