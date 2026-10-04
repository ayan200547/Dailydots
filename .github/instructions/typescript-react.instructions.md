---
applyTo: "**/*.ts,**/*.tsx"
---

# TypeScript + React Engineering Standards

## TypeScript Standards
- **Strict Mode**: Always assume `strict` is enabled in `tsconfig.json`.
- **No `any`**: Avoid `any` type; use generics, unions, or `unknown` with proper narrowing.
- **Immutability**: Prefer `readonly` arrays/tuples and immutable data structures.
- **Discriminated Unions**: Use tagged unions for complex state or domain models.
- **Explicit Typing**: Always type function parameters, return values, and component props.
- **Interfaces vs Types**: Use `interface` for object contracts, `type` for unions and utility types.

## React Standards
- **Functional Components Only**: No class components.
- **Hooks Discipline**:
  - Follow [Rules of Hooks] strictly (only call at top level, never inside loops/conditions).
  - Use custom hooks for reusable logic.
- **Explicit Props Typing**: Define `Props` interfaces for every component.
- **Small Components**: Keep components focused; split large ones into smaller units.
- **State Management**:
  - Use `useState` and `useReducer` for local state.
  - Use context providers for global state, but avoid overuse.
  - Prefer lightweight solutions before introducing external state libraries.

## Error Handling
- Wrap async calls in `try/catch`.
- Provide user‑friendly error messages; avoid exposing raw system errors.
- Use error boundaries for React component trees.
- Centralize logging and monitoring for production readiness.

## Imports
- External libraries first, then internal modules.
- Group related imports; avoid duplicate or unused imports.
- Use absolute paths for cross‑feature imports, relative only within the same feature.

## Formatting & Readability
- Enforce ESLint + Prettier for consistent style.
- Keep functions/components concise and single‑purpose.
- Prefer descriptive variable and function names over comments.
- Document complex logic with short, meaningful comments.

## Refactoring Discipline
- Refactor incrementally; avoid mixing unrelated changes.
- Remove dead code promptly.
- Prioritize clarity and maintainability over micro‑optimizations.

## Collaboration Rules
- All non‑trivial changes require code review.
- Follow agreed commit conventions (e.g., Conventional Commits).
- Document architectural decisions in ADRs or README updates.
