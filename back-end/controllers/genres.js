const genreModel = require('../models/genre');

module.exports = {

    getGenres: (req, res) => {
        genreModel.find()
            .then((genres) => {
                console.log(genres);
            })
            .catch();
    },

    genreAdd: (req, res) => {
        // console.log(req.body)
        const { genreName } = req.body;
        const genre = new genreModel({ name: genreName });
        genre.save();
    },

    genreDetails: () => {

    },

    genreEdit: () => {

    },
    genreDelete: () => {

    },

}