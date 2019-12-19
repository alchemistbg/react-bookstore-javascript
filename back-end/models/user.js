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
    }],
    // cart: {

    // }
});

userSchema.virtual('fullName')
    .get(
        function () {
            return `${this.firstname} ${this.lastname}`;
        }
    )

userSchema.methods = {
    matchPassword: async function (password) {
        // console.log(password)
        // console.log(this.password)
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
            console.log(salt);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            console.log(hashedPassword)
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


userSchema.set('toJSON', { getters: true, virtuals: true });
const User = mongoose.model('user', userSchema);

module.exports = User;
module.exports.seedUsers = () => {
    User.find({})
        .then((users) => {
            if (users.length > 0) {
                return
            }

            console.log('User collection is empty. It will be seeded with sample collection.');
            const userSeed = [
                {
                    "firstname": "Unufri",
                    "lastname": "Penchev",
                    "username": "UnChev",
                    "password": "unufriPass",
                    "email": "unufri@unufri.com",
                    "userRole": "user",
                    "orders": [],
                },
                {
                    "firstname": "Petar",
                    "lastname": "Ivanov",
                    "username": "peshov",
                    "password": "peshoPass",
                    "email": "pesho@pesho.com",
                    "userRole": "user",
                    "orders": [],
                },

            ];

            User.create(userSeed)
                .then(() => console.log(`Users collection seeded successfully with ${userSeed.length} users!`))
                .catch((error) => console.log(error));
        })
        .catch();
}