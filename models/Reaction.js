const { Schema, Types } = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        username: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (date) => moment(date).format("MMM DD, YYYY"),
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);



module.exports = reactionSchema;
