
'use strict';
var users = [];
var validator = require('validator');

module.exports = {
    _users: users,
    add: function (data) {
        if (this._validate(data)) {
            var result = {"success": true};
            var totalUsers = users.length;
            for (var i = 0; i < totalUsers; i++) {
                if (users[i].nick === data.nick) {
                    users.splice(i, 1);
                    result.edit = true;
                }
            }
            var newUser = {
                "nick": data["nick"],
                "name": data["name"],
                "e-mail": data["e-mail"],
                "description": data["description"],
                "age": data["age"]
            };

            this._users.push(newUser);

            return result;
        }
        return {"success": false}

    },
    get: function () {
        return this._users;
    },
    _validate: function (data) {
        return (
            data['nick'] !== undefined &&
            data['name'] !== undefined &&
            data['e-mail'] !== undefined &&
            data['description'] !== undefined &&
            data['age'] !== undefined &&
            validator.isLength(data['nick'], 2, 255) &&
            validator.isLength(data['name'], 2, 255) &&
            validator.isEmail(data['e-mail']) &&
            validator.isLength(data['description'], 2, 255) &&
            validator.isNumeric(data['age'])
        )
    }
};
