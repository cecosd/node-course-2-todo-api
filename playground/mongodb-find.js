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

    // db.collection('Todos').find({
    //     _id: new ObjectID('5c2e0abac2d41318c44a7386')
    // }).toArray().then((docs) => {
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    // }, (error) => {
    //     console.log('Unable to fetch todos', error);
    // });

    db.collection('Todos').find().count().then((count) => {
        console.log('Todos count', count);
    }, (error) => {
        console.log('Unable to fetch todos', error);
    });

    client.close();
});