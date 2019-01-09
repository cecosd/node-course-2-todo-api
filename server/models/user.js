var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    todos: {
        type: Object
    }
});

userSchema.methods.updateTodos = function (doc) {
    var userId = doc.userId;

    if (!ObjectID.isValid(userId)) {
        return response.status(404).send(`UserID not valid ${userId}`);
    }

    this.findById(userId).then((user) => {
        if (!user) {
            return response.status(404).send();
        }
        var userTodos = user.todos || [];
        userTodos.push(doc._id);

        this.findByIdAndUpdate(userId, {
            $set: {
                todos: userTodos
            }
        }, {
            new: true
        }).then((user) => {
            if (!user) {
                return response.status(404).send();
            }
            return response.status(200).send(user);
        }).catch((error) => {
            return response.status(404).send(error);
        });

    }).catch((error) => {
        return response.status(404).send(error);
    });
};

var User = mongoose.model('User', userSchema);

module.exports = User;