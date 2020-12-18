const router = require('express').Router();
let Child = require('../models/child.model');

router.route('/').get((req, res) => {
    Child.find()
        .then(e => res.json(e))
        .catch(err => res.status(400).json('Error: ' + err))
});

module.exports = router;