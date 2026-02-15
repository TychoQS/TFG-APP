---
trigger: always_on
---

# AUTOMATED TRACEABILITY

## Documentation Rules (documentation/antigravity.doc.md)
- **File Management:** All progress must be recorded in `documentation/antigravity.doc.md`.
- **Temporal Organization:** Use a single `## YYYY-MM-DD` header per day. Do not repeat the date header if it already exists.
- **Task Entry Structure:** Append every completed task using this exact format:
    ### **Task ID:** [Descriptive ID, e.g., UI-01, SETUP-01]
    - **Human Specification (Input):** The user's requirement in natural language.
    - **Technical Development:** - **IF THE TASK INVOLVES CODE:** Provide the approved TypeScript interface, type, or UI state schema and a short description of the added code and affected files.
        - **IF THE TASK IS SETUP/ARCHITECTURAL:** Provide a concise list of the technical decisions, directory changes, or configurations made (DO NOT generate fake TS interfaces).
    - **Supervision Justification:** A brief explanation of why the result is valid and any manual adjustments requested by the user. 