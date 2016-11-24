var app = require('koa')();
var bodyParser = require('koa-bodyparser');

var static = require('koa-static');
var router = require('./router');

app.use(static("./public"));
app.use(bodyParser());

app.use(router.routes())
  .use(router.allowedMethods());

app.listen(8080);

console.log('listen http://localhost:8080/ ');
