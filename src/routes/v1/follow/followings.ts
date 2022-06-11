import express from 'express';
import validator, { ValidationSource } from '../../../middlewares/validator';
import authentication from '../../../middlewares/authentication';
import schema from './schema';
import FollowingsController from '../../../controllers/follow/followings.controller';

const router = express.Router();

router.get('/my',authentication, FollowingsController.myFollowings );
router.get('/user/id/:id', authentication, validator(schema.userId, ValidationSource.PARAM), FollowingsController.userFollowings);

export default router;
