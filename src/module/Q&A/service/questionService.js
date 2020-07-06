import {
  createQuestion,
  downVoteQuestion,
  findExistingSubscriber,
  getQuestionById,
  getQuestions,
  searchQuestions,
  subscribeQuestion,
  upVoteQuestion,
} from '../repository/questionRepository';
import { getUserById } from '../../User/repository/userRepository';

/**
 * ask question service
 *
 * @static
 * @returns {json} json object with question data
 * @param body accepts question and id of current user
 */
export const askQuestionService = async body => {
  return createQuestion(body);
};

/**
 * gets questions service
 *
 * @static
 * @returns {json} json array of objects of questions
 * @param body
 */
export const getQuestionsService = async body => {
  const { currentPage, pageLimit, search } = body;
  if (search) {
    return searchQuestions(body);
  }
  return getQuestions({ currentPage, pageLimit });
};

/**
 * upvote question service
 *
 * @static
 * @returns {json} json object with question data
 * @param body accepts id of question
 */
export const upVoteQuestionsService = async body => {
  const question = await getQuestionById(body);

  if (question) return upVoteQuestion(body);

  return null;
};

/**
 * downvote question service
 *
 * @static
 * @returns {json} json object with question data
 * @param body accepts id of question
 */
export const downVoteQuestionsService = async body => {
  const question = await getQuestionById(body);

  if (question) return downVoteQuestion(body);

  return null;
};

/**
 * subscribe question service
 *
 * @static
 * @returns {json} json object with question data
 * @param body accepts user id and id of question
 */
export const subscribeQuestionService = async body => {
  const { sub, id } = body;
  const user = await getUserById(sub);

  const existingSubscriber = await findExistingSubscriber(body);

  if (user && !existingSubscriber.length) {
    return subscribeQuestion({ user, id });
  }
  return null;
};
