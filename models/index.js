const Comment = require('./Comment')
const Blog = require('./Blog.js')
const User = require('./User.js')

User.hasMany(Blog, {
  foreignKey: 'user_id'
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id'
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Blog.hasMany(Comment, {
  foreignKey: 'blog_id'
});

module.exports = { Comment, Blog, User }
