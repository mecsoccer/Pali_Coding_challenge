import fetch from 'node-fetch';

// returns no. of ingredients for each meal ID
function ingredientCount(mealsArray) {
  return Promise.all(mealsArray.map((item) => {
    const ingrFields = Object.keys(item).filter(field => /^strIngredient\d+$/.test(field));
    const ingredients = ingrFields.filter(field => !/^$/.test(item[field]));
    return [item.idMeal, ingredients.length];
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
        /* istanbul ignore next */return (meals === null) ? Promise.reject(id) : arrayMeals;
      })
      .catch(() => id);
  }))
    .then((array) => {
      const invalidIds = [];
      array.forEach((meal) => {
        if (!meal.idMeal) invalidIds.push(meal);
      });
      return (invalidIds.length) ? { error: true, invalidIds } : array;
    });
}

function mealIdEndpoint(req, res) {
  const mealIdList = req.body;

  getMealsById(mealIdList)
    .then((mealsList) => {
      if (mealsList.length) {
        ingredientCount(mealsList)
          .then((ingredientsNumArray) => {
            const leastIngredientNum = Math.min(...ingredientsNumArray.map(item => item[1]));
            return ingredientsNumArray.filter(array => array[1] === leastIngredientNum);
          })
          .then((results) => {
            const arrayOfIds = [];
            results.forEach(result => arrayOfIds.push(Number(result[0])));
            return arrayOfIds;
          })
          .then((data) => {
            res.status(200).json(data);
          });
      } else {
        const { invalidIds } = mealsList;
        res.status(422).json({ error: `the following ids ( ${invalidIds} ) do not match any meals`});
      }
    })
    .catch(() => {
      /* istanbul ignore next */res.status(500).send('error occured');
    });
}

export default mealIdEndpoint;
