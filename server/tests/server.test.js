
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
    text: 'Second test todo',
    completed: true,
    completedAt: 333
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


























//delete

describe("DELETE /todos/:id",()=> {
  it("should remove given ID",(done)=> {
    var id = todos[0]._id.toHexString();
    request(app)
    .delete(`/todos/${id}`)
    .expect(200)
    .expect((res)=>{
      expect(res.body.todo._id).toBe(id);
      })
    .end((err,res)=>{
      if(err){
        return done(err);
      }

      Todo.findById(id).then((todo)=> {
        expect(todo).toNotExist();
        done();
      }).catch((e)=> done(e));
    });
  });

  it("should return 404 if todo not found",(done)=> {
    var id = new ObjectID();
    request(app)
    .delete(`/todos/${id}`)
    .expect(404)
    .end(done);

  });

  it("should return 404 if ID is not valid",(done)=> {
    request(app)
    .delete('/todos/123')
    .expect(404)
    .end(done);
  });
});

//Patch
describe('PATCH /todos/:id', ()=> {
  var id = todos[0]._id;
  var text = "This should be the new text";
  it('should update todo', (done)=> {
    request(app)
    .patch(`/todos/${id}`)
    .send({
      text: text,
      completed: true
    })
    .expect(200)
    .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
      expect(res.body.todo.completedAt).toBeA('number');

     })
    .end(done);
  });

  it('should clear compleatedAt when todo is not completed', (done)=> {
    var id = todos[1]._id;
    var text = 'This should be a new text 2';

    request(app)
    .patch(`/todos/${id}`)
    .send(
      {
        completed: false,
        text: text
      })
      .expect(200)
      .expect((res)=> {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  });
});
