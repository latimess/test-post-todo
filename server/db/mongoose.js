var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);
//mongoose.connect('mongodb://latifa:Soumia75@ds127883.mlab.com:27883/todoapp',
// {
//     auth: {
//       user: 'latifa',
//       password: 'Soumia75'
//     }
//   });
module.exports = {mongoose};
