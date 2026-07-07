import Contact from "../models/Contact.js";

/**
 * @route   POST /api/contacts
 * @desc    Create a new recruiter contact submission
 * @access  Public (this is the public-facing contact form)
 *
 * By the time this function runs, contactValidationRules + runValidation
 * have already confirmed req.body is well-formed, so this function can
 * focus purely on saving the data.
 */
export const createContact = async (req, res, next) => {
  try {
    const {
      recruiterName,
      companyName,
      workEmail,
      phoneNumber,
      jobTitle,
      message,
      preferredCallbackTime,
    } = req.body;

    const contact = await Contact.create({
      recruiterName,
      companyName,
      workEmail,
      phoneNumber,
      jobTitle,
      message,
      preferredCallbackTime,
    });

    res.status(201).json({
      success: true,
      message: "Thanks for reaching out - I'll get back to you soon.",
      data: contact,
    });
  } catch (error) {
    // Pass to the centralized error handler in middleware/errorHandler.js
    next(error);
  }
};

/**
 * @route   GET /api/contacts
 * @desc    List all recruiter contact submissions, most recent first
 * @access  Intended for the admin dashboard / local testing only.
 *          In production this route should sit behind real authentication -
 *          see the README for notes on adding JWT-based auth here.
 */
export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @route   GET /api/contacts/:id
 * @desc    Fetch a single recruiter contact submission by its Mongo _id
 * @access  Intended for the admin dashboard / local testing only.
 */
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact submission not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
