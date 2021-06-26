const genreModel = require('../models/Genre');

module.exports = {

    getGenres: (req, res) => {
        genreModel.find()
            .sort({ 'name': 1 })
            .then((genres) => {
                res.status(200).json({
                    message: "",
                    genres
                });
                // console.log(genres);
            })
            .catch();
    },

    genreAdd: (req, res) => {
        const { genreName } = req.body;
        genreModel.create({ name: genreName })
            .then((genre) => {
                res.status(201)
                    .json({
                        message: "Added new genre",
                        genre
                    });
            })
            .catch();
    },

    genreDetails: () => {

    },

    genreEdit: () => {

    },
    genreDelete: () => {

    },

}