import { validateQuestion, validateSearchQuery } from '../validations/questionValidation';
import {
  askQuestionService,
  downVoteQuestionsService,
  getQuestionsService,
  subscribeQuestionService,
  upVoteQuestionsService,
} from '../service/questionService';

class QuestionController {
  /**
   * ask a question
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and question data
   */
  static async askQuestion(req, res, next) {
    const { error } = validateQuestion(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { question } = req.body;
    const { sub } = req.user;

    try {
      const newQuestion = await askQuestionService({ question, sub });

      return res.status(201).json({
        message: 'Question created',
        data: newQuestion,
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * get questions
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and questions data
   */
  static async getQuestions(req, res, next) {
    const { error } = validateSearchQuery(req.query);
    if (error) return res.status(400).json(error.details[0].message);

    const {
      query: { currentPage, pageLimit, search },
    } = req;

    try {
      const questions = await getQuestionsService({ currentPage, pageLimit, search });

      return res.status(200).json({
        message: 'Data Retrieved',
        data: questions,
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * upvote a question
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and question data
   */
  static async upVoteQuestion(req, res, next) {
    const { id } = req.params;

    try {
      const question = await upVoteQuestionsService(id);
      if (!question) return res.status(400).json('An error occurred');

      return res.status(200).json({
        message: 'Question upvoted',
        data: question,
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * downvote a question
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and question data
   */
  static async downVoteQuestion(req, res, next) {
    const { id } = req.params;

    try {
      const question = await downVoteQuestionsService(id);
      if (!question) return res.status(400).json('An error occurred');

      return res.status(200).json({
        message: 'Question downvoted',
        data: question,
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * ask a question
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and subscription data
   */
  static async subscribeQuestion(req, res, next) {
    const { id } = req.params;
    const { sub } = req.user;

    try {
      const subscription = await subscribeQuestionService({ id, sub });
      if (!subscription) return res.status(400).json('You cannot subscribe twice');

      return res.status(201).json({
        message: 'Successfully subscribed to question',
        data: subscription,
      });
    } catch (err) {
      return next(err);
    }
  }
}

export default QuestionController;
