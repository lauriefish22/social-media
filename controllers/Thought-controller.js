// const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require("../models");

//! get all thoughts
module.exports = {
    getThoughts(req, res) {
        Thought.find({})
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    //!  get a single thought by its `_id`
    getSingleThought(req, res) {
        Thought.findOne(
            { _id: req.params.thoughtId })
            // .select('-__v')
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "Nothing found with that ID" })
                } else {
                    res.json(thought);
                }
            })
            .catch((err) => res.status(500).json(err));
    },

    //!  create a new thought (don't forget to push the created thought's `_id` to the associated user's `thoughts` array field)
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOneAndUpdate(
                    { username: thought.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
                    .then((user) => res.json({ thought, user }));
            })
            .catch((err) => res.status(500).json(err));
    },

    //! `PUT` to update a thought by its `_id`
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought by that ID" })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    //! `DELETE` to remove a thought by its `_id`
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "no thought with this ID" })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtID } },
                        { new: true }
                    )
            )
            .then((user) => {
                if (!user) {
                    res.status(404).json({ message: "thought deleted but no user with that ID found" })
                } else {

                    res.json({ message: "thought deleted" });
                }
            })
            .catch((err) => res.status(500).json(err));
    },



    //?`/api/thoughts/:thoughtId/reactions`**

    //!`POST` to create a reaction stored in a single thought's `reactions` array field
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID" });
                } else {
                    res.json(thought);
                }
            })
            .catch((err) => res.status(500).json(err));
    },
    //! `DELETE` to pull and remove a reaction by the reaction's `reactionId` value
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thought) => {
                if (!thought) {
                    res.status(404).json({ message: "No thought with that ID" })
                } else {
                    res.json(thought);
                }
            })
            .catch((err) => res.status(500).json(err));
    },
};

















