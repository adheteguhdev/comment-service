import Comment from '../models/comment';
import logger from './logger';
import { commentsData } from '../test/data/comment';

const initData = async () => {
  const totalComment = await Comment.countDocuments();

  if (totalComment === 0) {
    try {
      logger.info('Initializing data...');
      await Comment.create(commentsData);
      logger.info('Data initialization complete');
    } catch (error) {
      logger.error('Error when initialize data', { error: `${error}` });
    };
  };
};

export default initData;