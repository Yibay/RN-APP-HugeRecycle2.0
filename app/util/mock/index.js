let express = require('express');
let app = express();
let allowCrossDomain = function(req, res, next) {//设置response头部的中间件
  res.header('Access-Control-Allow-Origin', '*');//*白名单 完全开发，不限制域名
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials','true');
  next();
};
app.use(allowCrossDomain);
app.get("/api/customer/app/deal/getProducts4Items",function (request,response) {
  let data = require('./getProducts4Items.json');//要获取的json文件
  response.send(data);
});
app.get("/api/customer/app/deal/getProducts3Items",function (request,response) {
  let data = require('./getProducts3Items.json');//要获取的json文件
  response.send(data);
});
app.get("/api/customer/app/deal/getProducts2Items",function (request,response) {
  let data = require('./getProducts2Items.json');//要获取的json文件
  response.send(data);
});
// app.get("/test",function(request, response){
//   response.sendFile(__dirname + '/test.html'); //要返回的html文件（必须是绝对路径）
// });
app.listen('3000',function () {
  console.log('>listening on 3000');
});