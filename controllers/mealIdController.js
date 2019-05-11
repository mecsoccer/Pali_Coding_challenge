import library from '../library/findLeastIngredId';

const { getMealsById, ingredientCount } = library;

function findLeastIngredId(req, res) {
  const mealIdList = req.body;

  getMealsById(mealIdList)
    .then((mealObjectsList) => {
      if (mealObjectsList.length) {
        ingredientCount(mealObjectsList)
          .then((ingredientsNumArray) => {
            const leastIngredientNum = Math.min(...ingredientsNumArray.map(item => item.num));
            return ingredientsNumArray.filter(obj => obj.num === leastIngredientNum);
          })
          .then((results) => {
            const arrayOfIds = [];
            results.forEach(result => arrayOfIds.push(Number(result.id)));
            res.status(200).json(arrayOfIds);
          });
      } else {
        const { invalidIds } = mealObjectsList;
        res.status(422).json({ error: `the following ids ( ${invalidIds} ) do not match any meals` });
      }
    })
    .catch(() => {
      /* istanbul ignore next */res.status(500).send('error occured');
    });
}

export default findLeastIngredId;
