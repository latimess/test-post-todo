
const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');

var todos = [{
    _id: new ObjectID(),
    text: 'First test todo'
  },{
    _id: new ObjectID(),
    text: 'Second test todo'
  }];

//Remove all records in the collection todos
beforeEach((done) => {
  Todo.remove({}).then(()=> done());
});



beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});


// describe('POST /todos', () => {
//   it('should create a new todo', (done) => {
//     var text = 'Test todo text2';
//
//     request(app)
//     .post('/todos')
//     .send({text})
//     .expect(200)
//     .expect((res)=> {
//       expect(res.body.text).toBe(text);
//     })
//     .end((err, res) => {
//       if(err){
//         return done(err);
//       }
//
//       Todo.find({text}).then((todos)=> {
//         expect(todos.length).toBe(1);
//         expect(todos[0].text).toBe(text);
//         done();
//       })
//       .catch((e)=> done(e));
//     });
//   });
// //Bad data
//    it('should not create a new todo with an invalid data', (done)=> {
//      request(app)
//      .post('/todos')
//      .send({})
//      .expect(400)
//      .end((err,res)=> {
//        if(err){
//          return done(err);
//        }
//        Todo.find().then((todos)=> {
//           expect(todos.length).toBe(2);
//           done();
//        })
//        .catch((e) => {
//          done(e);
//        });
//      });
//    });
// });
//
// describe('GET /todos' , ()=> {
//   it('should get all todos', (done)=> {
//     request(app)
//     .get('/todos')
//     .expect(201)
//     .expect((res)=> {
//       expect(res.body.todos.length).toBe(2);
//     })
//     .end(done);
//   });
// });

describe('GET /todos/:id',()=> {
  it('should get a todo with given ID', (done)=> {

    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .set('Accept', 'application/json')
    .buffer(true)
    .expect(200)
    .expect((res)=> {

      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found', (done)=> {
    var id = new ObjectID();
      request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid ID',(done)=> {
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  })
});
