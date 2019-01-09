var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var db_path = process.env.MONGODB_URI;
console.log('Attempting to connect to', db_path);
mongoose.connect(db_path);

module.exports = {
    mongoose
};