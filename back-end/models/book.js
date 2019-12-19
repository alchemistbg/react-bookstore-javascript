const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    genres: [{
        type: Schema.Types.ObjectId,
        ref: 'genre'
    }],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'comment'
    }],
    addedOn: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['upcoming', 'available'],
        default: 'available'
    },
    soldNumber: {
        type: Number,
        default: 0
    }
});

const Book = mongoose.model('book', bookSchema);

module.exports = Book;
module.exports.seedBooks = () => {
    Book.find({})
        .then(books => {
            if (books.length > 0) {
                return;
            }

            console.log('Book collection is empty. It will be seeded with sample collection.');
            const booksSeed = [
                {
                    "title": "Harry Potter and the Sorcerer's Stone",
                    "author": "J.K. Rowling",
                    "publisher": "Arthur A. Levine Books/Scholastic Inc.",
                    "isbn": "0590353403",
                    "price": "10.99",
                    "genres": [
                        "5df63a787c4e44750094ff89"
                    ],
                    "comments": [

                    ],
                    "status": "upcoming",
                },
                {
                    "title": "Harry Potter and the Chamber of Secrets",
                    "author": "J.K. Rowling",
                    "publisher": "Arthur A. Levine Books/Scholastic Inc.",
                    "isbn": "0439064864",
                    "price": "12.99",
                    "genres": [
                        "5df63a787c4e44750094ff89"
                    ],
                    "comments": [

                    ],
                    "status": "upcoming",
                },
                {
                    "title": "Harry Potter and the Prisoner of Azkaban",
                    "author": "J.K. Rowling",
                    "publisher": "Arthur A. Levine Books/Scholastic Inc.",
                    "isbn": "043965548X",
                    "price": "13.99",
                    "genres": [
                        "5df63a787c4e44750094ff89"
                    ],
                    "comments": [

                    ],
                    "status": "upcoming",
                },
                {
                    "title": "Harry Potter and the Goblet of Fire",
                    "author": "J.K. Rowling",
                    "publisher": "Arthur A. Levine Books/Scholastic Inc.",
                    "isbn": "0439139597",
                    "price": "14.99",
                    "genres": [
                        "5df63a787c4e44750094ff89"
                    ],
                    "comments": [

                    ]
                },
                {
                    "title": "Harry Potter and the Order of the Phoenix",
                    "author": "J.K. Rowling",
                    "publisher": "Arthur A. Levine Books/Scholastic Inc.",
                    "isbn": "0439358078",
                    "price": "13.99",
                    "genres": [
                        "5df63a787c4e44750094ff89"
                    ],
                    "comments": [

                    ],
                    "status": "upcoming",
                },
                {
                    "title": "Harry Potter and the Half-Blood Prince",
                    "author": "J.K. Rowling",
                    "publisher": "Arthur A. Levine Books/Scholastic Inc.",
                    "isbn": "0439785960",
                    "price": "15.99",
                    "genres": [
                        "5df63a787c4e44750094ff89"
                    ],
                    "comments": [

                    ],
                    "status": "upcoming",
                },
                {
                    "title": "Harry Potter and the Deathly Hallows",
                    "author": "J.K. Rowling",
                    "publisher": "Arthur A. Levine Books/Scholastic Inc.",
                    "isbn": "0545010225",
                    "price": "19.99",
                    "genres": [
                        "5df63a787c4e44750094ff89"
                    ],
                    "comments": [

                    ],
                    "status": "upcoming",
                },
                {
                    "title": "The Hitch Hiker's Guide to the Galaxy: A Trilogy in Five Parts",
                    "author": "Douglas Adams",
                    "publisher": "Wings Books",
                    "isbn": "0330437984",
                    "price": "19.95",
                    "genres": [
                        "5df63c49e5ea364c142d4c90",
                        "5df63a227c4e44750094ff88"
                    ],
                    "comments": [

                    ],
                    "status": "upcoming",
                },
                {
                    "title": "The Hunger Games",
                    "author": "Suzanne Collins",
                    "publisher": "Scholastic Press",
                    "isbn": "0439023483",
                    "price": "15.99",
                    "genres": [
                        "5df63a227c4e44750094ff88",
                        "5df63a8b7c4e44750094ff8a"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 15
                },
                {
                    "title": " Catching Fire",
                    "author": "Suzanne Collins",
                    "publisher": "Scholastic Press",
                    "isbn": "0439023491",
                    "price": "17.99",
                    "genres": [
                        "5df63a227c4e44750094ff88",
                        "5df63a8b7c4e44750094ff8a"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 19
                },
                {
                    "title": "Mockingjay",
                    "author": "Suzanne Collins",
                    "publisher": "Scholastic Press",
                    "isbn": "0439023513",
                    "price": "19.99",
                    "genres": [
                        "5df63a227c4e44750094ff88",
                        "5df63a8b7c4e44750094ff8a"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 20
                },
                {
                    "title": "It",
                    "author": "Stephen King",
                    "publisher": "New English Library ",
                    "isbn": "0670813028",
                    "price": "15.49",
                    "genres": [
                        "5df63a197c4e44750094ff87",
                        "5df63a8b7c4e44750094ff8a",
                        "5df63b2176145772e05bfd08"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 22
                },
                {
                    "title": "11.22.63 ",
                    "author": "Stephen King",
                    "publisher": "Hodder & Stoughton",
                    "isbn": "1444727338",
                    "price": "21.99",
                    "genres": [
                        "5df63a197c4e44750094ff87",
                        "5df63a8b7c4e44750094ff8a",
                        "5df63b2176145772e05bfd08"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 11
                },
                {
                    "title": "The Green Mile",
                    "author": "Stephen King",
                    "publisher": "Penguin Signet",
                    "isbn": "0451933028",
                    "price": "28.99",
                    "genres": [
                        "5df63a197c4e44750094ff87",
                        "5df63a8b7c4e44750094ff8a",
                        "5df63b2176145772e05bfd08"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 30
                },
                {
                    "title": "Truckers",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0552525952",
                    "price": "6.99",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 26
                },
                {
                    "title": "Diggers",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0552525863",
                    "price": "6.99",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 33
                },
                {
                    "title": "Wings",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0385400187",
                    "price": "6.99",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 32
                },
                {
                    "title": "The Colour of Magic ",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0552124753",
                    "price": "6.95",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 55
                },
                {
                    "title": "The Light Fantastic",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0061020702",
                    "price": "6.95",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 58
                },
                {
                    "title": "Small Gods",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0552152978",
                    "price": "6.95",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 41
                },
                {
                    "title": "Guards! Guards!",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "9780061440496",
                    "price": "6.95",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 45
                },
                {
                    "title": "Reaper Man",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0552166685",
                    "price": "6.95",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 48
                },
                {
                    "title": "The Truth",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0413771164",
                    "price": "6.95",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 46
                },
                {
                    "title": "The Wee Free Men",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0552562904",
                    "price": "6.95",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 48
                },
                {
                    "title": "Going Postal",
                    "author": "Terry Pratchett",
                    "publisher": "Corgi Books",
                    "isbn": "0060502932",
                    "price": "6.95",
                    "genres": [
                        "5df63a787c4e44750094ff89",
                        "5df63c49e5ea364c142d4c90"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 80
                },
                {
                    "title": "Red Dragon",
                    "author": "Thomas Harris",
                    "publisher": "Arrow",
                    "isbn": "039912442X",
                    "price": "12.49",
                    "genres": [
                        "5df63a8b7c4e44750094ff8a"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 61
                },
                {
                    "title": " The Silence of the Lambs",
                    "author": "Thomas Harris",
                    "publisher": "Arrow",
                    "isbn": "0312022824",
                    "price": "12.49",
                    "genres": [
                        "5df63a8b7c4e44750094ff8a"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 58
                },
                {
                    "title": "Hannibal",
                    "author": "Thomas Harris",
                    "publisher": "Arrow",
                    "isbn": "3453177746",
                    "price": "12.49",
                    "genres": [
                        "5df63a8b7c4e44750094ff8a"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 48
                },
                {
                    "title": "Hannibal Rising",
                    "author": "Thomas Harris",
                    "publisher": "Arrow",
                    "isbn": "0434014087",
                    "price": "12.49",
                    "genres": [
                        "5df63a8b7c4e44750094ff8a"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 52
                },
                {
                    "title": "The Hobbit",
                    "author": "J.R.R. Tolkien",
                    "publisher": "HarperCollins Publishers",
                    "isbn": "0007458428",
                    "price": "9.95",
                    "genres": [
                        "5df63a227c4e44750094ff88"
                    ],
                    "comments": [

                    ]
                },
                {
                    "title": "The Fellowship of the Ring ",
                    "author": "J.R.R. Tolkien",
                    "publisher": "HarperCollins Publishers",
                    "isbn": "0261102354",
                    "price": "13.95",
                    "genres": [
                        "5df63a227c4e44750094ff88"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 78
                },
                {
                    "title": "The Two Towers ",
                    "author": "J.R.R. Tolkien",
                    "publisher": "HarperCollins Publishers",
                    "isbn": "0261102362",
                    "price": "13.95",
                    "genres": [
                        "5df63a227c4e44750094ff88"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 90
                },
                {
                    "title": "The Return of the King",
                    "author": "J.R.R. Tolkien",
                    "publisher": "HarperCollins Publishers",
                    "isbn": "0261102370",
                    "price": "13.95",
                    "genres": [
                        "5df63a227c4e44750094ff88"
                    ],
                    "comments": [

                    ],
                    "soldNumber": 91
                },
            ]

            Book.create(booksSeed)
                .then(() => {
                    console.log(`Books collection seeded successfully with ${booksSeed.length} books!`);
                })
                .catch((error) => console.log(error));
        })
        .catch();
}