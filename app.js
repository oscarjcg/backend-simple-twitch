const express = require('express');
const app = express();
const morgan = require('morgan');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connect('mongodb+srv://oscarcatari:' + process.env.MONGO_ATLAS_PW +'@cluster0-lhwoe.mongodb.net/test?retryWrites=true&w=majority', 
{
    useNewUrlParser: true, 
    useUnifiedTopology: true  
});


// For CORS errors
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
        return res.status(200).json({});
    }
    next();
});
app.use(morgan('dev'));
// scors  models
// Routes
const channelsRoutes = require('./api/routes/channels');
const categoriesRoutes = require('./api/routes/categories');





// db.once('open', function() {
//     console.log("we're connected!");
//     // Channel
//     let channelSchema = new mongoose.Schema({
//         name: String
//     });
//     channelSchema.methods.speak = function() {
//         let greeting = this.name
//             ? "Channel name is " + this.name
//             : "I don't have a name";
//         console.log(greeting);
//     }
//     let Channel = mongoose.model('Channel', channelSchema);

//     let testChannel = new Channel({ name: 'C1' });
//     testChannel.speak(); // "Meow name is fluffy"

//     testChannel.save(function (err, testChannel) {
//         if (err) return console.error(err);
//         testChannel.speak();
//     });
//     Channel.find(function (err, channels) {
//         if (err) return console.error(err);
//         console.log(channels);
//     })
//     mongoose.connection.close();
// });

const getChannels = (req, res) => {
    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
        
    let channelSchema = new mongoose.Schema({
        name: String
    });
    let Channel = mongoose.model('Channel', channelSchema);
    Channel.find(function (err, channels) {
        if (err) return console.error(err);
        console.log(channels);      
        mongoose.connection.close();

        res.json(channels);
    })    
}

const newChannel = (name) => {
    mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
        
    let channelSchema = new mongoose.Schema({
        name: String
    });
    let Channel = mongoose.model('Channel', channelSchema);
    let newChannel = new Channel({ name: 'C1' });    
    newChannel.save(function (err, testChannel) {
        if (err) return console.error(err);    
    });
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use('/channels', channelsRoutes);
app.use('/categories', categoriesRoutes);

app.get('/', (req, res) => {    
    res.send('Hello World!')
});

// app.get('/channels', (req, res) => {
//     getChannels(req, res);
// });

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;