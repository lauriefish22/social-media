

const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/Thought-controller.js');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).delete(deleteThought);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

router.route('/:thoughtId/reactions').post(createReaction);

module.exports = router;