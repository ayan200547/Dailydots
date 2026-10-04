---
applyTo: "**/*"
---

# General Engineering Standards

## Naming Conventions
- Use clear, descriptive names for files, variables, and functions.
- Follow `camelCase` for variables/functions, `PascalCase` for components/classes, and `kebab-case` for file names.
- Avoid abbreviations unless widely recognized.

## File Structure
- Organize code by **feature or domain** rather than technology.
- Keep shared utilities and components in a `shared/` or `common/` directory.
- Place tests alongside the files they validate.

## Readability
- Keep functions small and focused; one responsibility per function.
- Prefer explicit over implicit logic.
- Maintain consistent indentation and spacing.

## Comments
- Use comments to explain **why**, not **what** (the code should be self‑explanatory).
- Document complex algorithms, architectural decisions, and public APIs.
- Avoid redundant comments.

## Refactoring Discipline
- Refactor incrementally; do not mix unrelated changes in one commit.
- Remove dead code promptly.
- Favor clarity and maintainability over premature optimization.

## Error Handling
- Always handle errors gracefully; avoid silent failures.
- Provide meaningful error messages for debugging and user feedback.
- Use centralized error handling where possible.

## Imports
- Keep imports ordered: external libraries first, then internal modules.
- Avoid unused imports; remove them immediately.
- Use relative paths only within the same feature; prefer absolute paths for cross‑feature imports.

## Formatting
- Enforce consistent formatting with automated tools (e.g., Prettier, ESLint).
- Maintain a single source of truth for style rules.
- No trailing spaces, unused variables, or inconsistent line breaks.

## Collaboration Rules
- Follow agreed branching strategy (e.g., `main` for production, `develop` for integration).
- Use clear, descriptive commit messages (prefer Conventional Commits).
- Conduct code reviews for all non‑trivial changes.
- Document decisions in README or ADRs (Architecture Decision Records).
