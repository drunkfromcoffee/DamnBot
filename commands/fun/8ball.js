module.exports = {
  name : "8ball",
  description: "Just 8ball",
  usage: "<prefix>8ball [question?]",
  execute(client, message, args) {
    let possibilities = ["Yes", "Maybe...", "Why not?", "Can't say", "Doesn't look like it", "No.", "Never :/"];

    if (args.length) {
      message.channel.send(possibilities[Math.floor(possibilities.length * Math.random())]);
    } else {
      message.channel.send("What would you like to know?").then(() => {
        message.channel.awaitMessages(m => m.author === message.author, {max : 1, time : 20000, errors: ["time"] })
          .then(() => {
            message.channel.send(possibilities[Math.floor(possibilities.length * Math.random())])
          })
          .catch(() => {
            message.channel.send("Welp, it took you quite a while to write your question and I... kinda got bored.");
          });
      });
    }
  }
}
