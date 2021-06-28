const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db/config')

class Blog extends Model { }

Blog.init({
  title: DataTypes.STRING,
  text: DataTypes.TEXT,
  // user_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'Users',
  //     key: 'id'
  //   }
  // }
}, { sequelize, modelName: 'blogs', timeStamps: true })

module.exports = Blog
