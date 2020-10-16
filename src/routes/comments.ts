import { Router } from 'express';
import { createComment, getAllComments, deleteAllComments } from '../controllers/comments';
const router = Router();

router.post('/:organizationName/comments', createComment);
router.get('/:organizationName/comments', getAllComments);
router.delete('/:organizationName/comments', deleteAllComments);

export = router;
