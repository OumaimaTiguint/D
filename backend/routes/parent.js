const router = require('express').Router();
let Parent = require('../models/parent.model');

router.route('/').get(res => {
    Parent.find()
        .then(e => res.json(e))
        .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/:id').get((req, res) => {
    Parent.findById(req.params.id)
        .then(e => res.json(e))
        .catch(err=> res.status(400).json('Error: ' + err))
});

module.exports = router;