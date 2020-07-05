import _ from 'lodash';
import { validateUserLogin, validateUserSignup } from '../userValidations';
import { userSignUpService, loginUserService, searchUsersService } from '../service/userService';

class UserController {
  /**
   * create a user record
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and user data
   */
  static async userSignUp(req, res, next) {
    const { error } = validateUserSignup(req.body);
    if (error) return res.status(400).json(error.details[0].message);

    try {
      const user = await userSignUpService(req.body);
      if (!user) return res.status(400).json('Account already exists');

      return res.status(201).json({
        message: 'Successful! User created',
        data: _.pick(user, ['_id', 'firstname', 'lastname', 'email', 'phone']),
      });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * Login a user
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and user token
   */
  static async userLogin(req, res, next) {
    const { error } = validateUserLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
      const user = await loginUserService(req.body);
      if (!user) return res.status(400).json('invalid credentials');

      return res.status(200).json({ message: 'User login successful', data: user });
    } catch (err) {
      return next(err);
    }
  }

  /**
   * search users
   *
   * @static
   * @param {object} req express request object
   * @param {object} res express response object
   * @param {object} next next middleware
   * @returns {json} json object with message and user(s) data
   */
  static async searchUsers(req, res, next) {
    const {
      query: { currentPage, search },
    } = req;

    try {
      const users = await searchUsersService({ currentPage, search });

      return res.status(200).json({ message: 'Data Retrieved', data: users });
    } catch (err) {
      return next(err);
    }
  }
}
export default UserController;
