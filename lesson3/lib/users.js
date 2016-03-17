
'use strict';
var users = [];
var validator = require('validator');
var controller = require("../controllers/usersController");

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
            //create new user
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
    getList: function () {
        return this._users;
    },
    _validate: function (data) {
        return ((data['nick'] !== undefined) && (data['name'] !== undefined));
    }
};
