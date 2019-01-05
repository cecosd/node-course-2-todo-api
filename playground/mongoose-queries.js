const {
    ObjectID
} = require('mongodb');
const {
    mongoose
} = require('./../server/db/mongoose');
const {
    Todo
} = require('./../server/models/todo');

var id = '5c2f6903ef6fed1c7080a1d81';

if (!ObjectID.isValid(id)) {
    console.log('ID not valid');
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo);
// });

Todo.findById(id).then((todo) => {
    if (!todo) {
        return console.log('ID not found');
    }
    console.log('TodoById', todo);
}).catch((error) => {
    console.log(error);
});