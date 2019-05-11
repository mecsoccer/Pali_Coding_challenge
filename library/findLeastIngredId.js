import fetch from 'node-fetch';

/**
 *
 * @description Defines the actions for the findLeastIngredId endpoint
 * @class MealFunctions
 */
class MealFunctions {
  /**
    *Return number of ingredients
    *@description Returns number of ingredients required for each meal ID
    *@static
    *@param  {Array} mealObjectsArray - array containing meal Objects from mealsDB API
    *@return {Array} - status code
                     - promise of array containing array of meal ids and
                       number of ingredients required
    *@memberof MealFunctions
    */
  static ingredientCount(mealObjectsArray) {
    return Promise.all(mealObjectsArray.map((item) => {
      const ingrFields = Object.keys(item).filter(field => /^strIngredient\d+$/.test(field));
      const ingredients = ingrFields.filter(field => !/^$/.test(item[field]));
      return { id: item.idMeal, num: ingredients.length };
    }));
  }

  /**
    *Fetch meal Objects
    *@description Return meal Objects for each meal ID from themealdb.com API
    *@static
    *@param  {Array} mealIdArray - array containing meal ids
    *@return {Array} - status code and array containing deconstructed meal objects from mealsDB API
                       or object containing invalid ids if any
    *@memberof MealFunctions
    */
  static getMealsById(mealIdArray) {
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
      .then((mealObjectsArray) => {
        const invalidIds = [];
        mealObjectsArray.forEach((meal) => {
          if (!meal.idMeal) invalidIds.push(meal);
        });
        return (invalidIds.length) ? { invalidIds } : mealObjectsArray;
      });
  }
}

export default MealFunctions;
