import Answer from '../model/answer';
import { calculateLimitAndOffset, paginate } from '../../../helpers/helper';
import Question from '../model/question';
import { countDocument } from './questionRepository';

/**
 * create answer
 *
 * @static
 * @returns {json} json object with question data
 * @param data accepts answer, user id and id of question
 */
export const answerQuestion = async data => {
  const { answer, id, sub } = data;
  const newAnswer = new Answer({
    answer,
    question: id,
    user: sub,
  });
  await newAnswer.save();
  return newAnswer;
};

/**
 * search answers
 *
 * @static
 * @returns {json} json array of objects of answers
 * @param data accepts search query
 */
export const searchAnswers = async data => {
  const { limit, offset } = calculateLimitAndOffset();
  const answers = await Answer.find(
    { $text: { $search: data.search } },
    { score: { $meta: 'textScore' } }
  )
    .limit(limit)
    .skip(offset)
    .select({ __v: 0 })
    .sort({ score: { $meta: 'textScore' } });
  const meta = paginate(data.currentPage, await countDocument(Question), answers, data.pageLimit);
  return { answers, meta };
};

/**
 * gets all answers
 *
 * @static
 * @returns {json} json array of objects of answers
 * @param data accepts currentPage number
 */
export const getAnswers = async data => {
  const { limit, offset } = calculateLimitAndOffset();
  const answers = await Answer.find()
    .limit(limit)
    .skip(offset)
    .select({ __v: 0 })
    .sort('-createdAt');
  const meta = paginate(data.currentPage, await countDocument(Question), answers, data.pageLimit);
  return { answers, meta };
};
