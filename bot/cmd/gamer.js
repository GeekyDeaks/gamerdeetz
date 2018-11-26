'use strict'

const logger = require('../lib/logger')

async function gamer(cmd) {

    await cmd.channel.send('looking up ')

}

module.exports = {
    exec: gamer,
    name: 'gamer',
    alias: ['g', 'find', 'who'],
    description: 'lookup gamer details'
}