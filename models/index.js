const User = require('./User.js')
const Blog = require('./Blog.js')
const Comment = require('./Comment')

User.hasMany(Blog, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

Blog.belongsTo(User, {
  foreignKey: 'user_id',
})

Comment.belongsTo(User, {
  foreignKey: 'user_id'
})

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
})

Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
  onDelete: 'CASCADE'
})

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})


module.exports = { User, Blog, Comment}
