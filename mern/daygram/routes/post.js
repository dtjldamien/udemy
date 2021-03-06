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

router.get('/allPosts', requireLogin, (req, res) => {
    Post.find()
        // shows postedby with all user details, instead of just user id
        .populate("postedBy", "_id name displayPhoto")
        .populate("comments.postedBy", "_id name")
        // -createAt sorts in descending order
        .sort('-createdAt')
        .then(posts => {
            res.json({ posts })
        })
        .catch(err => {
            console.log(err)
        })
})

router.get('/getFollowingPosts', requireLogin, (req, res) => {
    // if postedBy in following
    Post.find({ postedBy: { $in: req.user.following } })
        // shows postedby with all user details, instead of just user id
        .populate("postedBy", "_id name displayPhoto")
        .populate("comments.postedBy", "_id name")
        // -createAt sorts in descending order
        .sort('-createdAt')
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

router.put('/like', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        // push will add to likes array
        $push: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put('/unlike', requireLogin, (req, res) => {
    Post.findByIdAndUpdate(req.body.postId, {
        // pull will remove from likes array
        $pull: { likes: req.user._id }
    }, {
        new: true
    }).exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})

router.put('/comment', requireLogin, (req, res) => {
    const comment = {
        text: req.body.text,
        postedBy: req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId, {
        // push will add to comments array
        $push: { comments: comment }
    }, {
        new: true
    })
        // populate the posted by field to show user id and name
        .populate("comments.postedBy", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, result) => {
            if (err) {
                return res.status(422).json({ error: err })
            } else {
                res.json(result)
            }
        })
})

router.delete('/deletePost/:postId', requireLogin, (req, res) => {
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(res)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
})

router.delete('/deleteComment/:postId/:commentId', requireLogin, (req, res) => {
    /*
    Post.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")
        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
            }
            if (post.postedBy._id.toString() === req.user._id.toString()) {
                post.remove()
                    .then(result => {
                        res.json(res)
                    }).catch(err => {
                        console.log(err)
                    })
            }
        })
        */
    return res.status(422).json({ error: err })
})

module.exports = router