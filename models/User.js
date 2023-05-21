const { Schema, model } = require('mongoose');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,

        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                "Please fill a valid email address",
            ],
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought',
            }
        ],
        text: {
            type: String,
            minLength: 15,
            maxLength: 500,
        },
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',

            }],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);
const User = model('User', userSchema);
module.exports = User;
