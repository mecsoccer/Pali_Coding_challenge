import fetch from 'node-fetch';

// returns no. of ingredients for each meal ID
function ingredientCount(mealObject) {
  return Promise.all(mealObject.map((item) => {
    let i = 1;
    while (i > 0) {
      const ingredient = item[`strIngredient${i}`];
      if (ingredient === '' || ingredient === null || !ingredient) {
        i -= 1;
        break;
      } else {
        i += 1;
      }
    }
    return [item.idMeal, i];
  }));
}

// fetch meal data for each meal ID from themealdb.com API
function getMealsById(mealIdArray) {
  return Promise.all(mealIdArray.map((id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    return fetch(url)
      .then(data => data.json())
      .then((json) => {
        const { meals } = json;
        const [arrayMeals] = meals;
        return arrayMeals;
      });
  }));
}

// sorts a list numerically returning the least number
function computeLeast(data) {
  const numberList = data.map(item => item[1]);
  numberList.sort((a, b) => { return a - b; });
  return numberList[0];
}

function mealIdEndpoint(req, res) {
  const mealIdList = req.body;

  getMealsById(mealIdList)
    .then((mealsList) => {
      ingredientCount(mealsList)
        .then((ingredientsNoArray) => {
          const leastIngredientNo = computeLeast(ingredientsNoArray);
          return ingredientsNoArray.filter(array => array[1] === leastIngredientNo);
        })
        .then((results) => {
          const arrayOfIds = [];
          results.forEach(result => arrayOfIds.push(result[0]));
          return arrayOfIds;
        })
        .then((data) => {
          res.status(200).json(data);
        });
    });
}

export default mealIdEndpoint;
