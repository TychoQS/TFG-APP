---
trigger: always_on
---

# GIT COMMIT CONVENTION

## 1. Commit Message Format
Every commit must follow this exact structure:
`[TAG] Short description in imperative mood`
(A blank line)
`Detailed explanation of why this change was made and what it covers.`

## 2. Mandatory Tags
You must use one of the following tags based on the change:
- **[DOCS]**: Changes, additions, or fixes in documentation files (including logs).
- **[RULES]**: Any modification to the agent's rules, .cursorrules, or configuration files.
- **[FEAT]**: Addition of new features or functional components.
- **[FIX]**: Bug fixes or error corrections.
- **[REFACTOR]**: Code changes that neither fix a bug nor add a feature (optimizations, clean up).
- **[MODIFY]**: General changes that do not fit the categories above.

## 3. Automation Rule
- After completing a task and updating the `antigravity.doc.md`, you must suggest the git commit command to the user following this convention.
- All commit messages must be written strictly in English.