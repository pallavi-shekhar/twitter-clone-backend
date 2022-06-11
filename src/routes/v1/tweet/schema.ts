import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../middlewares/validator';

export default {
    tweet: Joi.object().keys({
        content: Joi.string().required().max(280),
        imageUrl: Joi.string().optional().uri()
    }),
    tweetId: Joi.object().keys({
        id: JoiObjectId().required()
    }),
    userId: Joi.object().keys({
        id: JoiObjectId().required()
    })
};