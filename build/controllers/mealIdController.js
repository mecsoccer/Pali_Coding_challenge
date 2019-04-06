"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// returns no. of ingredients for each meal ID
function ingredientCount(mealObject) {
  return Promise.all(mealObject.map(function (item) {
    var i = 1;

    while (i > 0) {
      var ingredient = item["strIngredient".concat(i)];

      if (ingredient === '' || ingredient === null) {
        i -= 1;
        break;
      } else if (!item.idMeal) {
        return item;
      } else {
        i += 1;
      }
    }

    return [item.idMeal, i];
  }));
} // fetch meal data for each meal ID from themealdb.com API


function getMealsById(mealIdArray) {
  return Promise.all(mealIdArray.map(function (id) {
    var url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=".concat(id);
    return (0, _nodeFetch.default)(url).then(function (data) {
      return data.json();
    }).then(function (json) {
      var meals = json.meals;

      var _meals = _slicedToArray(meals, 1),
          arrayMeals = _meals[0];

      if (meals === null) {
        Promise.reject(id);
      } else {
        return arrayMeals;
      }
    }).catch(function () {
      return id;
    });
  })).then(function (array) {
    var invalidIds = [];
    array.forEach(function (meal) {
      if (!meal.idMeal) invalidIds.push(meal);
    });
    return invalidIds.length > 0 ? {
      error: true,
      invalidIds: invalidIds
    } : array;
  });
} // sorts a list numerically returning the least number


function computeLeast(data) {
  var numberList = data.map(function (item) {
    return item[1];
  });
  numberList.sort(function (a, b) {
    return a - b;
  });
  return numberList[0];
}

function mealIdEndpoint(req, res) {
  var mealIdList = req.body;
  getMealsById(mealIdList).then(function (mealsList) {
    if (!mealsList.length) {
      var invalidIds = mealsList.invalidIds;
      res.status(422).json({
        error: "the following ids ( ".concat(invalidIds, " ) do not match any meals")
      });
    } else {
      ingredientCount(mealsList).then(function (ingredientsNoArray) {
        var leastIngredientNo = computeLeast(ingredientsNoArray);
        return ingredientsNoArray.filter(function (array) {
          return array[1] === leastIngredientNo;
        });
      }).then(function (results) {
        var arrayOfIds = [];
        results.forEach(function (result) {
          return arrayOfIds.push(Number(result[0]));
        });
        return arrayOfIds;
      }).then(function (data) {
        res.status(200).json(data);
      });
    }
  }).catch(function () {
    res.status(500).send('internal server error');
  });
}

var _default = mealIdEndpoint;
exports.default = _default;
//# sourceMappingURL=mealIdController.js.map