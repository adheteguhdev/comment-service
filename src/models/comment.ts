import * as mongoose from 'mongoose';
import moment from 'moment';
import { v4 } from 'uuid';
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  _id: { type: String, default: v4 },
  comment: { type: String, trim: true },
  organizationName: { type: String, index: true },
  isDeleted: { type: Boolean, default: false, index: true },
  createdAt: { type: Date, default: moment().format() },
}, {
  collection: "comment",
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: (_, comment) => {
      comment.id = comment._id;
      delete comment._id;
      delete comment.isDeleted;
    }
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
