import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { useReveal } from "../hooks/useReveal.js";
import { submitContact } from "../services/api.js";

const INITIAL_FORM = {
  recruiterName: "",
  companyName: "",
  workEmail: "",
  phoneNumber: "",
  jobTitle: "",
  message: "",
  preferredCallbackTime: "",
};

// Field-by-field validation mirrors the rules enforced server-side in
// server/middleware/validateContact.js - keeping both in sync means the
// user sees the same rules instantly instead of waiting on a round trip.
function validate(values) {
  const errors = {};

  if (!values.recruiterName.trim()) {
    errors.recruiterName = "Recruiter name is required";
  } else if (values.recruiterName.trim().length < 2) {
    errors.recruiterName = "Must be at least 2 characters";
  }

  if (!values.companyName.trim()) {
    errors.companyName = "Company name is required";
  } else if (values.companyName.trim().length < 2) {
    errors.companyName = "Must be at least 2 characters";
  }

  if (!values.workEmail.trim()) {
    errors.workEmail = "Work email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(values.workEmail.trim())) {
    errors.workEmail = "Enter a valid email address";
  }

  if (!values.phoneNumber.trim()) {
    errors.phoneNumber = "Phone number is required";
  } else if (values.phoneNumber.trim().length < 7) {
    errors.phoneNumber = "Enter a valid phone number";
  }

  if (!values.jobTitle.trim()) {
    errors.jobTitle = "Job title / opportunity is required";
  }

  if (!values.message.trim()) {
    errors.message = "Message is required";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message should be at least 10 characters";
  }

  return errors;
}

function Field({ label, name, error, children }) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-mono text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400 mb-1.5"
      >
        {label}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

const inputClasses = (hasError) =>
  `w-full rounded-lg border bg-paperCard dark:bg-white/5 px-4 py-2.5 text-sm
   text-graphite dark:text-white placeholder:text-slate-400
   focus:outline-none focus:ring-2 focus:ring-signal/50
   transition-colors ${
     hasError
       ? "border-red-400 dark:border-red-500/60"
       : "border-slate-200 dark:border-white/10 focus:border-signal"
   }`;

export default function Contact() {
  const headerRef = useReveal();
  const formRef = useReveal();

  const [values, setValues] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [serverMessage, setServerMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field's error as soon as the user starts fixing it
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setStatus("loading");
    setServerMessage("");

    try {
      const result = await submitContact(values);
      setStatus("success");
      setServerMessage(result.message || "Thanks - I'll be in touch soon.");
      setValues(INITIAL_FORM);
    } catch (err) {
      setStatus("error");
      // Surface field-level errors returned by express-validator, if any
      const apiErrors = err?.response?.data?.errors;
      if (Array.isArray(apiErrors)) {
        const mapped = {};
        apiErrors.forEach((e) => {
          mapped[e.field] = e.message;
        });
        setErrors(mapped);
      }
      setServerMessage(
        err?.response?.data?.message ||
          "Something went wrong sending your message. Please try again."
      );
    }
  };

  return (
    <section id="contact" className="px-6 sm:px-8 py-20 sm:py-28">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="reveal mb-10 text-center sm:text-left">
          <p className="section-eyebrow">// Get in touch</p>
          <h2 className="section-heading">
            Hiring or recruiting? Leave your details and I'll get back to you.
          </h2>
        </div>

        <form
          ref={formRef}
          onSubmit={handleSubmit}
          noValidate
          className="reveal card p-6 sm:p-9 space-y-6"
        >
          <div className="grid sm:grid-cols-2 gap-6">
            <Field label="Recruiter Name" name="recruiterName" error={errors.recruiterName}>
              <input
                id="recruiterName"
                name="recruiterName"
                type="text"
                autoComplete="name"
                value={values.recruiterName}
                onChange={handleChange}
                placeholder="Jane Doe"
                className={inputClasses(errors.recruiterName)}
                aria-invalid={Boolean(errors.recruiterName)}
              />
            </Field>

            <Field label="Company Name" name="companyName" error={errors.companyName}>
              <input
                id="companyName"
                name="companyName"
                type="text"
                autoComplete="organization"
                value={values.companyName}
                onChange={handleChange}
                placeholder="Acme Corp"
                className={inputClasses(errors.companyName)}
                aria-invalid={Boolean(errors.companyName)}
              />
            </Field>

            <Field label="Work Email" name="workEmail" error={errors.workEmail}>
              <input
                id="workEmail"
                name="workEmail"
                type="email"
                autoComplete="email"
                value={values.workEmail}
                onChange={handleChange}
                placeholder="jane@acme.com"
                className={inputClasses(errors.workEmail)}
                aria-invalid={Boolean(errors.workEmail)}
              />
            </Field>

            <Field label="Phone Number" name="phoneNumber" error={errors.phoneNumber}>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                autoComplete="tel"
                value={values.phoneNumber}
                onChange={handleChange}
                placeholder="+353 1 234 5678"
                className={inputClasses(errors.phoneNumber)}
                aria-invalid={Boolean(errors.phoneNumber)}
              />
            </Field>

            <Field label="Job Title / Opportunity" name="jobTitle" error={errors.jobTitle}>
              <input
                id="jobTitle"
                name="jobTitle"
                type="text"
                value={values.jobTitle}
                onChange={handleChange}
                placeholder="Senior SRE, Platform Team"
                className={inputClasses(errors.jobTitle)}
                aria-invalid={Boolean(errors.jobTitle)}
              />
            </Field>

            <Field
              label="Preferred Callback Time (optional)"
              name="preferredCallbackTime"
              error={errors.preferredCallbackTime}
            >
              <input
                id="preferredCallbackTime"
                name="preferredCallbackTime"
                type="text"
                value={values.preferredCallbackTime}
                onChange={handleChange}
                placeholder="Weekdays after 3pm GMT"
                className={inputClasses(errors.preferredCallbackTime)}
              />
            </Field>
          </div>

          <Field label="Message" name="message" error={errors.message}>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={handleChange}
              placeholder="Tell me a bit about the role and team..."
              className={inputClasses(errors.message)}
              aria-invalid={Boolean(errors.message)}
            />
          </Field>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  Send Message <Send size={16} />
                </>
              )}
            </button>

            {status === "success" && (
              <p
                role="status"
                className="flex items-center gap-2 text-sm text-signal-dark dark:text-signal"
              >
                <CheckCircle2 size={16} /> {serverMessage}
              </p>
            )}

            {status === "error" && (
              <p role="alert" className="flex items-center gap-2 text-sm text-red-500">
                <AlertCircle size={16} /> {serverMessage}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
