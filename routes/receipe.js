const express = require('express');
const router = express.Router();
const receipeApi = require('../src/json_receipe');

router.get('/1', (req, res) => {
    receipeApi.getReceipe(function(receipe){
        res.render("receipe", {receipe: receipe});
    });
});

module.exports = router;