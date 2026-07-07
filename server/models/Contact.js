import mongoose from "mongoose";

/**
 * Schema for a recruiter/HR contact form submission.
 *
 * Field-level validation here is a *second line of defense* - the
 * express-validator middleware (see middleware/validateContact.js) already
 * checks incoming requests, but Mongoose enforces the same rules at the
 * database layer so the data stays clean even if it's inserted some other
 * way (a script, the Mongo shell, etc).
 */
const contactSchema = new mongoose.Schema({
  recruiterName: {
    type: String,
    required: [true, "Recruiter name is required"],
    trim: true,
    minlength: [2, "Recruiter name must be at least 2 characters"],
    maxlength: [100, "Recruiter name must be under 100 characters"],
  },
  companyName: {
    type: String,
    required: [true, "Company name is required"],
    trim: true,
    minlength: [2, "Company name must be at least 2 characters"],
    maxlength: [150, "Company name must be under 150 characters"],
  },
  workEmail: {
    type: String,
    required: [true, "Work email is required"],
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    minlength: [7, "Phone number looks too short"],
    maxlength: [20, "Phone number looks too long"],
  },
  jobTitle: {
    type: String,
    required: [true, "Job title / opportunity is required"],
    trim: true,
    maxlength: [150, "Job title must be under 150 characters"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    minlength: [10, "Message should be at least 10 characters"],
    maxlength: [2000, "Message must be under 2000 characters"],
  },
  preferredCallbackTime: {
    type: String,
    trim: true,
    maxlength: [100, "Preferred callback time must be under 100 characters"],
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
