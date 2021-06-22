const { Model, DataTypes } = require('sequelize')
const sequelize = require('../db')

class Comment extends Model { }

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  comment_text: DataTypes.TEXT,
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'user',
      key: 'id'
    }
  },
  blog_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'blog',
      key: 'id'
    }
  },
}, { sequelize, modelName: 'comment' })

module.exports = Comment