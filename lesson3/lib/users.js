
'use strict';
var users = [];
var validator = require('validator');

module.exports = {
    listUsers: users,
    add: function (data) {
        if (this.validity(data)) {
            var result = {"success": true};
            var allUsers = users.length;
            for (var i = 0; i < allUsers; i++) {
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

            this.listUsers.push(newUser);

            return result;
        }
        return {"success": false}

    },
    get: function () {
        return this._users;
    },
    validity: function (data) {
        return (
            data['nick'] !== undefined &&
            data['name'] !== undefined &&
            data['e-mail'] !== undefined &&
            data['description'] !== undefined &&
            data['age'] !== undefined &&
            validator.isLength(data['nick'], 2, 255) &&
            validator.isLength(data['name'], 2, 255))
        )
    }
};
