import express from 'express';
import postMealIds from '../controllers/mealIdController';
import validateMealIds from '../middlewares/validation/validateMealIds';

const router = express.Router();

router.post('/meal-ids', validateMealIds, postMealIds);

export default router;
