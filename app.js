const   methodOverride  = require('method-override'),
        LocalStrategy   = require('passport-local'),
        flash           = require('connect-flash'),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        express         = require('express'),
        User            = require('./models/user'),
        ejs             = require('ejs'),
        app             = express()
        
const   beachRoutes     = require('./routes/beaches'),
        commentRoutes   = require('./routes/comments'),
        indexRoutes     = require('./routes/index'),
        userRoutes      = require('./routes/users')

mongoose.connect(process.env.DATABASEURL, { useNewUrlParser: true})

app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static(__dirname + `/public`))
app.use(methodOverride(`_method`))
app.use(flash())

// USER AUTH AND SESSIONS
app.use(require('express-session')({
    secret: "Fquhugads",
    resave: false,
    saveUnitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})

// ROUTING
app.use(indexRoutes)
app.use('/beaches/:id/comments', commentRoutes)
app.use('/beaches', beachRoutes)
app.use('/users', userRoutes)

process.on('uncaughtException', function (err) {
    console.log(err);
}); 

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})