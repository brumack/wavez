const express = require('express')
const router = express.Router()
const Beach = require('../models/beach')
const middleware = require('../middleware')
const getWeather = require('../scripts/getWeather')

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
    
    let lat, lon
    
    try {
        lat = Number(beach.coordinates.lat);
        lon = Number(beach.coordinates.lon);
    } catch (e) {
        console.log(e)
        req.flash("error", `Error adding beach. Invalid coordinates.`)
        return
    }
    
    if (lat * 1000 < -90000 || lat * 1000 > 90000) {
        req.flash("error", `Error adding beach. Invalid coordinates.`)
        res.redirect('/beaches/new')
    } else if (lon * 1000 < -180000 || lat * 1000 > 180000) {
        req.flash("error", `Error adding beach. Invalid coordinates.`)
        res.redirect('/beaches/new')
    } else {
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
    }
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
            getWeather(beach.coordinates.lat, beach.coordinates.lon, (err,weather) => {
                if (err) {
                    console.log('there was an error')
                    req.flash("error", `Error obtaining weather. ${err.message}`)
                    res.render('./beaches/show', {beach: beach, weather: null})
                } else {
                    res.render('./beaches/show', {beach: beach, weather: weather})
                }
            })
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