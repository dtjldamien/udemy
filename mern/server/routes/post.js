const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/require-login')
const Post = mongoose.model('Post')

router.post('/createPost', requireLogin, (req, res) => {
    const { title, body, photo } = req.body
    if (!title || !body || !photo) {
        return res.status(422).json({ error: "Please fill up all the fields first!" })
    }
    console.log(req.user)
    // to ensure that password is not stored together with the post
    req.user.password = undefined
    const post = new Post({
        title,
        body,
        photo,
        postedBy: req.user
    })
    post.save().then(result => {
        res.json({ post: result })
    })
        .catch(error => {
            console.log(error)
        })
})

router.get('/allPosts', (req, res) => {
    Post.find()
        // shows postedby with all user details, instead of just user id
        .populate("postedBy", "_id name")
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/myPosts', requireLogin, (req, res) => {
    Post.find({ postedBy: req.user._id })
        .populate("postedBy", "_id name")
        .then(myPosts => {
            res.json({ myPosts })
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router