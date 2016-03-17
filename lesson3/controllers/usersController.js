var users = require("../lib/users"),
    url = require("url"),
    querystring = require("querystring");

module.exports = {
    getUser: function (req, res, next) {

        setTimeout(function (next) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html; charset=utf-8');

            try {
                if (users.getList.length>0) {
                    var answer = users.get();
                } else {
                    var answer = 'users are not exist';
                }
                res.write(answer);
                next();
            } catch (e) {
                next(e);
            }
        }, 500, next)
    },
    postUser: function (req, res, next) {
        setRequestHeader('Content-Type', 'application/json; charset=utf-8');
        req.on('data', function (piece){
            var saveOn = "";
            saveOn+=querystring.parse(piece.toString());
            exports.testStr = saveOn;
        });}}



      /*  req.on('end', function () {



             get the POST data
            var readyStr = query.parse(str);

            if (users.newEntry(readyStr)['edit']) {
                res.statusCode = 200;
                res.write('User data changed');
                next();
            }
            else if (users.newEntry(readyStr)['succesful']) {
                res.statusCode = 200;
                res.write('new user added');
                next();
            }
            else {
                res.statusCode = 400;
                res.write('Bad request');
                next();
            }
        });
    }
};*/