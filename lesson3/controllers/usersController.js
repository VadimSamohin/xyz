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
        var body = '';

        req.on('data', function (data) {
            body += data;
        });
//parce
        req.on('end', function () {

            var post = querystring.parse(body);

            if (users.add(post)['edit']) {
                res.statusCode = 200;
                res.write('only changes');
                next();
            }
            else if (users.add(post)['success']) {
                res.statusCode = 200;
                res.write('new user has been added');
                next();
            }
            else {
                res.statusCode = 400;
                res.write('Bad request');
                next();
            }
        });
    }
};


