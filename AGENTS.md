# AGENTS.md

## Scope
Defines how agents interact with this repository.  
This file complements existing instruction files and enforces workflow, security, and collaboration boundaries.

## Source of Truth
Agents must follow these instruction files:
- `general.instructions.md`
- `copilot-instructions.md`
- `typescript-react.instructions.md`
- `design.instructions.md`

### Rule Priority
1. **Security boundaries** (never bypassed).  
2. **TypeScript/React rules** (`typescript-react.instructions.md`).  
3. **Design principles** (`design.instructions.md`).  
4. **General engineering standards** (`general.instructions.md`).  
5. **Copilot guidance** (`copilot-instructions.md`).  

Conflicts must be resolved in this order.

## Workflow Expectations
- Make **small, incremental changes**; avoid large refactors.  
- Follow established patterns for services, components, and hooks.  
- Keep commits scoped and focused.  
- Document reasoning for non‑trivial changes.

## Security Boundaries
- Do **not** commit secrets, credentials, or API keys.  
- Do **not** weaken TypeScript strictness or introduce `any`.  
- Do **not** bypass Supabase authentication or authorization.  
- Respect environment variable usage (`.env`).

## Common Commands
- `npm install` — install dependencies  
- `npm run dev` — start development server  
- `npm run build` — production build  
- `npm run lint` — lint codebase  
- `npm run format` — apply formatting rules  
- `npm run typecheck` — enforce TypeScript strictness  
- `npm run test` — run unit/integration tests  

## Restrictions
Agents must **not modify**:
- `dist/` or other build artifacts  
- Lockfiles (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`)  
- Generated files (e.g., auto‑generated types, migrations)  

## Reporting Changes
- Provide clear commit messages summarizing modifications.  
- Reference relevant instruction files when rules guided the change.  
- Flag deviations or unresolved conflicts for human review.  

---
Agents are expected to act with discipline, clarity, and respect for established standards.
