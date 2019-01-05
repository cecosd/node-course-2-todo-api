const expect = require('expect');
const mocha = require('mocha');

const {
    app
} = require('./../server');
const {
    Todo
} = require('./../models/todo');

beforeEach((done) => {
    Todo.remove({}).then(() => done())
})

describe('POST /todos', () => {
    it('Should create new todo', (done) => {
        var text = 'Todo test text';

        request('app')
            .post('/todos')
            .send({
                text
            })
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text);
            })
            .end((error) => {
                if (error) {
                    return done(error)
                }
            });

        Todo.find().then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
        }).catch((error) => done(error));
    });

})