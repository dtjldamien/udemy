const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')

router.get('/', (req, res) => {
    res.send("Hello!")
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(422).json({ error: "Please ensure you have filled up all the fields" })
    }
    // searches mongodb to check if email is used, else sign up
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "Email is already registered to another user!" })
            }
            // 10 is the salt
            bcrypt.hash(password, 10)
                .then(hashedpassword => {
                    const user = new User({
                        name,
                        email,
                        password: hashedpassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "Signed up successfully!" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(error => {
            console.log(err)
        })
})

router.post('/signin', (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "Please provide your login credentials!" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "Invalid email address!" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        res.json({ message: "Successfully signed in!" })
                    } else {
                        return res.status(422).json({ error: "Invalid password!" })
                    }
                })
                .catch(error => {
                    console.log(error)
                })
        })
})

module.exports = router