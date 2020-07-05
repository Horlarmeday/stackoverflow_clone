import { findExistingUser, findUserByEmail, createUser, searchUsers, getUsers } from '../repository/userRepository';
import { getAnswers, searchAnswers } from '../../Q&A/repository/answerRepository';

/**
 * sign up a user service
 *
 * @static
 * @returns {json} json object with user token
 * @param body object accept email, password, phone and firstname and lastname
 */
export const userSignUpService = async body => {
  const user = await findExistingUser(body);
  if (user.length > 0) return false;

  return createUser(body);
};

/**
 * login a user service
 *
 * @static
 * @returns {json} json object with user token/null
 * @param body accept email and password
 */
export const loginUserService = async body => {
  const { email, password } = body;

  const user = await findUserByEmail(email);

  if (user && (await user.comparePassword(password))) {
    return user.generateAuthToken();
  }
  return null;
};

/**
 * search users service
 *
 * @static
 * @returns {json} json array of objects of users
 * @param body
 */
export const searchUsersService = async body => {
  const { currentPage, search } = body;
  if (search) {
    return searchUsers(body);
  }
  return getUsers(currentPage);
};
