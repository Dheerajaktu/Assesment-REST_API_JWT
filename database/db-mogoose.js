const mongoose = require('mongoose');


const URI = 'mongodb://localhost:27017/tutorBin';
mongoose.connect(URI, {
    useUnifiedTopology: true
}, function (err) {
    if (err) {
        return console.error('Error While Connecting with Mongo DB:', err);
    }
    console.log('DB Connected successfully --->', URI);
});


module.exports = mongoose;