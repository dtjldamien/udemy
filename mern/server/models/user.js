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
        default: "https://res.cloudinary.com/dtjldamien/image/upload/v1589170042/photo_2020-02-06_17-25-23_pal8z5.jpg"
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