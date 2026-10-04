---
applyTo: "**/*.css,**/*.ts,**/*.tsx"
---

# CSS + Tailwind Engineering Standards

## Tailwind-First Approach
- Use **Tailwind utility classes** for all styling by default.
- Avoid writing custom CSS unless Tailwind cannot cover the requirement.
- Prefer composition of utilities over complex custom styles.

## Class Organization Order
- Follow a consistent order for class names:
  1. **Layout** (flex, grid, spacing, positioning)
  2. **Box Model** (padding, margin, border, width/height)
  3. **Typography** (font, text size, weight, color)
  4. **Backgrounds & Effects** (bg, shadow, opacity)
  5. **State Modifiers** (hover, focus, active, disabled)
  6. **Responsive Variants** (sm:, md:, lg:, xl:)

## Responsive Design
- Always design **mobile-first**; scale up with responsive variants.
- Use Tailwind’s breakpoint utilities (`sm`, `md`, `lg`, `xl`, `2xl`) consistently.
- Ensure layouts adapt gracefully to different screen sizes.

## Accessibility & Focus States
- Include **focus-visible** styles for interactive elements.
- Ensure sufficient color contrast for text and UI components.
- Use `aria-*` attributes where necessary for screen readers.
- Never remove focus outlines without providing an accessible alternative.

## Custom CSS Rules
- Allowed only when:
  - Tailwind utilities cannot achieve the design.
  - Complex animations or rare edge cases require custom styles.
- Place custom CSS in `global.css` or feature‑specific files.
- Keep custom CSS minimal, documented, and scoped.

## Formatting & Readability
- Keep class lists short and ordered; break into multiple lines if long.
- Use semantic HTML elements with Tailwind classes.
- Avoid inline styles unless absolutely necessary.

## Collaboration Rules
- Enforce consistency with automated linting (e.g., `stylelint` + Tailwind plugin).
- Review all custom CSS additions in code reviews.
- Document non‑standard styling decisions in README or ADRs.
