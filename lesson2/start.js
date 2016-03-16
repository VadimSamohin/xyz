"use strict";

const http = require("http"),
    url = require("url");
let queryCount = 0;

function boot() {
    function handler(req, res, cont) {
        res.setHeader('Content-Type', 'text/html; charset=utf-8');
        var path = url.parse(req.url).pathname;
        if (path == "/index.html") {
            queryCount++;
            res.end("Привіт світ!")

        } else if (path == "/count.html") {
            res.end("index.html було запитано " + queryCount + " разів");
        } else {
            res.setHead(404);
            res.end("404 Page not found!");
        }
    }

    let server = http.createServer(handler);
    server.listen(2020);
}
exports.boot = boot;
