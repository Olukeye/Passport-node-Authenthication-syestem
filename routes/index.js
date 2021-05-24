const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('welcomepage')
});

router.get('/regiseter', (req, res) => {
    res.render('register')
});
router.get('/login', (req, res) => {
    res.render('login')
});


module.exports = router;