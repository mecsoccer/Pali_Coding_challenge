"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _mealIdController = _interopRequireDefault(require("../controllers/mealIdController"));

var _validateMealIds = _interopRequireDefault(require("../middlewares/validation/validateMealIds"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express.default.Router();

router.post('/meal-ids', _validateMealIds.default, _mealIdController.default);
var _default = router;
exports.default = _default;
//# sourceMappingURL=index.js.map