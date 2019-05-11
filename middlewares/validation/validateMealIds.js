function validateMealIds(req, res, next) {
  const userInputIds = req.body;

  if (userInputIds && typeof userInputIds === 'object' && userInputIds.length > 1) {
    next();
  } else {
    res.status(400).json({ error: 'request body must be an array containing atleast two ids' });
  }
}

export default validateMealIds;
