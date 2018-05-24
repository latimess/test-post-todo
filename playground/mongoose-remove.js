const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result)=>{
  console.log(result);
});

// Todo.findByIdAndRemove('5b01e77a37cf920facf86a79').then((todo)=>{
//   console.log(todo);
// });

// Todo.findOneAndRemove({_id: '5b01e77a37cf920facf86a7a'}).then((todo)=>{
//   console.log(todo);
// });
