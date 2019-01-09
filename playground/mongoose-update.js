const {
    ObjectID
} = require('mongodb');
const {
    mongoose
} = require('../server/db/mongoose');
const {
    Todo
} = require('../server/models/todo');

// Todo.remove({}).then((result) => {
//     console.log(result);
// });

Todo.findOneAndRemove({
    _id: '5c31f3af4679b82504a83a10'
}).then((doc) => {
    console.log(todo);
});

Todo.findByIdAndRemove('5c31f3af4679b82504a83a10').then((todo) => {
    console.log(todo);
});