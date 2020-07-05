import Joi from '@hapi/joi';

// function to validate
export function validateUserSignup(user) {
  const schema = Joi.object({
    firstname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    lastname: Joi.string()
      .min(3)
      .max(50)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    phone: Joi.string()
      .min(11)
      .max(11)
      .required(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  });
  return schema.validate(user);
}

export function validateUserLogin(req) {
  const schema = Joi.object({
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required(),
  });
  return schema.validate(req);
}
