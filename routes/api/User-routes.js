const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,

} = require('../../controllers/User-controller.js');

router.route('/').get(getUsers).post(createUser);

router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

module.exports = router;

