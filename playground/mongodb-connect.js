// const MongoClient = require('mongodb').MongoClient;
const {
    MongoClient,
    ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (error, client) => {
    if (error) {
        return console.log('MongoDB connection unsuccessful.');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //     text: 'New something to do',
    //     completed: false
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert ToDo', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    // db.collection('Users').insertOne({
    //     name: 'Gosho',
    //     password: 'dfjkhvdkfvhsdkvjhd'
    // }, (error, result) => {
    //     if (error) {
    //         return console.log('Unable to insert ToDo', error);
    //     }
    //     console.log(JSON.stringify(result.ops, undefined, 2));
    // });

    client.close();
});