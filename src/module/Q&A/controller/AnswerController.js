import { validateAnswer, validateSearchQuery } from '../validations/questionValidation';
import { answerQuestionsService, searchAnswersService } from '../service/answerService';

class AnswerController {
  /**
   * answer a question
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and question data
   */
  static async answerQuestion(req, res, next) {
    const { error } = validateAnswer(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    const { id } = req.params;
    const { answer } = req.body;
    const { sub } = req.user;

    try {
      const newAnswer = await answerQuestionsService({ id, sub, answer });
      if (!newAnswer) return res.status(400).json('An error occurred');

      return res.status(201).json({
        message: 'Question answered',
        data: newAnswer,
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * search answers
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and answers data
   */
  static async searchAnswers(req, res, next) {
    const { error } = validateSearchQuery(req.query);
    if (error) return res.status(400).json(error.details[0].message);

    const {
      query: { currentPage, pageLimit, search },
    } = req;

    try {
      const answers = await searchAnswersService({ currentPage, pageLimit, search });

      return res.status(200).json({
        message: 'Data Retrieved',
        data: answers,
      });
    } catch (err) {
      return next(err);
    }
  }
}
export default AnswerController;
