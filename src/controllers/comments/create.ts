import { NextFunction, Request, Response } from 'express';
import Comment from '../../models/comment';
import createError from 'http-errors';
import logger from '../../utils/logger';

const createComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationName } = req.params;
    const newComment = new Comment({
      ...req.body,
      organizationName: organizationName
    });

    try {
      await newComment.save();

      logger.info('Create comment success', { params: newComment });
      return res.status(201).json(newComment);
    } catch (error) {
      const message = 'Error when save comment';
      logger.error(message, { params: newComment, error: `${error}` });
      return next(createError(500, message + `${error}`));
    };

  } catch (error) {
    const message = 'Error when create comment';
    logger.error(message, { error: `${error}` });
    return next(createError(500, message + `${error}`));
  };
};

export default createComment;

