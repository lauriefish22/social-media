# SOCIAL MEDIA API

## SEE HOW IT WORKS!

-[Recording](https://drive.google.com/file/d/1ldyPdW1ZqqAZJyHRowqWbocc0b_OH4RX/view)

## SITE SCREENSHOT

This is an example of a thought and a reaction to go along with it.

![assets](./assets/Screenshot%202023-05-24%20at%204.41.17%20PM.png)

## TECHNOLOGY USED

-   [MOMENT.JS](https://momentjs.com/)
-   [EXPRESS](https://expressjs.com/)
-   [MONGOOSE](https://mongoosejs.com/)
-   [MONGODB](https://www.mongodb.com/)
-   [INSOMNIA](https://insomnia.rest/products/insomnia)

## DESCRIPTION

This project is an API for a Social Network. With this app, people can create a profile as well as share thoughts and add friends. Users can also update and delete thoughts, friends and reactions that go along with thoughts.

## LEARNING POINTS

This project was a great way to practice using API's and Insomnia as well as being introduced to MongoDB and Mongoose. It was a challenge to make sure everything is organized and labeled correctly to keep things in sync and "talking" to each other. As our code gets more complex, this of course becomes extra important.

## CODE EXAMPLE

An example of the code to update a thought. This is tested in Insomnia.

```updateThought(req, res) {
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
```
