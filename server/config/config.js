var env = process.env.NODE_ENV || 'development'; //this varibale is set only on Heroku = production
console.log(env);
if(env === 'development'){
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';

} if(env === 'test'){
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
