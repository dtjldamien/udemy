const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    displayPhoto: {
        type: String,
        default: "https://res-console.cloudinary.com/dtjldamien/thumbnails/v1/image/upload/v1589129853/SU1HXzA0MzdfdzFjaWxj/preview"
    },
    followers: [{
        type: ObjectId,
        ref: "User"
    }],
    following: [{
        type: ObjectId,
        ref: "User"
    }]
})

mongoose.model("User", userSchema)