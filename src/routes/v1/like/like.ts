import express from 'express';
import validator, { ValidationSource } from '../../../middlewares/validator';
import authentication from '../../../middlewares/authentication';
import schema from './schema';
import LikeController from '../../../controllers/like/like.controller';

const router = express.Router();

router.post('/id/:id', authentication, validator(schema.tweetId, ValidationSource.PARAM), LikeController.create);

export default router;