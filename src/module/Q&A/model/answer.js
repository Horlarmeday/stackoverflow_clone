/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
import { model, Schema } from 'mongoose';

const answerSchema = new Schema(
  {
    answer: {
      type: String,
      required: true,
      minlength: 5,
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
    },

    vote: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamp: true }
);

answerSchema.index({ answer: 'text' });
export default model('Answer', answerSchema);
