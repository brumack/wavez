const express = require('express')
const router = express.Router()
const Beach = require('../models/beach')
const middleware = require('../middleware')

router.get('/', (req, res) => {
    Beach.find({}, (err, beaches) => {
        if (err) {
            console.log(err)
        } else {
            res.render('beaches/index', {beaches: beaches})
        }
    })
})

router.post('/', middleware.isLoggedIn, (req, res) => {
    const beach = req.body.beach
    const author = {
        id: req.user._id,
        username: req.user.username
    }
    
    beach.author = author
    beach.created = new Date()
 
    Beach.create(beach, (err, result) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error adding beach. ${err.message}`)
        } else {
            req.flash("success", "Beach added")
            res.redirect(`beaches/${result._id}`)
        }
    })
})

router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('beaches/new')
})

router.get(`/:id`, (req, res) => {
    Beach.findById(req.params.id).populate(`comments`).exec((err, beach) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error: Beach not found. ${err.message}`)
            res.redirect('back')
        } else {
            res.render('./beaches/show', {beach: beach})
        }
    })
})

router.get('/:id/edit', middleware.checkBeachAuthor, (req,res) => {
    Beach.findById(req.params.id, (err, beach) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error: Beach not found. ${err.message}`)
        } else { 
            res.render('beaches/edit', {beach: beach})
        }
    })
})

router.put('/:id', middleware.checkBeachAuthor, (req, res) => {
    Beach.findByIdAndUpdate(req.params.id, req.body.beach, (err, beach) => {
        if (err) {
            console.log(err)
            req.flash("error", `Error updating beach. ${err.message}`)
        } else {
            req.flash("success", "Beach updated")
            res.redirect(`/beaches/${beach._id}`)
        }
    })
})

router.delete(`/:id`, middleware.checkBeachAuthor, (req, res) => {
    Beach.findByIdAndDelete(req.params.id, err => {
        if (err) {
            console.log(err)
            req.flash("error", `Error deleting beach. ${err.message}`)
            res.redirect('/beaches')
        } 
        req.flash("success", "Beach deleted")
        res.redirect('/beaches')
    })
})

module.exports = router