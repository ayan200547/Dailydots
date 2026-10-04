# GitHub Copilot Instructions

This file guides GitHub Copilot’s behavior for the **Daily Journal with Mood Tracker** web application built with **Vite + React + Supabase**.

---

## 🎨 Styling
- Use **Tailwind CSS (Recommended)** for all styling.
- Prefer utility classes over custom CSS unless absolutely necessary.
- Suggest responsive design patterns (mobile-first).

---

## 📂 File Structure
- Follow **Feature-based structure (Recommended)**:
- Keep feature-specific logic inside its folder.
- Shared utilities/components go under `shared/`.

---

## ⚙️ Coding Preferences
- Enforce **Strict TypeScript (Recommended)**:
- Always generate `.tsx` for React components.
- Use explicit types for props, state, and Supabase queries.
- Prefer `interface` for component props.

---

## 🧑‍💻 Copilot Coding Style
- Follow **ESLint + Prettier rules (Recommended)**:
- Auto-format suggestions to match Prettier defaults.
- Respect ESLint rules for consistency and readability.
- Avoid unused imports and variables.

---

## 🚀 Copilot Guidance
- When suggesting code:
- Prefer **functional components** with hooks (`useState`, `useEffect`, `useContext`).
- Use **Supabase client** for authentication, database, and storage.
- Suggest **async/await** for Supabase queries.
- Recommend **error handling patterns** (try/catch, toast notifications).
- When generating tests:
- Use **Vitest + React Testing Library**.
- Focus on unit tests for components and integration tests for Supabase calls.

---

## ✅ Example Prompts for Copilot
- *"Generate a Tailwind-styled form for adding a journal entry."*
- *"Create a Supabase query to fetch mood logs for the current user."*
- *"Suggest a TypeScript interface for JournalEntry with title, content, mood, and date."*
- *"Write a Vitest test for the MoodTracker component."*

---

## 🔒 Security & Best Practices
- Always sanitize user input before saving to Supabase.
- Suggest environment variable usage for Supabase keys (`.env`).
- Avoid hardcoding secrets in code.
