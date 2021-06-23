const router = require('express').Router()


router.use('/api', require('./blogRoutes.js'))
router.use('/api', require('./userRoutes.js'))
router.use('/api', require('./commentRoutes.js'))
router.use('/', require('./homeRoutes.js'))

module.exports = router
