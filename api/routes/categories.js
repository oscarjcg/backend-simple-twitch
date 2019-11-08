const express = require('express');
const router = express.Router();

const Category = require('../models/category');

router.get('/', (req, res, next) => {
    Category.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.post('/', (req, res, next) => {
    const category = new Category({
        name: req.body.name,
        image: req.body.image
    })
    category
        .save()
        .then(result => {
            console.log(result);
        })
        .catch( err => console.log(err))
        res.status(201).json({
            message: "Category POST Request",
            createdCategory: category
        });
})

router.delete('/:categoryName', (req, res, next) => {
    const id = req.params.categoryName;
    Category.findOneAndDelete({name: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
}); 

module.exports = router;