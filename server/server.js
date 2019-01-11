// Server configurations file
require("./config/config");
// Lodash library
const _ = require("lodash");
// Exress library
const express = require("express");
// Body parser library
const bodyParser = require("body-parser");
// Mongo DB ObjectID
const {
    ObjectID
} = require("mongodb");
// DB Connection via mongoosejs
require("./db/mongoose");

// === Models ===
// Todo
var Todo = require("./models/todo");
// User
var User = require("./models/user");
// middlewares
var authenticate = require("./middleware/authenticate");

var app = express();
var port = process.env.PORT;

app.use(bodyParser.json());

app.post("/todos", (request, response) => {
    // Create new todo object
    var todo = new Todo({
        text: request.body.text,
        userId: request.body.userId
    });
    // Save the new todo and work with the resulted doc or error
    todo
        .save()
        .then(doc => {
            var userId = doc.userId;

            if (!ObjectID.isValid(userId)) {
                return response.status(404).send(`UserID not valid ${userId}`);
            }

            User.findById(userId)
                .then(user => {
                    if (!user) {
                        return response.status(404).send();
                    }
                    var userTodos = user.todos || [];
                    userTodos.push(doc._id);

                    User.findByIdAndUpdate(
                            userId, {
                                $set: {
                                    todos: userTodos
                                }
                            }, {
                                new: true
                            }
                        )
                        .then(user => {
                            if (!user) {
                                return response.status(404).send();
                            }
                            return response.status(200).send(user);
                        })
                        .catch(error => {
                            return response.status(404).send(error);
                        });
                })
                .catch(error => {
                    return response.status(404).send(error);
                });
        })
        .catch(error => {
            return response.status(400).send(error);
        });
});

app.get("/todos", (request, response) => {
    Todo.find().then(
        todos => {
            response.send({
                totos: todos
            });
        },
        error => {
            response.status(400).send(error);
        }
    );
});

app.get("/todos/:id", (request, response) => {
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send(`ID not valid ${id}`);
    }

    Todo.findById(id)
        .then(todo => {
            if (!todo) {
                return response.status(404).send();
            }
            return response.status(200).send(todo);
        })
        .catch(error => {
            return response.status(404).send(error);
        });
});

app.delete("/todos/:id", (request, response) => {
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send(`ID not valid ${id}`);
    }

    Todo.findByIdAndRemove(id)
        .then(todo => {
            if (!todo) {
                return response.status(404).send();
            }
            return response.status(200).send(todo);
        })
        .catch(error => {
            return response.status(404).send(error);
        });
});

app.patch("/todos/:id", (request, response) => {
    var id = request.params.id;
    var body = _.pick(request.body, ["text", "completed"]);

    if (!ObjectID.isValid(id)) {
        return response.status(404).send(`ID not valid ${id}`);
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(
            id, {
                $set: body
            }, {
                new: true
            }
        )
        .then(todo => {
            if (!todo) {
                return response.status(404).send();
            }
            return response.status(200).send(todo);
        })
        .catch(error => {
            return response.status(404).send(error);
        });
});

app.get("/users", (request, response) => {
    User.find().then(
        users => {
            response.send({
                users: users
            });
        },
        error => {
            response.status(400).send(error);
        }
    );
});

app.get('/user/me', authenticate, (request, response) => {
    response.send(request.user);
});

app.post("/users", (request, response) => {
    var body = _.pick(request.body, ["email", "password"]);
    var user = new User(body);

    user
        .save()
        .then(() => {
            return user.generateAuthToken();
        }).then((token) => {
            response.header('x-auth', token).status(200).send(user);
        })
        .catch(error => {
            response.status(404).send(error);
        });
});

app.get("/users/:id", (request, response) => {
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send(`UserID not valid ${id}`);
    }

    User.findById(id)
        .then(user => {
            if (!user) {
                return response.status(404).send();
            }
            return response.status(200).send(user);
        })
        .catch(error => {
            return response.status(404).send(error);
        });
});

app.get("/users/:id/todos", (request, response) => {
    var id = request.params.id;

    if (!ObjectID.isValid(id)) {
        return response.status(404).send(`UserID not valid ${id}`);
    }

    Todo.find({
            userId: id
        })
        .then(todos => {
            response.send(todos);
        })
        .catch(error => {
            response.status(400).send(error);
        });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}.`);
});

module.exports = {
    app
};