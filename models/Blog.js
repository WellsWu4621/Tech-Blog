const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Blog extends Model { }

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  text: DataTypes.TEXT,
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  }
}, { sequelize, modelName: 'blog' })

module.exports = Blog
