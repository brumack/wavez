const   passportLocalMongoose = require('passport-local-mongoose'),
        mongoose              = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    created: {
        type: Date,
        default: new Date()
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    isAdmin : {
        type: Boolean,
        default: false
    }
})

UserSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', UserSchema)
