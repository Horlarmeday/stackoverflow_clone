import { answerQuestion, getAnswers, searchAnswers } from '../repository/answerRepository';
import { getQuestionById, getSubscribersEmail } from '../repository/questionRepository';
// import { sendEmail } from '../../../helpers/sendMail';
import agenda from '../../../jobs/agenda';

/**
 * send emails to subscribers
 *
 * @static
 * @returns {json} json object with answer data
 * @param id accepts the id of the question
 */
const mailSubscribers = async id => {
  const emails = await getSubscribersEmail(id);

  if (emails.length > 0) {
    const mails = emails.map(email => {
      return email.user.email;
    });
    return agenda.schedule('in 20 minutes', 'subscribers email', { mails });
  }
  return false;
};

/**
 * answer question service
 *
 * @static
 * @returns {json} json object with answer data
 * @param body accepts answer, user id and id of question
 */
export const answerQuestionsService = async body => {
  const question = await getQuestionById(body.id);

  if (question) {
    const answer = await answerQuestion(body);

    await mailSubscribers(answer.question);

    return answer;
  }

  return null;
};

/**
 * search answers service
 *
 * @static
 * @returns {json} json array of objects of answers
 * @param body
 */
export const searchAnswersService = async body => {
  const { currentPage, search, pageLimit } = body;
  if (search) {
    return searchAnswers(body);
  }
  return getAnswers({ currentPage, pageLimit });
};
