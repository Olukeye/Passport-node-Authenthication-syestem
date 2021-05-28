const express = require('express');
const router = express.Router();
const { Authenticated } = require('../config/auth');


router.get('/', (req, res) => {
    res.render('welcomepage')
});


router.get('/landingpage', Authenticated, (req, res) => {
    res.render('landingpage', {
        name: req.user.name  // this will display the user's name on the page
    })
});



module.exports = router;