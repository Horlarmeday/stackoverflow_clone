import Joi from '@hapi/joi';

export function validateQuestion(req) {
  const schema = Joi.object({
    question: Joi.string()
      .min(5)
      .required(),
  });
  return schema.validate(req);
}

export function validateAnswer(req) {
  const schema = Joi.object({
    answer: Joi.string()
      .min(5)
      .required(),
  });
  return schema.validate(req);
}

export function validateSearchQuery(req) {
  const schema = Joi.object({
    currentPage: Joi.number().optional(),
    pageLimit: Joi.number().optional(),
    search: Joi.string().optional(),
  });
  return schema.validate(req);
}
