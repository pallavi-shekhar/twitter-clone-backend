import express from 'express';
import validator, { ValidationSource } from '../../../middlewares/validator';
import authentication from '../../../middlewares/authentication';
import schema from './schema';
import FollowersController from '../../../controllers/follow/followers.controller';

const router = express.Router();

router.get('/my',authentication, FollowersController.myFollowers );
router.get('/user/id/:id', authentication, validator(schema.userId, ValidationSource.PARAM), FollowersController.userFollowers);

export default router;
