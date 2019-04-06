"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _http = _interopRequireDefault(require("http"));

var _morgan = _interopRequireDefault(require("morgan"));

var _customEnv = _interopRequireDefault(require("custom-env"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_customEnv.default.env();

var app = (0, _express.default)();
app.use((0, _morgan.default)('dev'));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');
  res.header('Access-Control-Allow-Methods', 'POST');
  next();
});
app.use('/api/v1', _index.default);
var port = process.env.PORT || '3000';
app.set('port', port);

var server = _http.default.createServer(app);

server.listen(port);
var _default = server;
exports.default = _default;
//# sourceMappingURL=index.js.map