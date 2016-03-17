"use strict";

module.exports = {
    "get": {
        "/user": require("./controllers/usersController").getUser
    },
    "post": {
        "/user": require("./controllers/usersController").postUser
    }
};
