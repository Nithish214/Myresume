import express from "express";
import {
  createContact,
  getContacts,
  getContactById,
} from "../controllers/contactController.js";
import {
  contactValidationRules,
  runValidation,
} from "../middleware/validateContact.js";

const router = express.Router();

// POST /api/contacts - submit the recruiter contact form
// Validation middleware runs first; the controller only ever sees clean data.
router.post("/", contactValidationRules, runValidation, createContact);

// GET /api/contacts - list all submissions (admin/testing)
router.get("/", getContacts);

// GET /api/contacts/:id - fetch a single submission (admin/testing)
router.get("/:id", getContactById);

export default router;
