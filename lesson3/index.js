"use strict";

var http = require("http"),
    url = require("url"),
    routes = require("./router"),
    querystring = require("querystring");

function requestHandler(request, response) {

    var parsedUrl = url.parse(request.url, true),
        methodType = request.method.toLowerCase();




if(routes[methodType][parsedUrl.pathname]){
    routes[methodType][parsedUrl.pathname](request, response, function(err){
        if(err){
            response.statusCode = 500;
            response.write(JSON.stringify({
                "message": err.message,
                "status": "Internal Server Error"
            }));
            response.end();
        }else{
            response.end();
        }
    });
}else{
    response.statusCode = 404;
    response.end("Not Found");
};}

var server  = http.createServer(requestHandler);


server.listen(3001);
