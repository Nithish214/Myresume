import { body, validationResult } from "express-validator";

/**
 * Validation rules for POST /api/contacts.
 *
 * This runs *before* the request reaches the controller. Keeping it as its
 * own middleware (instead of inline in the controller) keeps the controller
 * focused on "what to do with valid data" rather than "is this data valid".
 */
export const contactValidationRules = [
  body("recruiterName")
    .trim()
    .notEmpty()
    .withMessage("Recruiter name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Recruiter name must be between 2 and 100 characters"),

  body("companyName")
    .trim()
    .notEmpty()
    .withMessage("Company name is required")
    .isLength({ min: 2, max: 150 })
    .withMessage("Company name must be between 2 and 150 characters"),

  body("workEmail")
    .trim()
    .notEmpty()
    .withMessage("Work email is required")
    .isEmail()
    .withMessage("Please provide a valid email address")
    .normalizeEmail(),

  body("phoneNumber")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 7, max: 20 })
    .withMessage("Please provide a valid phone number"),

  body("jobTitle")
    .trim()
    .notEmpty()
    .withMessage("Job title / opportunity is required")
    .isLength({ max: 150 })
    .withMessage("Job title must be under 150 characters"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message is required")
    .isLength({ min: 10, max: 2000 })
    .withMessage("Message must be between 10 and 2000 characters"),

  body("preferredCallbackTime")
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 })
    .withMessage("Preferred callback time must be under 100 characters"),
];

/**
 * Reads the results collected by the rules above. If any rule failed,
 * responds with 422 and a list of field-level errors the frontend can map
 * directly onto form fields. Otherwise calls next() to continue to the
 * controller.
 */
export const runValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array().map((err) => ({
        field: err.path,
        message: err.msg,
      })),
    });
  }
  next();
};
