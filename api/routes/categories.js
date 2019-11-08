const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, cb) => { // jpeg, png
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits:  {
        fileSize: 1024 * 1024 * 2 // 2MB
    },
    fileFilter: fileFilter
});

const Category = require('../models/category');

router.get('/', (req, res, next) => {
    Category.find({}, '-_id')
        .select('name image')
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

// Reset categories
router.delete('/', (req, res, next) => {   
    Category.deleteMany()
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

router.get('/:categoryName', (req, res, next) => {
    const name = req.params.categoryName
    Category.findOne({name: name})
        .exec()
        .then(doc => {
            console.log(doc);           
            res.contentType(doc.image.contentType);
            res.send(doc.image.data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        });
})

router.post('/', upload.single('categoryImage'), (req, res, next) => {
    console.log('Req: ' + req.file.mimetype);
    const category = new Category({
        name: req.body.name,
        image: {
            data: fs.readFileSync(req.file.path),
            contentType: req.file.mimetype
        }
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