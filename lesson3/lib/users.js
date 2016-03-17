var check = require('validator'),
    fromUC = require('../controllers/usersController'),
    tUser = fromUC.newUser;


var users = [];

module.exports = {
    usersArr: users,
    newEntry: function (tUser) {
        if (this.fieldCheck(tUser)) {

            var result = {"succesful": true};
            for (var i = 0; i < tUser.length; i++) {
                if (usersArr[i].nick === tUser.nick)
                    usersArr.splice(i, 1);
                    result.edit = true;
                }
            }else {

            // setup a new user
            var newUser = {
                "nick": tUser["nick"],
                "name": tUser["name"],
                "e-mail": tUser["e-mail"],
                "description": tUser["description"],
                "age": tUser["age"]
            };
            this.usersArr.push(newUser); //pushing new user to array of users
            return result;
        }

        return {"succesful": false}

    },
    getList: function getList() {
        return JSON.stringify(this.usersArr);
    },
    fieldCheck: function (tUser) {
        return (

            tUser['nick'] !== undefined &&
            tUser['name'] !== undefined &&
            tUser.isLength(tUser['nick'], 2, 18) && check.isLength(tUser['name'], 2, 30))
    }
};

