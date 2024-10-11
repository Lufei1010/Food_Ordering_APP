import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";


// Middleware to handle validation errors
const handleValidationError = async (
  req: Request,
  res: Response,
  next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array() });
    }
    next(); // Proceed to the next middleware/controller function
  }

// Custom validation logic for user fields
export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be a string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be a string"),
  body("city").isString().notEmpty().withMessage("City must be a string"),
  body("country").isString().notEmpty().withMessage("Country must be a string"),
  handleValidationError, // Run the error handling middleware after validations
];