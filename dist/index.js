"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "connectDb", {
  enumerable: true,
  get: function get() {
    return _models.connectDb;
  }
});
exports.app = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _models = _interopRequireWildcard(require("./models"));

require("dotenv/config");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
exports.app = app;
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
app.use('/report', _routes["default"].report);
var eraseDatabaseOnSync = true;
var port = process.env.PORT || 3000;
app.get('/api/hello', function (req, res) {
  res.send({
    express: 'Hello From Express'
  });
});
app.post('/api/world', function (req, res) {
  console.log(req.body);
  res.send("I received your POST request. This is what you sent me: ".concat(req.body.post));
});
(0, _models.connectDb)().then(function () {
  if (eraseDatabaseOnSync) {
    console.log("DELETE");
  }

  app.listen(port, function () {
    return console.log("Example app listening on port ".concat(process.env.PORT, "!"));
  });
})["catch"](function (err) {
  console.log(err);
  process.exit(1);
});