---
trigger: always_on
---

# DESIGN BY CONTRACT PROTOCOL

## Core Development Rules
- **Contract First:** You are strictly forbidden from writing implementation logic, UI code or any sort of code before the user approves a technical contract. 
- **Interface Definition:** You must first propose a TypeScript `interface` or `type` in the chat. This contract must include JSDoc comments defining `@precondition` and `@postcondition`.
- **UI Architecture:** For UI tasks, the contract must explicitly define the view states (e.g., 'idle', 'loading', 'success', 'error') and the data structure the component expects.
- **Tech Stack Compliance:** All code must be written using React, Ant UI and Capacitor.