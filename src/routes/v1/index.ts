import express from 'express';
import apiKey from '../../middlewares/apikey';
import signup from './access/signup';
import login from './access/login';
import tweet from './tweet/tweet';
import follow from './follow/follow';
import followings from './follow/followings';
import followers from './follow/followers';
import feed from './tweet/feed';
import unfollow from './follow/unfollow';
import profile from './profile/profile';
import like from './like/like';
import token from './access/token';

const router = express.Router();

router.use('/', apiKey);

router.use('/signup', signup);
router.use('/login', login);
router.use('/tweet', tweet);
router.use('/follow', follow);
router.use('/unfollow', unfollow);
router.use('/followings', followings);
router.use('/followers', followers);
router.use('/feed', feed);
router.use('/profile', profile);
router.use('/like', like);
router.use('/token', token);

export default router;