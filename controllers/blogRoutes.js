const router = require('express').Router()
const { User, Blog, Comment } = require('../models')
const passport = require('passport')


// all
router.get('/blogs', passport.authenticate('jwt'), (req, res) => {
  Blog.findAll()
    .then(blogs => res.json(blogs))
    .catch(err => console.log(err))
})
// user all
router.get('/blogs/user', passport.authenticate('jwt'), (req, res) => {
  res.json(req.user.blogs)
})

router.get('/blogs/:id', passport.authenticate('jwt'), (req, res) => {
  Blog.findOne({
    where: { id: req.params.id },
    include: [{
      model: Comment
    }]
  })
    .then(blogs => res.json(blogs))
    .catch(err => console.log(err))
})

router.post('/blogs', passport.authenticate('jwt'), (req, res) => {
  Blog.create({
    title: req.body.title,
    text: req.body.text,
    user_id: req.user.id
  })
    .then(blog => res.json(blog))
    .catch(err => console.log(err))
  })

router.put('/blogs/:id', passport.authenticate('jwt'), (req, res) =>
  Blog.update(
    {
      title: req.body.title,
      text: req.body.text,
    },
    {
      where: { id: req.params.id },
    },
  )

    .then(() => res.sendStatus(200))
    .catch(err => console.log(err))
)

router.delete('/blogs/:id', passport.authenticate('jwt'), (req, res) => Blog.destroy({ where: { id: req.params.id } })
  .then(() => res.sendStatus(200))
  .catch(err => console.log(err)))

module.exports = router
