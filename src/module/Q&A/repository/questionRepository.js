import Question from '../model/question';
import { calculateLimitAndOffset, paginate } from '../../../helpers/helper';
import Subscription from '../model/subscription';

/**
 * create a question
 *
 * @static
 * @returns {json} json object with new question data
 * @param data accepts question and id of the user
 */
export const createQuestion = async data => {
  const { question, sub } = data;
  const newQuestion = new Question({
    question,
    user: sub,
  });
  await newQuestion.save();
  return newQuestion;
};

/**
 * utility function that counts the number of documents in a collection
 *
 * @static
 * @returns {json} json object with new question data
 * @param model accepts a model class
 */
export const countDocument = async model => {
  return model.estimatedDocumentCount();
};

/**
 * gets all questions
 *
 * @static
 * @returns {json} json array of objects of questions
 * @param data accepts currentPage number
 */
export const getQuestions = async data => {
  const { limit, offset } = calculateLimitAndOffset();
  const questions = await Question.find()
    .limit(limit)
    .skip(offset)
    .select({ __v: 0 })
    .sort('-createdAt');
  const meta = paginate(data, await countDocument(Question), questions);
  return { questions, meta };
};

/**
 * search questions
 *
 * @static
 * @returns {json} json array of objects of questions
 * @param data accepts search query
 */
export const searchQuestions = async data => {
  const { limit, offset } = calculateLimitAndOffset();
  const questions = await Question.find(
    { $text: { $search: data } },
    { score: { $meta: 'textScore' } }
  )
    .limit(limit)
    .skip(offset)
    .select({ __v: 0 })
    .sort({ score: { $meta: 'textScore' } });
  const meta = paginate(data, await countDocument(Question), questions);
  return { questions, meta };
};

/**
 * get question by id
 *
 * @static
 * @returns {json} json object with question data
 * @param data accepts id of question
 */
export const getQuestionById = async data => {
  return Question.findById(data);
};

/**
 * increase question vote
 *
 * @static
 * @returns {json} json object with question data
 * @param data accepts id of question
 */
export const upVoteQuestion = async data => {
  return Question.findByIdAndUpdate(
    data,
    {
      $inc: { vote: 1 },
    },
    {
      new: true,
    }
  );
};

/**
 * decreases question vote
 *
 * @static
 * @returns {json} json object with question data
 * @param data accepts id of question
 */
export const downVoteQuestion = async data => {
  return Question.findByIdAndUpdate(
    data,
    {
      $inc: { vote: -1 },
    },
    {
      new: true,
    }
  );
};

/**
 * subscribe to a question
 *
 * @static
 * @returns {json} json object with new subscription data
 * @param data accepts question and id of the user
 */
export const subscribeQuestion = async data => {
  const { user, id } = data;
  const subscription = new Subscription({
    user,
    question: id,
  });
  await subscription.save();
  return subscription;
};

/**
 * get email of subscribers of a question
 *
 * @static
 * @returns {json} json object with subscribers email
 * @param data accepts question and id of the question
 */
export const getSubscribersEmail = async data => {
  return Subscription.find({ question: data }).select({ 'user.email': 1, _id: 0 });
};
