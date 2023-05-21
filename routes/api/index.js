const router = require('express').Router();
const thoughtRoutes = require('./ThoughtRoutes');
const userRoutes = require('./UserRoutes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;