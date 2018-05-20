var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://latimess:Soumia75$@ds127883.mlab.com:27883/todoapp');
module.exports = {mongoose};
