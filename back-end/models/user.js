const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const saltRounds = 10;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    userName: {
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
    address: {
        street: { type: String },
        zipCode: { type: String },
        city: { type: String },
        country: { type: String }
    },
    userRole: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        // required: true
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: 'order'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    // userInfo: {
    //     p1: { type: String },
    //     p2: { type: String },
    //     p3: { type: String }
    // }
    // cart: {

    // }
});

userSchema.virtual('fullName')
    .get(
        function () {
            return `${this.firstName} ${this.lastName}`;
        }
    )

userSchema.methods = {
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
                    "firstName": "Unufri",
                    "lastName": "Penchev",
                    "userName": "UnChev",
                    "password": "unufriPass",
                    "email": "unufri@unufri.com",
                    "userRole": "user",
                    "orders": [],
                    "comments": []
                },
                {
                    "firstName": "Petar",
                    "lastName": "Ivanov",
                    "userName": "peshov",
                    "password": "peshoPass",
                    "email": "pesho@pesho.com",
                    "userRole": "user",
                    "orders": [],
                    "comments": []
                },

            ];

            User.create(userSeed)
                .then(() => console.log(`Users collection seeded successfully with ${userSeed.length} users!`))
                .catch((error) => console.log(error));
        })
        .catch();
}