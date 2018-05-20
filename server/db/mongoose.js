var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');
mongoose.connect('mongodb://ds127883.mlab.com:27883/todoapp',
{
    auth: {
      user: 'latimess',
      password: 'Soumia75$'
    }
  });
module.exports = {mongoose};
