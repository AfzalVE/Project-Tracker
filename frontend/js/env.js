// Detect local environment (localhost or 127.0.0.1)
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

// Use empty string in production so requests go to relative /api paths (which vercel.json routes to the backend)
export const BACKEND_URL = isLocal ? "http://localhost:5000" : "";
