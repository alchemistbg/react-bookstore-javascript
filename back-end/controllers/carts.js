const { response } = require("express");

module.exports = {
    postCart: (req, res) => {
        console.log(req.user);
        res.status(200).json({
            message: "Post Cart test OK!"
        });
    },

    getCart: (req, res) => {
        console.log(req.user);
        res.status(200).json({
            message: "Get Cart test OK!"
        });
    },

    patchCart: (req, res) => {
        console.log(req.user);
        res.status(200).json({
            message: "Patch Cart test OK!"
        });
    },

    deleteCart: (req, res) => {
        console.log(req.user);
        res.status(200).json({
            message: "Delete Cart test OK!"
        });
    }
}