const express = require('express');
const router = express.Router();


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

router.post('/', (req, res, next) => {
    const channel = new Channel({
        name: req.body.name,
        image: req.body.image
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