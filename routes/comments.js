const express = require('express')
const router = express.Router({mergeParams: true})
const Beach = require('../models/beach')
const Comment = require('../models/comment')
const middleware = require('../middleware')

router.get(`/new`, middleware.isLoggedIn, (req, res) => {
    Beach.findById(req.params.id, (err, beach) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error: Beach not found. ${err.message}`)
            res.redirect('/beaches')
        } else {
            res.render(`./comments/new`, {beach: beach})
        }
    })
})

router.post('/', middleware.isLoggedIn, (req, res) => {
    Beach.findById(req.params.id, (err, beach) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error: Beach not found. ${err.message}`)
            res.redirect(`/beaches`)
        } else {
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err)
                    req.flash("error", `Error adding comment. ${err.message}`)
                    res.redirect(`/beaches`)
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.created = new Date()
                    comment.save()
                    beach.comments.push(comment)
                    beach.save()
                    req.flash("success", "Comment added")
                    res.redirect(`/beaches/${beach._id}`)
                }
            })
        }
    })
})

router.get('/:comment_id/edit', middleware.checkCommentAuthor, (req, res) => {
    Comment.findById(req.params.comment_id, (err, comment) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error: Comment not found. ${err.message}`)
            res.redirect('back')
        } else {
            res.render('./comments/edit', {comment: comment, beach_id: req.params.id})
        }
    })
})

router.put('/:comment_id', middleware.checkCommentAuthor, (req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, comment) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error updating comment. ${err.message}`)
            res.redirect('back')
        } else {
            req.flash("success", "Comment updated")
            res.redirect(`/beaches/${req.params.id}`)
        }
    }) 
})

router.delete('/:comment_id', middleware.checkCommentAuthor, (req, res) => {
    Comment.findByIdAndDelete(req.params.comment_id, err => {
        if (err) {
            console.log(err)
            req.flash("error", `Error deleting comment. ${err.message}`)
            res.redirect(`back`)
        } else {
            req.flash("success", "Comment deleted")
            res.redirect(`/beaches/${req.params.id}`)
        }
    })
})

module.exports = router