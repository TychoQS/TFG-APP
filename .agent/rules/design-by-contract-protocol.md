---
trigger: always_on
---

# DESIGN BY CONTRACT PROTOCOL

## Core Development Rules
- **Contract First:** All contracts are already defined in `src/`. Do NOT propose new contracts or interfaces unless explicitly asked.
- **Implementation:** Read and implement directly from the existing contracts in `src/features/`, `src/screens/`, `src/components/`, `src/navigation/` and `src/theme/`, etc...
- **Interface Compliance:** All implementations must strictly respect the `@precondition`, `@postcondition` and `@invariant` defined in the existing contracts.
- **No New Interfaces:** You are forbidden from creating new interfaces or types unless explicitly requested by the user.
- **Tech Stack Compliance:** All code must be written using React, Ant Design and Capacitor.