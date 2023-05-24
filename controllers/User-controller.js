const { User, Thought } = require("../models");
const { ObjectId } = require('mongoose').Types;
//!GET all users
module.exports = {
    getUsers(req, res) {
        User.find()
            // .select('-__v')
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //!GET a single user by _id

    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            // .select('-__v')
            // .populate({
            //     path: 'thoughts',
            //     select: '-__v' // Exclude the __v field from populated thoughts
            // })
            // .populate('friends')
            .then((user) =>
                !user
                    ? res.status(404).json({
                        message: 'No user with that ID'
                    })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },


    //! create a new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    //! update a user by _id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // //!DELETE a user by _id
    deleteUser(req, res) {
        User.findOneAndDelete(
            { _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this ID" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } })
            )

            .then(() =>
                res.json({ message: "User and thought deleted" })
            )
            .catch((err) => res.status(500).json(err));
    },
    //!add friend to user
    // addFriend(req, res) {
    //     User.findOneAndUpdate(
    //         { _id: req.params.userId },
    //         { $addToSet: { friends: req.body } },
    //         { runValidators: true, new: true }
    //     )
    //         .then((user) =>
    //             !user
    //                 ? res
    //                     .status(404).json({ message: "No user with that ID" })

    //                 : res.json(user)
    //         )
    //         .catch((err) => res.status(500).json(err));
    // },
    addFriend(req, res) {
        const { userId, friendId } = req.params;

        User.findOneAndUpdate(
            { _id: userId },
            { $addToSet: { friends: friendId } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    //! `DELETE` to remove a friend from a user's friend list

    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(
                (user) =>
                    !user
                        ? res.status(404).json({ message: "No user with this ID" })
                        : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

};