import express from 'express';
import authentication from '../../../middlewares/authentication';
import schema from './schema';
import validator, { ValidationSource } from '../../../middlewares/validator';
import TweetController from '../../../controllers/tweet/tweet.controller';

const router = express.Router();

router.post('/', authentication, validator(schema.tweet), TweetController.create);
router.get('/id/:id', authentication, validator(schema.tweetId, ValidationSource.PARAM), authentication, TweetController.getById);
router.get('/my', authentication, TweetController.getMyTweets);
router.get('/user/id/:id', authentication, validator(schema.userId, ValidationSource.PARAM), TweetController.getTweetByUser);

export default router;