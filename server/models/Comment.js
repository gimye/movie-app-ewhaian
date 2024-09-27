const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    movieId: {
        type: String,   
    },
    responseTo: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String
    }
}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema);
module.exports = { Comment }