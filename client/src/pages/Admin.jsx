import { useEffect, useState } from "react";
import {
  Lock,
  RefreshCw,
  Mail,
  Phone,
  Building2,
  Briefcase,
  Clock,
  AlertCircle,
} from "lucide-react";
import { fetchContacts } from "../services/api.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

/**
 * ADMIN ACCESS - LEARNING PROJECT NOTE
 * -------------------------------------
 * This page is protected by a single shared password compared entirely in
 * the browser (see handleLogin below). That is NOT real authentication:
 * anyone who reads the client bundle can find the password, and the
 * GET /api/contacts route on the server has no auth check of its own.
 *
 * To make this production-ready:
 *  1. Add a real login endpoint on the server (e.g. POST /api/auth/login)
 *     that checks credentials against a hashed password and returns a
 *     signed JWT.
 *  2. Store that JWT in memory (or an httpOnly cookie) on the client and
 *     send it as an Authorization header on requests to /api/contacts.
 *  3. Add an Express middleware that verifies the JWT on the server before
 *     allowing GET /api/contacts and GET /api/contacts/:id to run.
 * Until then, treat this admin page as a local/dev convenience only.
 */

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

function LoginGate({ onSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError("");
      onSuccess();
    } else {
      setError("Incorrect password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper dark:bg-ink px-6">
      <form
        onSubmit={handleSubmit}
        className="card p-8 w-full max-w-sm space-y-5"
      >
        <div className="flex items-center gap-2 text-graphite dark:text-white">
          <Lock size={18} className="text-signal-dark dark:text-signal" />
          <h1 className="font-display text-lg font-bold">Admin Access</h1>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Enter the admin password to view recruiter submissions.
        </p>

        <div>
          <label htmlFor="admin-password" className="sr-only">
            Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full rounded-lg border border-slate-200 dark:border-white/10 bg-paperCard dark:bg-white/5 px-4 py-2.5 text-sm text-graphite dark:text-white focus:outline-none focus:ring-2 focus:ring-signal/50 focus:border-signal"
          />
          {error && (
            <p role="alert" className="mt-2 text-xs text-red-500 flex items-center gap-1">
              <AlertCircle size={12} /> {error}
            </p>
          )}
        </div>

        <button type="submit" className="btn-primary w-full">
          Log In
        </button>
      </form>
    </div>
  );
}

function ContactCard({ contact }) {
  const submittedDate = new Date(contact.createdAt).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
        <div>
          <p className="font-display font-semibold text-graphite dark:text-white">
            {contact.recruiterName}
          </p>
          <p className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
            <Building2 size={14} /> {contact.companyName}
          </p>
        </div>
        <span className="font-mono text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
          <Clock size={12} /> {submittedDate}
        </span>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-1.5 font-mono text-xs text-slate-500 dark:text-slate-400 mb-3">
        <a href={`mailto:${contact.workEmail}`} className="flex items-center gap-1.5 hover:text-signal-dark dark:hover:text-signal">
          <Mail size={13} /> {contact.workEmail}
        </a>
        <a href={`tel:${contact.phoneNumber}`} className="flex items-center gap-1.5 hover:text-signal-dark dark:hover:text-signal">
          <Phone size={13} /> {contact.phoneNumber}
        </a>
        <span className="flex items-center gap-1.5">
          <Briefcase size={13} /> {contact.jobTitle}
        </span>
      </div>

      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
        {contact.message}
      </p>

      {contact.preferredCallbackTime && (
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Preferred callback: {contact.preferredCallbackTime}
        </p>
      )}
    </div>
  );
}

function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const loadContacts = async () => {
    setStatus("loading");
    try {
      const result = await fetchContacts();
      setContacts(result.data || []);
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err?.response?.data?.message ||
          "Couldn't load submissions. Is the backend server running?"
      );
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return (
    <div className="min-h-screen bg-paper dark:bg-ink px-6 sm:px-8 py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="section-eyebrow">// Admin</p>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-graphite dark:text-white">
              Recruiter Submissions
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button onClick={loadContacts} className="btn-secondary !px-4 !py-2">
              <RefreshCw size={15} className={status === "loading" ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </div>

        {status === "loading" && (
          <p className="font-mono text-sm text-slate-500 dark:text-slate-400">
            Loading submissions...
          </p>
        )}

        {status === "error" && (
          <p role="alert" className="flex items-center gap-2 text-sm text-red-500">
            <AlertCircle size={16} /> {errorMessage}
          </p>
        )}

        {status === "success" && contacts.length === 0 && (
          <p className="text-sm text-slate-500 dark:text-slate-400">
            No submissions yet - they'll show up here as soon as someone uses
            the contact form.
          </p>
        )}

        {status === "success" && contacts.length > 0 && (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <ContactCard key={contact._id} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <LoginGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return <Dashboard />;
}
