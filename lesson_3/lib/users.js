'use strict';
var users = [];
var validator = require('validator');

module.exports = {
    _users: users,
    add: function (data) {
        if (this.validate(data)) {
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
    validate: function (data) {
        return (
           true
        )
    }
};
