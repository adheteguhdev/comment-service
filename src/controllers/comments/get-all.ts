import { NextFunction, Request, Response } from 'express';
import Comment from '../../models/comment';
import createError from 'http-errors';
import logger from '../../utils/logger';

const getAllComments = async (req: Request, res: Response, next: NextFunction ) => {
  try {
    const { organizationName } = req.params;
    const comments = await Comment.find({
      organizationName: organizationName,
      isDeleted: false,
    });

    logger.info('Get all comments success', { params: req.params });
    return res.status(200).json(comments);
  } catch (error) {
    const message = 'Error when get all comments';
    logger.error(message, { params: req.params, error: `${error}` });
    return next(createError(500, message + `${error}`));
  }
};

export default getAllComments;
