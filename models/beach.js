const mongoose      = require('mongoose')

const beachSchema = new mongoose.Schema({
    name: String,
    image: String,
    desc: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ],
    coordinates: {
        lat: String,
        lon: String
    },
    city: String,
    created: Date
})

module.exports = mongoose.model("Beach", beachSchema);