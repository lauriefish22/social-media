const express = require('express');
const router = express.Router();
const thoughtRoutes = require('./Thought-routes.js');
const userRoutes = require('./User-routes.js');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;