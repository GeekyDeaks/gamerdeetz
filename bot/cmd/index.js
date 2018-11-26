'use strict'

const logger = require('../lib/logger')
const fs = require('fs')
const path = require('path')

const prefix = process.env.CMD_PREFIX || 'g/'

const commands = {}

// load the commands
fs
    .readdirSync(__dirname)
    .filter(function (file) {
        // only load up named commands
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var filePath = path.join(__dirname, file)
        logger.debug('checking command file: %s', filePath)
        var cmd = require(filePath)
        if (!cmd) {
            return logger.error('failed to load command file: %s', filePath)
        }

        if (cmd.name) {
            // maybe we should check if the command already exists?
            logger.verbose('loading command %s', cmd.name)
            commands[cmd.name] = cmd
        }

        // sort out the aliases
        if (cmd.alias) {
            cmd.alias.forEach(function (alias) {
                logger.debug("adding alias '%s' for command '%s'", alias, cmd.name)
                commands[alias] = cmd
            })
        }
    })



async function messageHandler(msg) {

    logger.debug('message: %s', msg.content)
    if(!msg.content.toLowerCase().startsWith(prefix)) return

    const [name, ...args] = msg.content.slice(prefix.length).split(/ +/)

    logger.debug('message: %s, cmd: %s, args: %j', msg.content, name, args)

    const cmd = { name, args, channel: msg.channel, author: msg.author }

    try {
        if(commands[name]) await commands[name].exec(cmd)
    } catch(ex) {
        logger.error('failed to execute command %s: %s', name, ex.message)
        await msg.reply('Ooops something went unexpectedly wrong')
        throw ex
    }

}

module.exports = { 
    messageHandler,
    commands
}