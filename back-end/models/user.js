const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        // required: true
    },
    orders: [{
        type: Schema.Types.ObjectId,
        res: 'order'
    }]
});

userSchema.methods = {
    //async-based version
    matchPassword: async function (password) {
        return await bcrypt.compare(password, this.password);
    }

    //promise-based
    // matchPassword: function (password) {
    //     return bcrypt.compare(password, this.password);
    // }
};

//async-based pre-save
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;
            // next();
        } catch (error) {
            //TODO
        }
    }
    next();
});

//promise-based pre-save
// userSchema.pre('save', function (next) {
//     if (this.isModified('password')) {
//         bcrypt.genSalt(saltRounds, (err, salt) => {
//             if (err) {
//                 next(err);
//                 return;
//             }
//             bcrypt.hash(this.password, salt, (err, hash) => {
//                 if (err) {
//                     next(err);
//                     return;
//                 }
//                 this.password = hash;
//                 next();
//             });
//         });
//         return;
//     }
//     next();
// });

module.exports = mongoose.model('user', userSchema);