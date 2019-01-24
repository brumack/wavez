const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const middleware = require('../middleware')

router.get('/', (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please log in")
        return res.render(`login`)
    } else {
        if (req.isAuthenticated && req.user.isAdmin) {
            User.find({}, (err, users) => {
                if (err) {
                    console.log(err)
                    req.flash("error", `Request Error: ${err.message}`)
                    res.redirect('back')
                } else {
                    res.render('users', {users, self: req.user})
                }
            })
        } else {
            req.flash("error", "Unauthorized")
            res.redirect('/beaches')
        }
    }
})

router.put('/:user_id', middleware.checkIfBanned, (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please log in")
        return res.render(`login`)
    } else {
        if (req.isAuthenticated && req.user.isAdmin) {
            User.findByIdAndUpdate(req.params.user_id, (err, users) => {
                if (err) {
                    console.log(err)
                    req.flash("error", `Request Error: ${err.message}`)
                    res.redirect('back')
                } else {
                    res.render('users', {users, self: req.user})
                }
            })
        } else {
            req.flash("error", "Unauthorized")
            res.redirect('/beaches')
        }
    }
})

router.delete('/:user_id', (req, res) => {
    if (!req.isAuthenticated()) {
        req.flash("error", "Please log in")
        return res.render(`login`)
    } else {
        if (req.isAuthenticated && req.user.isAdmin) {
            User.findByIdAndDelete(req.params.user_id, err => {
                if (err) {
                    console.log(err)
                    req.flash("error", `Error deleting user. ${err.message}`)
                    res.redirect(`back`)
                } else {
                    req.flash("success", "User deleted")
                    res.redirect(`back`)
                }
            })
        }
    }
})

module.exports = router