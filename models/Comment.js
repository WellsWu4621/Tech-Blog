const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db/config')

class Comment extends Model { }

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment_text: DataTypes.TEXT,
  blog_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'blogs',
      key: 'id'
    }
  },
}, { sequelize, modelName: 'comment', timeStamps: true })

module.exports = Comment