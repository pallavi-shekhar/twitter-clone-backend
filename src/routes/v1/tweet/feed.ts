import express from 'express';
import authentication from '../../../middlewares/authentication';
import FeedController from '../../../controllers/tweet/feed.controller';

const router = express.Router();

router.get('/', authentication, FeedController.getFeed);


export default router;

