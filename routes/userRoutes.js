const router = require('express').Router()
const { User, Blog, Comment } = require('../models')
const jwt = require('jsonwebtoken')

router.post('/users/register', (req, res) => {
  const { name, email, username } = req.body
  User.register(new User({ name, email, username }), req.body.password, err => {
    if (err) { console.log(err) }
    res.sendStatus(200)
  })
})

router.post('/users/login', (req, res) => {
  User.authenticate()(req.body.username, req.body.password, (err, user) => {
    if (err) { console.log(err) }
    res.json(user ? jwt.sign({ id: user.id }, process.env.SECRET) : null)
  })
})

router.get("/users", passport.authenticate('jwt'), (req, res) => {
  User.findAll({
    attributes: ["id", "username", "email"],
    include: [
      {
        model: Blog,
        as: "blogs",
        attributes: ["id", "title", "text"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "comment_text", "post_id"],
      },
    ],
  })
    .then(userblogs => res.json(userblogs))
    .catch(err => console.log(err))
})

module.exports = router
