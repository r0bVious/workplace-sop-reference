import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }
    return res.status(422).json({ errors: errors.array() });
  };
};

const signUpValidator = [
  body("name").notEmpty().withMessage("Username Required"),
  body("position").notEmpty().withMessage("Classroom Assignment Required"),
  body("password").notEmpty().trim().withMessage("Password Required"),
];

const commentValidator = [
  body("comment_content")
    .notEmpty()
    .trim()
    .withMessage("Comment Field Empty - Unable to Save Comment"),
];

const articleValidator = [
  body("article_content")
    .notEmpty()
    .trim()
    .withMessage("Article Content Empty - Unable to Save Article"),
  body("article_content")
    .notEmpty()
    .trim()
    .withMessage("Article Content Empty - Unable to Save Article"),
];

export { signUpValidator, commentValidator, articleValidator, validate };
