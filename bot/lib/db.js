'use strict'

const Sequelize = require('sequelize')
const sequelize = new Sequelize('sqlite:db/gamerdeets.sqlite', {
    sync: false
})

const Detail = sequelize.define('detail', {
    id: { type: Sequelize.BIGINT, primaryKey: true },
    user_id: Sequelize.STRING,
    type: Sequelize.STRING,
    value: Sequelize.STRING
})

module.exports = {
    Detail,
    sync: sequelize.sync,
    query: sequelize.query
}