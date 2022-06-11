import express from 'express';
import ApiKeyRepo from '../database/repository/ApiKeyRepo';
import { ForbiddenError } from '../core/ApiError';
import { PublicRequest } from '../types/app-request';
import schema from './schema';
import validator, { ValidationSource } from './validator';
import asyncHandler from './asyncHandler';

const router = express.Router();

export default router.use(
  validator(schema.apiKey, ValidationSource.HEADER),
  asyncHandler(async (req: PublicRequest, res, next) => {
    // @ts-ignore
    req.apiKey = req.headers['x-api-key'].toString();
    const apiKey = await ApiKeyRepo.findByKey(req.apiKey);

    if (!apiKey) throw new ForbiddenError();
    return next();
  }),
);

