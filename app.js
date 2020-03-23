var createError = require("http-errors");
var express = require("express");
var path = require("path");
const bodyParser = require("body-parser");
var logger = require("morgan");
const http = require("http");

var indexRouter = require("./routes");
var shoeRouter = require("./routes/shoe");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// 3. (optionally) Serve the OpenAPI spec
const spec = path.join(__dirname, "reference/true-to-size.v1.json");
app.use("/spec", express.static(spec));

app.use("/dbup", indexRouter);

app.get("/shoe/:sku", shoeRouter.shoeGET);
app.post("/shoe/:sku", shoeRouter.shoePOST);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send("for o for");
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

http.createServer(app).listen(3001);

module.exports = app;
