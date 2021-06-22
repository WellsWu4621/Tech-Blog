const router = require('express').Router()
const { User, Blog, Comment } = require('../models')
const passport = require('passport')

router.get('/blogs', (req, res) => {
  Blog.findAll({
    attributes: [
      'id',
      'title',
      'text',
      'user_id'
    ],
    include: [{
      model: Comment,
      as: 'comments',
      attributes: ['id', 'comment_text', 'user_id']
    }]
  }
})
  .then(blogs => res.json(blogs))
  .catch(err => console.log(err))
})

router.get('/blogs/:id', (req, res) => {
  Blog.findOne({
    where: { id: req.params.id },
    attributes: [
      'id',
      'title',
      'text',
      'user_id'
    ],
    include: [{
      model: Comment,
      as: 'comments',
      attributes: ['id', 'comment_text', 'user_id']
    }]
  })
    .then(blogs => res.json(blogs))
    .catch(err => console.log(err))
})

router.post('/blogs', passport.authenticate('jwt'), (req, res) =>
  Blog.create({
    title: req.body.title,
    text: req.body.text,
    user_id: req.user.id
  })
    .then(item => res.json(item))
    .catch(err => console.log(err)))

router.put('/blogs/:id', passport.authenticate('jwt'), (req, res) =>
  Blog.update(
    {
      where: { id: req.params.id },
    },
    {
      title: req.body.title,
      text: req.body.text,
    },
  )

    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
)

router.delete('/blogs/:id', passport.authenticate('jwt'), (req, res) => Blog.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
