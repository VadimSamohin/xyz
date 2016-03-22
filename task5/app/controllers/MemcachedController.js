
"use strict";

const Memcached = require("memcached"),
    Q = require("q"),
    co = require("co"),
    thunk = require('thunkify');

let client = new Memcached("127.0.0.1:11211");

module.exports = {

    /**
     * @example curl -v -X GET "http://127.0.0.1:8081/memcached/bar"
     * @param next
     */
    getAction: function * (next){
        this.body = yield Q.npost(client, "get", [this.params.key]);
    },

    putAction:function* (next) {
    try {
        this.body = yield Q.ninvoke(client, "replace", this.params.key, this.request.body.value, this.request.body.expires);
        this.status = 201;

    }catch(e){
        this.status = 400;
        this.body = {message: "Bad Request"};
    }},


    /*        Examples
     * curl -v -X POST "http://127.0.0.1:8081/memcached" -d '{"key":"bar","value":"foo","expires":176}' -H "Content-Type: application/json"
     * curl -v -X GET "http://127.0.0.1:8081/memcached/bar"
     *
     *curl -v -X PUT "http://127.0.0.1:8081/memcached/bar" -d '{"value":"reminder","expires":237}' -H "Content-Type: application/json"
     * curl -v -X GET "http://127.0.0.1:8081/memcached/bar"
     *
     * curl -v -X DELETE "http://127.0.0.1:8081/memcached/bar"
     * curl -v -X GET "http://127.0.0.1:8081/memcached/bar"
     * */
    /**
     * Устанаваливает значение заданному ключу
     *curl -v -X GET "http://127.0.0.1:8081/memcached/bar"
     * @example curl -v -X POST "http://127.0.0.1:8081/memcached" -d '{"key":"bar","value":"foo","expires":160}' -H "Content-Type: application/json"
     * @param next
     */
    postAction: function * (next){
        try{
            yield Q.npost(client, "set", [this.request.body.key, this.request.body.value, this.request.body.expires]);
            this.status = 201;
            this.body = this.request.body;
        }catch(e){
            this.status = 400;
            this.body = {message: "Bad Request"};
        }

        yield next;

    },
    deleteAction: function * (next){
        try{
            var result = yield Q.ninvoke(client, "del", this.params.key);
            if(result){
                this.status = 200;
                this.body = "OK";
            }else{
                this.status = 404;
                this.body = "Not found";

            }

        }catch(e){
            this.status = 400;
            this.body = {message: "Bad Request"};
        }
    }
};
