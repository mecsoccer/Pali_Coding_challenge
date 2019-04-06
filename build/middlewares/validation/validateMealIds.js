"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function validateMealIds(req, res, next) {
  var userInputIds = req.body;

  if (userInputIds && _typeof(userInputIds) === 'object' && userInputIds.length > 1) {
    next();
  } else {
    res.status(422).json({
      error: 'request body must be an array containing atleast two ids'
    });
  }
}

var _default = validateMealIds;
exports.default = _default;
//# sourceMappingURL=validateMealIds.js.map