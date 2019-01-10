const   methodOverride  = require('method-override'),
        LocalStrategy   = require('passport-local'),
        flash    = require('connect-flash'),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        passport        = require('passport'),
        express         = require('express'),
        User            = require('./models/user'),
        ejs             = require('ejs'),
        app             = express()
        
const   beachRoutes     = require('./routes/beaches'),
        commentRoutes   = require('./routes/comments'),
        indexRoutes     = require('./routes/index')

// mongoose.connect(`mongodb://localhost:27017/beach_camp`, { useNewUrlParser: true })
mongoose.connect(`mongodb://brad.rumack:04MiniMC40@ds153304.mlab.com:53304/wavez`, { useNewUrlParser: true })
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

// const seedDB = require('./seed')()

app.listen(process.env.PORT, process.env.IP, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})