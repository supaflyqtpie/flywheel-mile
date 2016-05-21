const express = require('express');
const router = express.Router();

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.redirect('/');
}

/* GET users listing. */
router.get('/', isAuthenticated, (req, res) => {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    res.render('navBar', {
        title: 'Express'
    });
})

module.exports = router;
