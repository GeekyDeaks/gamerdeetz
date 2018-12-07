'use strict'

// die on any unhandled promise rejections
process.on('unhandledRejection', (reason) => { 
    throw reason 
})

require('dotenv').config()

const logger = require('./lib/logger')
const discord = require('./lib/discord')
const cmd = require('./cmd')
const db = require('./lib/db')

async function start() {

    // check the required config
    ['DISCORD_TOKEN'].forEach( p => {
        if(!process.env[p]) {
            logger.error('%s not defined', p)
            process.exit(1)
        }
    })
    logger.info('starting gamerdeets bot')

    logger.info('initalising DB')
    await db.sync()
    logger.info('connecting to discord')
    await discord.login(process.env.DISCORD_TOKEN)
    logger.info('gamerdeets bot ready!')
    discord.client.on('message', cmd.messageHandler)
}

module.exports = { 
    start
}
