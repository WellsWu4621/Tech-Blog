const { Sequelize } = require('sequelize')

let connection = new Sequelize(process.env.LOCAL_DB, process.env.LOCAL_UN, process.env.LOCAL_PW, {
  host: 'localhost',
  dialect: 'mysql'
})

if (process.env.JAWSDB_URL) {
  connection = new Sequelize(process.env.JAWSDB_URL)
}

module.exports = connection