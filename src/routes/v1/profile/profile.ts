import express from 'express';
import authentication from '../../../middlewares/authentication';
import schema from './schema';
import validator, { ValidationSource } from '../../../middlewares/validator';
import ProfileController from '../../../controllers/profile/profile.controller';

const router = express.Router();

router.use('/', authentication);
router.get('/my', ProfileController.my);
router.get('/user/id/:id', validator(schema.userId, ValidationSource.PARAM), ProfileController.get);

export default router;