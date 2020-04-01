module.exports = {
    event: "ready",
    execute(client) {
        console.log(`Ready to serve ${client.guilds.cache.size} servers with ${client.users.cache.size} users.`)
    }
}