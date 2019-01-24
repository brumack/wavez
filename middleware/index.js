const Comment = require('../models/comment')
const Beach = require('../models/beach')
const User = require('../models/user')

const middleware = {}

middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash("error", "Please log in.")
        res.redirect('/login')
    }
}

middleware.checkCommentAuthor = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, comment) => {
            if (err) {
                req.flash("error", "Comment not found.")
                res.redirect('back')
            } else if (comment.author.id.equals(req.user._id) || req.user.isAdmin){
                next()
            } else {
              req.flash("error", "Unauthorized action.")
              res.redirect('back')
            }
        })
    } else {
        console.log('Unauthenticated User')
        req.flash("error", "Please log in.")
        res.redirect('back')
    }
}

middleware.checkBeachAuthor = function(req, res, next) {
    if (req.isAuthenticated()) {
        Beach.findById(req.params.id, (err, beach) => {
            if (err) {
                req.flash("Beach not found.")
                res.redirect('back')
            } else if (beach.author.id.equals(req.user._id) || req.user.isAdmin){
                next()
            } else {
              req.flash("error", "Unauthorized action.")
              res.redirect('back')
            }
        })
    } else {
        console.log('Unauthenticated User')
        req.flash("error", "Please log in.")
        res.redirect('back')
    }
}

middleware.checkIfBanned = function (req, res, next) {
    if (req.isAuthenticated()) {
        if (req.isAuthenticated && req.user.isAdmin) {
            User.findById(req.params.id, (err, user) => {
                if (err) {
                    req.flash("User not found.")
                    res.redirect('back')
                } else if (user.isBanned) {
                    next(true)
                } else {
                    next(false)
                }
            })
        } else {
            req.flash("error", "Unauthorized.")
            res.redirect('/beaches')
        }
    } else {
        req.flash("error", "Please log in.")
        res.redirect('back')
    }
}

module.exports = middleware