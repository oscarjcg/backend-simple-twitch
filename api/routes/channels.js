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

const Channel = require('../models/channel');

router.get('/', (req, res, next) => {
    Channel.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//
router.get('/:channelName', (req, res, next) => {
    const id = req.params.channelName;

    //Channel.fi
    res.status(200).json({
        message: 'Channel GET Request ...',
        id: id
    });
});

router.post('/', 
    upload.fields([
            {
                name: 'image', 
                maxCount: 1
            }, 
            {
                name: 'preview',
                maxCount: 1
            }]), (req, res, next) => {
    //console.log(req.files);
    const channel = new Channel({
        name: req.body.name,
        image: {
            data: fs.readFileSync(req.files.image[0].path),
            contentType: req.files.image.mimetype
        },
        preview: {
            data: fs.readFileSync(req.files.preview[0].path),
            contentType: req.files.preview.mimetype
        },
    });
    channel
        .save()
        .then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
        res.status(201).json({
            message: "Channel POST Request",
            createdChannel: channel
        });
});

// Reset channels
router.delete('/', (req, res, next) => {   
    Channel.deleteMany()
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

router.delete('/:channelName', (req, res, next) => {
    const id = req.params.channelName;
    Channel.findOneAndDelete({name: id})
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