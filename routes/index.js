const express = require('express')
const router = express.Router()
const passport = require('passport')
const User = require('../models/user')
const middleware = require('../middleware')

router.get('/', (req, res) => {
    res.render('landing')
})

router.get(`/login`, (req, res) => {
    if (!req.isAuthenticated()) {
        return res.render(`login`)
    } 
    req.flash("error", "You are already logged in")
    res.redirect('/beaches')
})

router.post(`/login`, passport.authenticate(`local`, 
    {
        successRedirect: `/beaches`,
        failureRedirect: `/login`
    })
)

router.get('/signup', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.render('register')
    }
    req.flash("error", `User already logged in.`)
    res.redirect('/beaches')
})

router.get('/logout', middleware.isLoggedIn, (req, res) => {
    req.logout()
    req.flash("success", "Logged out")
    res.redirect('/beaches')
})

router.post('/signup', (req, res) => {
    const newUser = new User({username: req.body.username})
    if (req.body.adminCode === 'qwerty12345') {
        newUser.isAdmin = true
    } else if (req.body.adminCode !== 'qwerty12345' && req.body.adminCode !== '') {
        req.flash("error", `Admin code incorrect. Please try again or leave blank to register as regular user.`)
        res.redirect('/signup') 
    }
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error: ${err.message}`)
            return res.render(`register`, {currentUser: req.user})
        }
        
        passport.authenticate(`local`)(req, res, () => {
            req.flash("success", `Welcome ${req.user.username}!`)
            res.redirect('/beaches')
        })
    })
})

module.exports = router