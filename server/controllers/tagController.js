const Tag = require('../models/tag')

module.exports = {
    findAll(req, res) {
        Tag
            .find()
            .then(tags => {
                res.status(200).json(tags)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    },
    //testing only
    create(req, res) {
        Tag
            .create({
                name: req.body.name
            })
            .then(tags => {
                res.status(200).json(tags)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}
