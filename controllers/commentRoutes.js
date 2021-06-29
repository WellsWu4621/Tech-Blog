const router = require('express').Router()
const { User, Blog, Comment } = require('../models')
const passport = require('passport')
const sequelize = require('../db/config')

router.get('/comments', passport.authenticate('jwt'), (req, res) => {
  Comment.findAll({
    attributes: ['id', 'comment_text', 'user_id', 'blog_id'],
    include: {
      model: User,
      as: 'user',
      attributes: ["name"],
    }
  })
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
})

router.get('/comments/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.findOne({
    where: { id: req.params.id },
    attributes: ['id', 'comment_text', 'user_id', 'blog_id'],
    include: {
      model: User,
      as: 'user',
      attributes: ["name"],
    }
  })
    .then(comments => res.json(comments))
    .catch(err => console.log(err))
})

router.post('/comments', passport.authenticate('jwt'), (req, res) => {
  Comment.create({
    comment_text: req.body.comment_text,
    user_id: req.user.id,
    blog_id: req.body.blog_id
  })
    .then(comment => res.json(comment))
    .catch(err => console.log(err))
})

router.put('/comments/:id', passport.authenticate('jwt'), (req, res) => {
  Comment.update({
    comment_text: req.body.comment_text,
  },
    {
      where: { id: req.params.id },
    })
    .then(comment => res.json(comment))
    .catch(err => console.log(err))
})


router.delete('/blogs/:id', passport.authenticate('jwt'), (req, res) => Blog.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router