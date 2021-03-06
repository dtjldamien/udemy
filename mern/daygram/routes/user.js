const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const requireLogin = require("../middleware/require-login")
const Post = mongoose.model("Post")
const User = mongoose.model("User")

router.get('/user/:userId', requireLogin, (req, res) => {
    User.findOne({ _id: req.params.userId })
        .select("-password")
        .then(user => {
            Post.find({ postedBy: req.params.userId })
                .populate("postedBy", "_id name email followers following")
                .exec((err, posts) => {
                    if (err) {
                        return res.status(422).json({ error: err })
                    }
                    res.json({ user, posts })
                })
        }).catch(err => {
            return res.status(404).json({ error: "User not found!" }) // not found
        })
})

router.put('/follow', requireLogin, (req, res) => {
    // current user follow another user
    User.findByIdAndUpdate(req.body.followId, {
        $push: { followers: req.user._id }
    }, {
        new: true,
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: { following: req.body.followId }
        }, {
            new: true
        }).select("-password")
            .then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({ error: err })
            })
    })
})

router.put('/unfollow', requireLogin, (req, res) => {
    // current user follow another user
    User.findByIdAndUpdate(req.body.unfollowId, {
        $pull: { followers: req.user._id }
    }, {
        new: true,
    }, (err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: { following: req.body.unfollowId }
        }, {
            new: true
        }).select("-password")
            .then(result => {
                res.json(result)
            }).catch(err => {
                return res.status(422).json({ error: err })
            })
    })
})

router.put('/updateDp', requireLogin, (req, res) => {
    User.findByIdAndUpdate(req.user._id, { $set: { displayPhoto: req.body.displayPhoto } },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "Unable to update your display photo!" })
            }
            res.json(result)
        })
})

router.post('/searchUsers', (req, res) => {
    let userPattern = new RegExp("^" + req.body.query)
    User.find({ email: { $regex: userPattern } })
        .then(user => {
            res.json({ user })
        }).catch(err => {
            console.log(err)
        })
})

module.exports = router;
