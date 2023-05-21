const { User, Thought } = require("../models");

//!GET all users
module.exports = {
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //!GET a single user by _id
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
            //?.select('-__v')
            .then(async (user) =>
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
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with this ID" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // //!DELETE a user by _id
    // deleteUser(req, res) {
    //     User.findOneAndDelete(
    //         { _id: req.params.userId })
    //         .then((user) =>
    //             !user
    //                 ? res.status(404).json({ message: "No user with this ID" })
    //        //?thoughts here? : 

    //         )
    //         .then(() => res.json({ message: "User and thought deleted" }))

    // },
    //!add friend to user
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res
                        .status(404).json({ message: "No user with that ID" })

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