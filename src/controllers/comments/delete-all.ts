import { NextFunction, Request, Response } from 'express';
import Comment from '../../models/comment';
import createError from 'http-errors';
import logger from '../../utils/logger';

const deleteAllComments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { organizationName } = req.params;
    const deletedComment = await Comment.updateMany({
      organizationName: organizationName,
      isDeleted: false
    }, {
      $set: {
        isDeleted: true
      }
    });

    logger.info('Delete all comments success', { params: `${req.params}: ${deletedComment}` });
    return res.status(204).json();
  } catch (error) {
    const message = 'Error when delete all comments';
    logger.error(message, { params: req.params, error: `${error}` });
    return next(createError(500, message + `${error}`));
  };
};

export default deleteAllComments;