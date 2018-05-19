const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');


User.findById('5aeb5714402b1b6034491438aa').then((user) => {
  if(!user){
    return console.log('Unable to find user')
  }
  console.log('User ', user);
})
.catch((e)=> {
    console.log(e);
});











// var id = '5b005befe0090628747776e011';
// if(!ObjectID.isValid(id)){
//   return console.log('Id is not valid');
// }

// Todo.find({
//   _id: id
// })
// .then((todos) =>{
//   console.log('Todos ',todos);
// });
//
// Todo.findOne({
//   _id: id
// })
// .then((todo) =>{
//   console.log('Todo ',todo);
// });

// Todo.findById(id)
// .then((todo) =>{
//   if(!todo){
//     return console.log('Id not found');
//   }
//
//   console.log('Todo By ID',todo);
// }).catch((e)=>{
//   console.log('Error ',e)
// });
