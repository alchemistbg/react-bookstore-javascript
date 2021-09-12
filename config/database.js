const mongoose = require('mongoose');

const Book = require('./../models/Book');
const User = require('./../models/User');

const connectionSettings = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false
}

module.exports.connect = async () => {
	// await mongoose.connect("mongodb://localhost:27017/reactive", connectionSettings);
	mongoose.connect(process.env.DATABASE_URL, connectionSettings);
	console.log('MongoDB ready!');
}

module.exports.close = async () => {
	await mongoose.connection.close()
}

// mongoose.connect(process.env.DATABASE_URL, connectionSettings);
// mongoose.connect("mongodb://localhost:27017/reactive", connectionSettings);

// const db = mongoose.connection;
// console.log(db);
// db.once('open', (error) => {
// 	if (error) {
// 		console.log(error);
// 	}

// 	// console.log('MongoDB ready!');

// 	Book.seedBooks();
// 	User.seedUsers();

// });

// db.on('error', (reason) => {
// 	// console.log(reason);
// });

// module.exports = db;